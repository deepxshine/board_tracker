from pydantic import BaseModel
from typing import Optional


class ClientInSchema(BaseModel):
    name: str
    surname: str
    phone_number: str


class ClientEditSchema(BaseModel):
    name: Optional[str] = None
    surname: Optional[str] = None
    phone_number: Optional[str] = None


class ClientOutSchema(ClientInSchema):
    id: int


class ClientFilterSchema(ClientInSchema):
    id: Optional[int]
    name: Optional[str]
    surname: Optional[str]
    phone_number: Optional[str]
