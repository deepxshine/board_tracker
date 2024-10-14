from sqlalchemy import select
from fastapi import HTTPException
from src.models.user import User
from src.schemas.user import UserUpdate
from sqlalchemy.ext.asyncio import AsyncSession


async def edit_user(
        user_id: int,
        data: UserUpdate,
        session: AsyncSession,
):
    query = select(User).where(User.id == user_id)
    result = await session.execute(query)
    user = result.scalar()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    for key, value in data.dict(exclude_unset=True).items():
        if value:
            setattr(user, key, value)
    session.add(user)
    await session.commit()
    await session.refresh(user)
    return user


async def del_user(
        user_id: int,
        session: AsyncSession
):
    query = select(User).where(User.id == user_id)
    result = await session.execute(query)
    user = result.scalar()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    await session.delete(user)
    await session.commit()
