from typing import AsyncGenerator

from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker

from src.constants import (POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB,
                           POSTGRES_PORT, POSTGRES_HOST
                           )

postgres_url = f"postgresql+asyncpg://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_HOST}:{POSTGRES_PORT}/{POSTGRES_DB}"  # noqa
# postgres_url = "postgresql+asyncpg://postgres:postgres@db:5432/db"
print(POSTGRES_HOST)
engine = create_async_engine(postgres_url)


async def get_session() -> AsyncSession:
    async_session = sessionmaker(
        engine, class_=AsyncSession, expire_on_commit=False
    )
    async with async_session() as session:
        yield session


async_session_maker = sessionmaker(engine, class_=AsyncSession,
                                   expire_on_commit=False)


async def get_async_session() -> AsyncGenerator[AsyncSession, None]:
    async with async_session_maker() as session:
        yield session
