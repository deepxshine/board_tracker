from typing import List

from fastapi import APIRouter, Depends

from src.admin.crud.utils import get_all_or_404, get_object_or_404
from src.admin.crud.inventory import create_inventory, delete_inventory
from src.auth.backend import current_active_user
from src.database.database import get_session
from sqlalchemy.ext.asyncio import AsyncSession
from src.schemas.inventory import InventoryOutSchema, InventoryInSchema
from src.models.inventory import Inventory

router = APIRouter(
    prefix="/inventory",
    tags=["inventory"],
    responses={404: {"description": "Not found"}},
)


@router.post("/")
async def post_inventory(inventory: InventoryInSchema,
                         current_user: int = Depends(current_active_user, ),
                         session: AsyncSession = Depends(get_session),
                         ) -> InventoryOutSchema:
    inventory = await create_inventory(session, inventory, current_user.id)
    return inventory


@router.get("/")
async def inventory_list(
        session: AsyncSession = Depends(get_session),
        current_user: int = Depends(current_active_user, )
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


@router.delete("/{inventory_id:int}/")
async def remove_inventory(
        inventory_id: int,
        session: AsyncSession = Depends(get_session),
        current_user: int = Depends(current_active_user)
) -> dict:
    await delete_inventory(inventory_id, session)
    return {
        "status": "success",
    }
