from sqlalchemy import ScalarResult, func
from src.models.base import Base
from sqlalchemy import asc, desc
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from fastapi import HTTPException


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
        limit: int = 20,
        sort_by: str = "id",
        order_by: str = "asc",
) -> ScalarResult:
    sort_column = getattr(model, sort_by)
    query = (
        select(model)
        .offset(offset)
        .limit(limit)
        .order_by(asc(sort_column) if order_by == "asc" else desc(sort_column))
    )
    obj = await session.scalars(query)
    if not obj:
        raise HTTPException(status_code=404,
                            detail=f"Object {model.__tablename__} not found")

    return obj.all()


async def get_list_or_404(
        model: Base,
        field: str,
        value: any,
        session: AsyncSession) -> ScalarResult:
    query = select(model).where(getattr(model, field) == value)
    obj = await session.scalars(query)
    if not obj:
        raise HTTPException(status_code=404,
                            detail=f"Object {model.__tablename__} not found")
    return obj.all()


async def get_count(
        Table: Base,
        session: AsyncSession,

):
    result = await session.execute(func.count(Table.id))
    return result.scalar()
