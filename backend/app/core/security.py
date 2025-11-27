from datetime import datetime, timedelta, timezone

import jwt
from passlib.context import CryptContext

from app.core.config import settings

pwd_contect = CryptContext(schemes=['bcrypt'], deprecated="auto")

def hash_password(password) -> str:
    return pwd_contect.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_contect.verify(plain_password, hashed_password)


def created_access_token(sub: str, expires_delta: timedelta | None = None):
    expire = datetime.now(timezone.utc) + (expires_delta  or timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode = {"sub": str(sub), "exp": expire}
    encoded_jwt = jwt.encode(to_encode, key=settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    return encoded_jwt