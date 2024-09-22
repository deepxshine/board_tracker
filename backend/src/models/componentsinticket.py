from src.models import Base
from datetime import date
from typing import List, Optional, Annotated
from sqlalchemy import ForeignKey
from sqlalchemy import String, Integer, Date
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import relationship

class ComponentsInTiket(Base):
    __tablename__="ComponentsInTiket"

    id: Mapped[int] = mapped_column(primary_key=True)
    component_id: Mapped[int] = mapped_column(ForeignKey("Component.id"))
    ticket_id: Mapped[int] = mapped_column(ForeignKey("Ticket.id"))