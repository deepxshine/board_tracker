from fastapi import FastAPI
from pydantic import BaseModel

class InventoryInTicketInSchema(BaseModel):
    id:int
    inventory_id:int
    ticket_id:int

class InventoryInTicketOutSchema(BaseModel):
    id:int
    inventory_id:int
    ticket_id:int
