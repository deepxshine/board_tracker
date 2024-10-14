from fastapi.exceptions import HTTPException

from src.crud.utils import get_list_or_404
from src.models.client import Client
from src.models.ticket import Ticket
from src.schemas.client import ClientInSchema, ClientFilterSchema, \
    ClientEditSchema
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


async def edit_client(
        client_id: int,
        data: ClientEditSchema,
        session: AsyncSession,
):
    query = select(Client).where(Client.id == client_id)
    result = await session.execute(query)
    client = result.scalar()
    if not client:
        raise HTTPException(status_code=404, detail="Client not found")

    for key, value in data.dict(exclude_unset=True).items():
        setattr(client, key, value)
    session.add(client)
    await session.commit()
    await session.refresh(client)
    return client


async def del_client(
        client_id: int,
        session: AsyncSession,
):
    query = select(Client).where(Client.id == client_id)
    result = await session.execute(query)
    client = result.scalar()
    tickets = await get_list_or_404(
        Ticket, "client_id", client_id, session
    )
    if tickets:
        raise HTTPException(status_code=400, detail="Client has tickets")
    if not client:
        raise HTTPException(status_code=404, detail="Client not found")
    await session.delete(client)
    await session.commit()
    return client
