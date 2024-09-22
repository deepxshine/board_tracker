from . import Base
from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column


class InventoryInTiket(Base):
    __tablename__ = "InventoryInTiket"

    id: Mapped[int] = mapped_column(primary_key=True)
    inventory_id: Mapped[int] = mapped_column(ForeignKey("Inventory.id"))
    ticket_id: Mapped[int] = mapped_column(ForeignKey("Ticket.id"))
