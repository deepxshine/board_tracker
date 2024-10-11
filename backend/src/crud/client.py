from fastapi.exceptions import HTTPException

from src.models.client import Client
from src.schemas.client import ClientInSchema
from sqlalchemy.ext.asyncio import AsyncSession


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
