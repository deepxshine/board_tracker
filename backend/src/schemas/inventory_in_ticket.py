from fastapi import FastAPI
from pydantic import BaseModel

class InventoryInTicket(BaseModel):
    id:int
    inventory_id:int
    ticket_id:int

app = FastAPI()

@app.post("/inventory_in_ticket/", response_model=InventoryInTicket)
async def create_inventory_in_ticket(inventory_in_ticket: InventoryInTicket):
    return inventory_in_ticket