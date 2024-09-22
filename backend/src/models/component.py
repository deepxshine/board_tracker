from src.models import Base
from datetime import date
from typing import List, Optional, Annotated
from sqlalchemy import ForeignKey
from sqlalchemy import String, Integer, Date
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import relationship


class Component(Base):
    __tablename__="Component"

    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[int] = mapped_column(nullable=False) 