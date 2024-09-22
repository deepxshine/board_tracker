from . import Base
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column


class Inventory(Base):
    __tablename__="Component"

    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[int] = mapped_column(nullable=False) 