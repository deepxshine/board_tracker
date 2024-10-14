from fastapi import HTTPException

from src.models.inventory import Inventory
from src.models.inventory_in_ticket import InventoryInTicket
from src.schemas.inventory import InventoryInSchema, InventoryEditSchema
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select


async def del_inventory(
        inventory_id: int,
        session: AsyncSession
) -> bool:
    try:
        query = select(Inventory).where(Inventory.id == inventory_id)
        inventory = await session.execute(query)
        inventory = inventory.scalar()
        if not inventory:
            raise HTTPException(status_code=404, detail="Inventory not found")

        query = select(InventoryInTicket).where(
            InventoryInTicket.inventory_id == inventory_id)
        result = await session.scalars(query)
        if result:
            for i in result.all():
                await session.delete(i)
                await session.commit()
        await session.delete(inventory)
        await session.commit()
        return True
    except HTTPException as e:
        raise e


async def create_inventory(
        data: InventoryInSchema,
        session: AsyncSession,

):
    inventory = Inventory(**data.dict())
    try:
        session.add(inventory)
        await session.commit()
        await session.refresh(inventory)
        return inventory
    except Exception:
        raise HTTPException(status_code=500, detail="Something went wrong")


async def edit_inventory(
        inventory_id: int,
        data: InventoryEditSchema,
        session: AsyncSession
):
    query = select(Inventory).where(Inventory.id == inventory_id)
    result = await session.execute(query)
    inventory = result.scalar()
    if not inventory:
        raise HTTPException(status_code=404, detail="Inventory not found")
    for key, value in data.dict(exclude_unset=True).items():
        setattr(inventory, key, value)
    session.add(inventory)
    await session.commit()
    await session.refresh(inventory)
    return inventory


async def search_inventory(
        title: str,
        session: AsyncSession, ):
    query = select(Inventory).where(Inventory.title.ilike(f"%{title}%"))
    result = await session.scalars(query)
    return result.all()
