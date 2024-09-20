from src.models import Base
from datetime import date
from typing import List, Optional, Annotated
from sqlalchemy import ForeignKey
from sqlalchemy import String, Integer, Date
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import relationship

class UserInOffice(Base):
    __tablename__="UserInOffice"

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("User.id"))
    office_id: Mapped[int] = mapped_column(ForeignKey("Office.id"))