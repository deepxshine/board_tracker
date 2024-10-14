from typing import List

from src.auth.backend import current_active_user
from src.crud.utils import get_all_or_404, get_count, get_list_or_404
from src.database.database import get_session
from src.models.inventory import Inventory
from fastapi import APIRouter, Depends, HTTPException

from src.permissions.permissions import is_admin
from src.schemas.inventory import InventoryOutSchema, InventoryInSchema, \
    InventoryEditSchema
from src.crud.inventory import del_inventory, create_inventory, edit_inventory, \
    search_inventory
from sqlalchemy.ext.asyncio import AsyncSession

router = APIRouter(
    prefix="/inventory",
    tags=["admin-inventory"],
    responses={404: {"description": "Not found"}},
)


@router.get("/")
async def get_inventories(
        session: AsyncSession = Depends(get_session),
        current_user: int = Depends(current_active_user, ),
) -> List[InventoryOutSchema]:
    if is_admin(current_user):
        inventories = await get_all_or_404(Inventory, session)
        return inventories
    raise HTTPException(status_code=403, detail="Forbidden")


@router.delete("/{inventory_id:int}/")
async def delete_inventory(
        inventory_id: int,
        session: AsyncSession = Depends(get_session),
        current_user: int = Depends(current_active_user, ),
) -> dict:
    if is_admin(current_user):
        await del_inventory(inventory_id, session)
        return {"message": "Inventory deleted successfully"}
    raise HTTPException(status_code=403, detail="Forbidden")


@router.post("/")
async def post_inventory(
        data: InventoryInSchema,
        session: AsyncSession = Depends(get_session),
        current_user: int = Depends(current_active_user),
) -> InventoryOutSchema:
    if is_admin(current_user):
        inventory = await create_inventory(data, session)
        return inventory
    raise HTTPException(status_code=403, detail="Forbidden")


@router.put("/{inventory_id:int}/")
async def put_inventory(
        inventory_id: int,
        data: InventoryEditSchema,
        session: AsyncSession = Depends(get_session),
        current_user: int = Depends(current_active_user, ),
) -> InventoryOutSchema:
    if is_admin(current_user):
        inventory = await edit_inventory(inventory_id, data, session)
        return inventory
    raise HTTPException(status_code=403, detail="Forbidden")


@router.get("/count")
async def get_inventories_count(
        session: AsyncSession = Depends(get_session),
        current_user: int = Depends(current_active_user, ),
) -> int:
    if is_admin(current_user):
        count = await get_count(Inventory, session)
        return count
    raise HTTPException(status_code=403, detail="Forbidden")


@router.get("/{name:str}/")
async def get_inventories_by_name(
        name: str,
        session: AsyncSession = Depends(get_session),
        current_user: int = Depends(current_active_user, ),
) -> List[InventoryOutSchema]:
    if is_admin(current_user):
        inventories = await search_inventory(name, session)
        return inventories
    raise HTTPException(status_code=403, detail="Forbidden")

