from .base import Base
from sqlalchemy import Column, Integer, ForeignKey


class InventoryInTicket(Base):
    __tablename__ = "inventory_in_ticket"

    id = Column(Integer, primary_key=True)
    inventory_id = Column(ForeignKey("inventory.id"))
    ticket_id = Column(ForeignKey("ticket.id"))
