from src.models.base import Base
from sqlalchemy import String, Integer, Column


class Client(Base):
    __tablename__ = "client"

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    surname = Column(String, nullable=False)
    phone_number = Column(String(12), nullable=False, unique=True)

    def __repr__(self):
        return f'{self.id} {self.name} {self.surname} {self.phone_number}'
