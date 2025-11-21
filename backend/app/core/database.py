from datetime import datetime, timezone
from typing import AsyncGenerator

from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from sqlalchemy.types import TypeDecorator, DateTime

from app.core.config import settings

class Base(DeclarativeBase):
    pass


class TZDateTime(TypeDecorator):
    impl = DateTime
    cache_ok = True

    def process_bind_param(self, value, dialect):
        if value is not None:
            if not value.tzinfo:
                raise TypeError("tzinfo is required")
            value = value.astimezone(timezone.utc).replace(tzinfo=None)
        return value

    def process_result_value(self, value, dialect):
        if value is not None:
            value = value.replace(tzinfo=timezone.utc)
        return value


class TimestampMixin:
    created_at: Mapped[datetime] = mapped_column(TZDateTime(), default=datetime.now(timezone.utc))
    updated_at: Mapped[datetime] = mapped_column(TZDateTime(), default=datetime.now(timezone.utc) ,onupdate=datetime.now(timezone.utc))



async_engine = create_async_engine(
    settings.async_DB_URL,
    echo=True
)

async_session = async_sessionmaker(
    autoflush=False,
    autocommit=False,
    class_=AsyncSession,
    bind=async_engine
)

async def get_db() -> AsyncGenerator[AsyncSession, None]:
    async with async_session() as async_s:
        yield async_s