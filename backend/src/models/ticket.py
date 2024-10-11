from src.models.client import Client  # noqa
from src.models.user import User  # noqa
from .base import Base
from datetime import date
from sqlalchemy import Column, Integer, String, DATE, ForeignKey


class Ticket(Base):
    __tablename__ = "ticket"

    id = Column(Integer, primary_key=True)
    client_id = Column(Integer, ForeignKey("client.id"))
    issue_date = Column(DATE, nullable=False, default=date.today())
    return_date = Column(DATE)
    comment = Column(String)
    user_id = Column(Integer, ForeignKey("user.id"))
