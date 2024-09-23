from .base import Base
from datetime import date
from sqlalchemy import Column, Integer, String, DATE


class Ticket(Base):
    __tablename__ = "ticket"

    id = Column(Integer, primary_key=True)
    phone_number = Column(String, nullable=False)
    issue_date = Column(DATE, nullable=False, default=date.today())
    return_date = Column(DATE)
    comment = Column(String)
