from . import Base
from sqlalchemy import String, Integer, Column


class Client(Base):
    __tablename__ = "Client"

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    surname = Column(String, nullabel=False)
    phone_number = Column(String(12), nullable=False)
    comment = Column(String)
