from typing import List, Dict

from fastapi import APIRouter, Depends

from src.admin.crud.ticket import (create_ticket, get_ticket, edit_ticket,
                             delete_inventory_from_ticket,
                             add_inventory_to_ticket)

from src.schemas.ticket import (TicketInSchema, TicketOutSchema,
                                TicketEditSchema)
from src.auth.backend import current_active_user
from src.database.database import get_session
from sqlalchemy.ext.asyncio import AsyncSession

router = APIRouter(
    prefix="/ticket",
    tags=["ticket"],
    responses={404: {"description": "Not found"}},
)


@router.get("/")
async def read_ticket(phone_number: str,
                      current_user: int = Depends(current_active_user, ),
                      session: AsyncSession = Depends(get_session),
                      ) -> Dict[str, List[TicketOutSchema]]:
    tickets = await get_ticket(session, phone_number)
    return {"tickets": tickets}


@router.post("/")
async def post_ticket(ticket: TicketInSchema,
                      current_user: int = Depends(current_active_user, ),
                      session: AsyncSession = Depends(get_session),
                      ) -> TicketOutSchema:
    ticket = await create_ticket(session, ticket, current_user.id)
    return ticket


@router.put("/{ticket_id:int}/")
async def put_ticket(
        ticket_id: int,
        ticket: TicketEditSchema,
        session: AsyncSession = Depends(get_session),
        current_user: int = Depends(current_active_user, ),
) -> TicketOutSchema:
    ticket = await edit_ticket(ticket_id, ticket, session)
    return ticket


@router.post("/{ticket_id:int}/inventory")
async def add_inventory_to_ticket_view(
        ticket_id: int,
        inventory_id: int,
        session: AsyncSession = Depends(get_session),
        current_user: int = Depends(current_active_user, ),
) -> dict:
    await add_inventory_to_ticket(ticket_id, inventory_id, session)
    return {
        "status": "success",
    }


@router.delete("/{ticket_id:int}/inventory")
async def delete_inventory_from_ticket_view(
        ticket_id: int,
        iit_id: int,
        session: AsyncSession = Depends(get_session),
        current_user: int = Depends(current_active_user)
) -> dict:
    await delete_inventory_from_ticket(iit_id, session)
    return {
        "status": "success",
    }
