from typing import Annotated

from fastapi import Response, Request, APIRouter, Depends, HTTPException, status
from fastapi.security.oauth2 import OAuth2PasswordRequestForm

from app.api.deps import CurrentUser, SessionDep
from app.core.security import create_access_token
from app.core.config import settings
from app.schemas import Message, UserRead
from app.services.user.user import authenticate

router = APIRouter( tags=['Login'])

@router.post("/login/", response_model=Message)
async def login(
    db: SessionDep,
    request: Request,
    response: Response,
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()]
):
    db_user = await authenticate(db=db, user_email=form_data.username, user_password=form_data.password)
    if not db_user: 
        raise HTTPException(status.HTTP_403_FORBIDDEN, detail="Invalid email or password!")
    
    access_token = create_access_token(sub=db_user.id)

    response.set_cookie(
        "access_token", 
        value=access_token,
        secure=False,
        httponly=True,
        samesite="lax"
    )

    return Message(data="Signed in successfully!")

