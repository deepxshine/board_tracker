from fastapi import FastAPI
from pydantic import BaseModel

class InventoryInSchema(BaseModel):

    id: int
    title: str

class InventoryOutSchema(BaseModel):

    id: int
    title: str
