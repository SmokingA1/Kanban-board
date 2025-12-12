from datetime import datetime, timedelta, timezone

import jwt
from passlib.context import CryptContext

from app.core.config import settings

pwd_context = CryptContext(schemes=['bcrypt'], deprecated="auto")

def hash_password(password: str) -> str:
    if not isinstance(password, str):
        raise TypeError(f"Password must be str, got {type(password)}")
    if len(password.encode('utf-8')) > 72:
        raise ValueError("Password too long for bcrypt (>72 bytes)")
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def create_access_token(sub: str, expires_delta: timedelta | None = None):
    expire = datetime.now(timezone.utc) + (expires_delta  or timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode = {"sub": str(sub), "exp": expire}
    encoded_jwt = jwt.encode(to_encode, key=settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    return encoded_jwt