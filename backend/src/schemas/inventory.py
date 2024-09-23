from pydantic import BaseModel
from typing import Optional


class InventoryInSchema(BaseModel):
    title: int


class InventoryOutSchema(InventoryInSchema):
    id: int
    title: int


class InventoryFilterSchema(InventoryInSchema):
    title: Optional[int]
