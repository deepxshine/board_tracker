from pydantic import BaseModel


class InventoryInTicketOutSchema(BaseModel):
    id: str
    inventory_id: str
    ticket_id: str
