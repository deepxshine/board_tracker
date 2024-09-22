from sqlalchemy.ext.asyncio import (AsyncSession, create_async_engine,
                                    async_sessionmaker)
from sqlalchemy.ext.declarative import declarative_base
from ..constants import (POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB,
                         POSTGRES_PORT, POSTGRES_HOST
                         )

postgres_url = f"postgresql+asyncpg://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_HOST}:{POSTGRES_PORT}/{POSTGRES_DB}"  # noqa


async def get_session() -> AsyncSession:
    async_session = sessionmaker(
        engine, class_=AsyncSession, expire_on_commit=False
    )
    async with async_session() as session:
        yield session
