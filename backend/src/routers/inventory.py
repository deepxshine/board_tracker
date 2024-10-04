from typing import List

from fastapi import APIRouter, Depends

from src.crud.utils import get_all_or_404, get_object_or_404

from src.auth.backend import current_active_user
from src.database.database import get_session
from sqlalchemy.ext.asyncio import AsyncSession
from src.schemas.inventory import InventoryOutSchema
from src.models.inventory import Inventory

router = APIRouter(
    prefix="/inventory",
    tags=["inventory"],
    responses={404: {"description": "Not found"}},
)


@router.get("/")
async def inventory_list(
        session: AsyncSession = Depends(get_session),
        # current_user: int = Depends(current_active_user, )
) -> dict[str, List[InventoryOutSchema]]:
    result = await get_all_or_404(Inventory, session)
    return {"inventory": result}


@router.get("/{id}")
async def inventory_by_id(
        id: int,
        session: AsyncSession = Depends(get_session),
        current_user: int = Depends(current_active_user, )
) -> InventoryOutSchema:
    result = await get_object_or_404(Inventory, "id", id, session)
    return result
