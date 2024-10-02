from fastapi import APIRouter, Depends
from src.crud.client import create_client
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
