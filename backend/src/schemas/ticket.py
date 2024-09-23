from pydantic import BaseModel
from typing import Optional
from datetime import date


class TicketInSchema(BaseModel):
    phone_number: int
    issue_date: date
    comment: Optional[str]


class TicketOutSchema(TicketInSchema):
    id: int
    return_date: Optional[date]


class TicketFilterSchema(TicketInSchema):
    id: Optional[int]
