from fastapi.exceptions import HTTPException

from src.models.client import Client
from src.schemas.client import ClientInSchema, ClientFilterSchema
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, or_, false


async def create_client(
        session: AsyncSession,
        data: ClientInSchema
):
    client = Client(**data.dict())
    try:
        session.add(client)
        await session.commit()
        await session.refresh(client)
        return client
    except Exception:
        raise HTTPException(status_code=500, detail="Something went wrong")


async def get_client(
        session: AsyncSession,
        data: ClientFilterSchema,
):
    query = select(Client).where(
        or_(false(), *[getattr(Client, key) == value for key, value in
                       data.dict().items() if value]))
    result = await session.scalars(query)
    return result.all()
