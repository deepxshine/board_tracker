from pydantic import BaseModel
from typing import Optional


class ClientInSchema(BaseModel):
    name: str
    surname: str
    phone_number: str


class ClientOutSchema(ClientInSchema):
    id: int


class ClientFilterSchema(ClientInSchema):
    id: Optional[int]
    name: Optional[str]
    surname: Optional[str]
    phone_number: Optional[str]
