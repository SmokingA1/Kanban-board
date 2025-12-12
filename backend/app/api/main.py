from fastapi import APIRouter
from app.api.routers.users import user
from app.api.routers.users import login 

main_router = APIRouter()

main_router.include_router(user.router)
main_router.include_router(login.router)