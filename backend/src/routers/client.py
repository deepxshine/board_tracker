from fastapi import APIRouter, Depends
from src.crud.client import create_client
from src.crud.utils import get_object_or_404
from src.models.client import Client
from src.schemas.client import ClientInSchema, ClientOutSchema
from sqlalchemy.ext.asyncio import AsyncSession
from src.auth.backend import current_active_user
from src.database.database import get_session

router = APIRouter(
    prefix="/client",
    tags=["client"],
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
async def get_client_by_number(
        phone_number: str,
        session: AsyncSession = Depends(get_session),
        current_user: int = Depends(current_active_user, ),
) -> ClientOutSchema:
    client = await get_object_or_404(Client, "phone_number", phone_number,
                                     session)
    return client
