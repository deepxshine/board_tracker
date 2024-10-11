from fastapi.exceptions import HTTPException
from sqlalchemy import select, or_, false
from src.models.client import Client
from src.schemas.client import ClientInSchema, ClientEditSchema, ClientFilterSchema
from sqlalchemy.ext.asyncio import AsyncSession
from src.crud.utils import get_object_or_404

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


async def edit_client(
        client_id: int,
        data: ClientEditSchema,
        session: AsyncSession,
):
    client = Client(**data.dict())
    try:
        query = select(Client).where(Client.id == client_id)
        client = await session.scalar(query)
        if not Client:
            raise HTTPException(status_code=404, detail="Client not found")
        session.add(client)
        await session.commit()
        await session.refresh(client)
        return client
    except Exception as e:
        print(e)
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


async def delete_client(
        client_id: int,
        session: AsyncSession
):
    try:
        client = await get_object_or_404(
            Client, "id", client_id, session
        )
        await session.delete(client)
        await session.commit()
    except HTTPException as e:
        raise e
    except Exception:
        raise HTTPException(status_code=500, detail="Something went wrong")
    

