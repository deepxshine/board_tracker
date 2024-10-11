from datetime import date
from fastapi import HTTPException

from src.crud.utils import get_object_or_404
from src.models.inventory import Inventory
from src.models.ticket import Ticket
from src.schemas.ticket import (TicketInSchema, TicketOutSchema,
                                TicketEditSchema, TicketFilterSchema)
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, or_, false
from src.models.client import Client
from src.models.inventory_in_ticket import InventoryInTicket


async def create_ticket(
        session: AsyncSession,
        data: TicketInSchema,
        current_user: int
) -> TicketOutSchema:
    ticket = Ticket(client_id=data.client_id,
                    issue_date=date.today(),
                    user_id=current_user,
                    comment=data.comment
                    )
    try:
        session.add(ticket)
        await session.commit()
        await session.refresh(ticket)
        return ticket
    except Exception:
        raise HTTPException(status_code=500, detail="Something went wrong")


async def get_ticket(
        session: AsyncSession,
        data: TicketFilterSchema,
):
    query = select(Ticket).where(
        or_(false(), *[getattr(Ticket, key) == value for key, value in
              data.dict().items() if value]))
    result = await session.scalars(query)
    return result.all()

async def edit_ticket(
        ticket_id: int,
        data: TicketEditSchema,
        session: AsyncSession
):
    try:
        query = select(Ticket).where(Ticket.id == ticket_id)
        ticket = await session.scalar(query)
        if not ticket:
            raise HTTPException(status_code=404, detail="Ticket not found")
        ticket.comment = data.comment
        ticket.return_date = date.today()
        session.add(ticket)
        await session.commit()
        await session.refresh(ticket)
        return ticket
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="Something went wrong")


async def add_inventory_to_ticket(
        ticket_id: int,
        inventory_id: int,
        session: AsyncSession
) -> bool:
    try:
        ticket = await get_object_or_404(Ticket, "id", ticket_id, session)
        inventory = await get_object_or_404(Inventory, "id",
                                            inventory_id, session)
        inventory_in_ticket = InventoryInTicket(ticket_id=ticket.id,
                                                inventory_id=inventory.id)
        session.add(inventory_in_ticket)
        await session.commit()
        await session.refresh(inventory_in_ticket)
        return True
    except HTTPException as e:
        raise e
    except Exception:
        raise HTTPException(status_code=500, detail="Something went wrong")


async def delete_inventory_from_ticket(
        iit_id: int,
        session: AsyncSession
):
    try:
        inventory_in_ticket = await get_object_or_404(
            InventoryInTicket, "id", iit_id, session
        )
        await session.delete(inventory_in_ticket)
        await session.commit()
    except HTTPException as e:
        raise e
    except Exception:
        raise HTTPException(status_code=500, detail="Something went wrong")
