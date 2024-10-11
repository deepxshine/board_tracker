from fastapi import APIRouter, Depends
from src.admin.crud.client import (create_client, edit_client,
                                   get_client, delete_client)
from src.schemas.client import (ClientInSchema, ClientOutSchema,
                                ClientFilterSchema, ClientEditSchema)
from sqlalchemy.ext.asyncio import AsyncSession
from src.auth.backend import current_active_user
from src.database.database import get_session
from typing import List, Dict
from src.admin.permissions.decorators import is_admin


router = APIRouter(
    prefix="/client",
    tags=["client"],
    responses={404: {"description": "Not found"}},
)


@is_admin
@router.get("/")
async def read_client(data: ClientFilterSchema,
                      current_user: int = Depends(current_active_user, ),
                      session: AsyncSession = Depends(get_session),
                      ) -> Dict[str, List[ClientFilterSchema]]:
    clients = await get_client(session, data)
    return {"clients": clients}


@router.post("/")
async def post_client(
        data: ClientInSchema,
        session: AsyncSession = Depends(get_session),
        current_user: int = Depends(current_active_user, ),
) -> ClientOutSchema:
    client = await create_client(session, data)
    return client


@router.put("/{client_id:int}/")
async def put_client(
        client_id: int,
        client: ClientEditSchema,
        session: AsyncSession = Depends(get_session),
        current_user: int = Depends(current_active_user, ),
) -> ClientOutSchema:
    client = await edit_client(client_id, client, session)
    return client


@router.delete("/{client_id:int}/")
async def remove_client(
        client_id: int,
        session: AsyncSession = Depends(get_session),
        current_user: int = Depends(current_active_user)
) -> dict:
    await delete_client(client_id, session)
    return {
        "status": "success",
    }
