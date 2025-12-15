from uuid import UUID
from typing import List

from fastapi import APIRouter, HTTPException, status, Query, Path

from app.schemas import UserRead, UserUpdate, UserCreate, Message
from app.api.deps import SessionDep, CurrentUser
from app.services.user.user import (
    get_user_by_email,
    get_user_by_id,
    get_user_by_phone_number,
    get_user_by_username,
    get_users,
    create_user,
    update_user_by_id,
    delete_user_by_id
)

router = APIRouter(prefix="/users", tags=["User"])

@router.get("/", response_model=List[UserRead])
async def read_users(
    db: SessionDep,
    page: int = Query(1, title="Page number is required!"),
    limit: int = Query(20, title="Quantity number is required!"),
):
    db_users = await get_users(db=db, page=page, limit=limit)

    return db_users


@router.get("/me", response_model=UserRead)
async def read_current_user(
    current_user: CurrentUser,
):
    return current_user


@router.get("/{user_id}", response_model=UserRead)
async def read_user_by_id(
    db: SessionDep,
    current_user: CurrentUser,
    user_id: UUID = Path(..., description="User id is required."),
):
    
    if current_user.id != user_id and current_user.role != "admin":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Rights denied!")
    
    db_user = await get_user_by_id(db=db, user_id=user_id)

    if not db_user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found!")

    return db_user


@router.post("/register", response_model=UserRead)
async def register_new_user(
    *, 
    db: SessionDep,
    user_create: UserCreate,
):
    
    existing_email = await get_user_by_email(db=db, user_email=user_create.email)

    if existing_email:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Such email already exists!")

    if user_create.phone_number is not None:
        existing_phone_number = await get_user_by_phone_number(db=db, user_phone_number=user_create.phone_number)
        if existing_phone_number:
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Such phone number already exists!")
        
    existing_username = await get_user_by_username(db=db, username=user_create.username)
    if existing_username:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Such username already exists!")

    created_user = await create_user(db=db, user_create=user_create)

    return created_user


@router.put("/update/{user_id}", response_model=UserRead)
async def update_existing_user(
    db: SessionDep,
    user_id: UUID,
    user_update: UserUpdate,
    current_user: CurrentUser,
):
    if current_user.id != user_id and current_user.role != "admin":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Rights denied!")
    
    db_user = await get_user_by_id(db=db, user_id=user_id)
    if not db_user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Such user doesn't exist!")
    
    if user_update.username:
        existing_username_user = await get_user_by_username(db=db, username=user_update.username)
        if existing_username_user and db_user.id != existing_username_user.id:
            raise HTTPException(status_code=status.HTTP_409_CONFLICT)
        
    if user_update.email:
        existing_email_user = await get_user_by_email(db=db, user_email=user_update.email)
        if existing_email_user and db_user.id != existing_email_user.id:
            raise HTTPException(status_code=status.HTTP_409_CONFLICT)
        
    if user_update.phone_number:
        existing_phone_number_user = await get_user_by_phone_number(db=db, user_phone_number=user_update.phone_number)
        if existing_phone_number_user and db_user.id != existing_phone_number_user.id:
            raise HTTPException(status_code=status.HTTP_409_CONFLICT)
        
    updated_user = await update_user_by_id(db=db, user_id=user_id, user_update=user_update)
    return updated_user


@router.delete("/delete/{user_id}", response_model=Message)
async def delete_existing_user(
    db: SessionDep,
    user_id: UUID,
    current_user: CurrentUser,
):
    if current_user.id != user_id and current_user.role != "admin":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Rights denied!")

    deleted_user = await delete_user_by_id(db=db, user_id=user_id)

    if not deleted_user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found!")
    
    return Message(data="User deleted successfully!")
    