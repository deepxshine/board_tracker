from fastapi.exceptions import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import ScalarResult, select
from src.models.base import Base


async def get_object_or_404(
        model: Base,
        field: str,
        value: any,
        session: AsyncSession) -> Base:
    query = select(model).where(getattr(model, field) == value)
    obj = await session.scalar(query)
    if not obj:
        raise HTTPException(status_code=404,
                            detail=f"Object {model.__tablename__} not found")
    return obj


async def get_all_or_404(
        model: Base,
        session: AsyncSession,
        offset: int = 0,
        limit: int = None
) -> ScalarResult:
    query = select(model).offset(offset).limit(limit)
    obj = await session.scalars(query)
    if not obj:
        raise HTTPException(status_code=404,
                            detail=f"Object {model.__tablename__} not found")
    return obj
