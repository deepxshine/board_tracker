from pydantic import BaseModel
from typing import Optional
from datetime import date


class TicketEditSchema(BaseModel):
    comment: Optional[str]

    class Config:
        orm_mode = True


class TicketInSchema(TicketEditSchema):
    client_id: int
    
    class Config:
        orm_mode = True


class TicketOutSchema(TicketInSchema):
    id: int
    return_date: Optional[date]
    user_id: int
    issue_date: date
    comment: Optional[str]

    class Config:
        orm_mode = True


class TicketFilterSchema(TicketInSchema):
    id: Optional[int]
    client_id: Optional[int]
