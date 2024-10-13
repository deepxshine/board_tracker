from fastapi.exceptions import HTTPException
from sqlalchemy import select, or_, false
from src.models.inventory import Inventory
from src.schemas.inventory import InventoryInSchema, InventoryFilterSchema
from sqlalchemy.ext.asyncio import AsyncSession
from src.crud.utils import get_object_or_404


async def create_inventory(
        session: AsyncSession,
        data: InventoryInSchema
):
    inventory = Inventory(**data.dict())
    try:
        session.add(inventory)
        await session.commit()
        await session.refresh(inventory)
        return inventory
    except Exception:
        raise HTTPException(status_code=500, detail="Something went wrong")


async def get_inventory(
        session: AsyncSession,
        data: InventoryFilterSchema,
):
    query = select(Inventory).where(
        or_(false(), *[getattr(Inventory, key) == value for key, value in
                       data.dict().items() if value]))
    result = await session.scalars(query)
    return result.all()


async def delete_inventory(
        inventory_id: int,
        session: AsyncSession
):
    try:
        inventory = await get_object_or_404(
            Inventory, "id", inventory_id, session
        )
        await session.delete(inventory)
        await session.commit()
    except HTTPException as e:
        raise e
    except Exception:
        raise HTTPException(status_code=500, detail="Something went wrong")
