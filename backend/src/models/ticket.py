from . import Base
from datetime import date
from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column


class Ticket(Base):
    __tablename__ = "Ticket"

    id: Mapped[int] = mapped_column(primary_key=True)
    client: Mapped[str] = mapped_column(nullable=False)
    phone_number: Mapped[str] = mapped_column(nullable=False)
    user_id: Mapped[int] = mapped_column(ForeignKey("User.id"))
    issue_date: Mapped[date] = mapped_column(nullable=False)
    return_date: Mapped[date]
    comment: Mapped[str]
