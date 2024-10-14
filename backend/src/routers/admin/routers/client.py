from fastapi.exceptions import HTTPException

from src.schemas.client import (ClientOutSchema, ClientInSchema,
                                ClientEditSchema)
from src.crud.client import create_client, edit_client, del_client
from src.crud.utils import (get_all_or_404, get_count,
                            get_list_or_404)
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from src.auth.backend import current_active_user
from src.database.database import get_session
from src.models.client import Client

from src.permissions.permissions import is_admin

router = APIRouter(
    prefix="/client",
    tags=["admin-client"],
    responses={404: {"description": "Not found"}},
)


@router.post("/")
async def post_client(
        data: ClientInSchema,
        session: AsyncSession = Depends(get_session),
        current_user: int = Depends(current_active_user, ),
) -> ClientOutSchema:
    client = await create_client(session, data)
    return client


@router.get("/")
async def get_clients(
        offset: int = 0,
        limit: int = 20,
        sort_by: str = "id",
        order_by: str = "asc",
        session: AsyncSession = Depends(get_session),
        current_user: int = Depends(current_active_user, ),
) -> list[ClientOutSchema]:
    if is_admin(current_user):
        return await get_all_or_404(Client, session, offset, limit, sort_by,
                                    order_by)
    else:
        raise HTTPException(status_code=403, detail="Forbidden")


@router.patch("/{client_id:int}/")
async def patch_client(
        data: ClientEditSchema,
        client_id: int,
        session: AsyncSession = Depends(get_session),
        current_user: int = Depends(current_active_user, ),
) -> ClientOutSchema:
    if is_admin(current_user):
        client = await edit_client(client_id, data, session)
        return client
    else:
        raise HTTPException(status_code=403, detail="Forbidden")


@router.delete("/{client_id:int}/")
async def delete_client(
        client_id: int,
        session: AsyncSession = Depends(get_session),
        current_user: int = Depends(current_active_user, ),
) -> dict:
    if is_admin(current_user):
        await del_client(client_id, session)
        return {"status": "success"}
    else:
        raise HTTPException(status_code=403, detail="Forbidden")


@router.get("/count")
async def get_count_clients(
        session: AsyncSession = Depends(get_session),
        current_user: int = Depends(current_active_user, ),
) -> int:
    if is_admin(current_user):
        return await get_count(Client, session)
    else:
        raise HTTPException(status_code=403, detail="Forbidden")


@router.get("/{phone_number:str}/")
async def get_client_by_number(
        phone_number: str,
        session: AsyncSession = Depends(get_session),
        current_user: int = Depends(current_active_user, ),
) -> list[ClientOutSchema]:
    if is_admin(current_user):
        client = await get_list_or_404(Client, "phone_number", phone_number,
                                       session)
        return client

    raise HTTPException(status_code=403, detail="Forbidden")
