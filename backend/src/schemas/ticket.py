from datetime import date
from typing import Optional
from pydantic import BaseModel

class TicketInSchema(BaseModel):

    id: int
    client: str
    phone_number: str
    user_id: int
    issue_date: date
    return_date: Optional[date]
    comment: Optional[str]

class TicketOutSchema(TicketInSchema):

    id: int
    client: str
    phone_number: str
    user_id: int
    issue_date: date
    return_date: date
    comment: Optional[str]
