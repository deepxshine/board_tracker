from typing import List

from fastapi import APIRouter, Depends
from fastapi.exceptions import HTTPException

from src.auth.backend import current_active_user
from src.crud.utils import (get_all_or_404, get_object_or_404,
                            get_list_or_404, get_count)
from src.database.database import get_session
from src.models.inventory import Inventory
from src.models.inventory_in_ticket import InventoryInTicket
from src.models.ticket import Ticket
from src.models.client import Client
from src.permissions.permissions import is_admin
from src.schemas.inventory import InventoryOutSchema
from src.schemas.ticket import TicketOutSchema
from sqlalchemy.ext.asyncio import AsyncSession

router = APIRouter(
    prefix="/ticket",
    tags=["admin-ticket"],
    responses={404: {"description": "Not found"}},
)


@router.get("/count")
async def get_count_tickets(
        session: AsyncSession = Depends(get_session),
        current_user: int = Depends(current_active_user, ),
) -> int:
    if is_admin(current_user):
        return await get_count(Ticket, session)
    raise HTTPException(status_code=403, detail="Forbidden")


@router.get("/{phone_number}")
async def get_ticket_by_phone_number(
        phone_number: str,
        session: AsyncSession = Depends(get_session),
        current_user: int = Depends(current_active_user, ),
) -> List[TicketOutSchema]:
    if is_admin(current_user):
        client = await get_object_or_404(Client, "phone_number", phone_number,
                                         session)
        tickets = await get_list_or_404(Ticket, "client_id", client.id,
                                        session)
        return tickets
    raise HTTPException(status_code=403, detail="Forbidden")


@router.get("/")
async def get_tickets(
        offset: int = 0,
        limit: int = 20,
        sort_by: str = "id",
        order_by: str = "asc",
        session: AsyncSession = Depends(get_session),
        current_user: int = Depends(current_active_user, ),
) -> List[TicketOutSchema]:
    if is_admin(current_user):
        tickets = await get_all_or_404(Ticket, session, offset, limit, sort_by,
                                       order_by)
        return tickets
    raise HTTPException(status_code=403, detail="Forbidden")


@router.get("/details/{ticket_id}")
async def get_inventory_in_ticket(
        ticket_id: int,
        session: AsyncSession = Depends(get_session),
        current_user: int = Depends(current_active_user, ),
) -> List[InventoryOutSchema]:
    if is_admin(current_user):
        inventory = await get_list_or_404(InventoryInTicket, "ticket_id",
                                          ticket_id, session)
        result = [
            await get_object_or_404(Inventory, 'id', item.inventory_id,
                                    session)
            for item in inventory]
        return result
    raise HTTPException(status_code=403, detail="Forbidden")
