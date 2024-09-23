from .base import Base
from sqlalchemy import Integer, String, Column


class Inventory(Base):
    __tablename__ = "inventory"

    id = Column(Integer, primary_key=True)
    title = Column(String, nullable=False)
