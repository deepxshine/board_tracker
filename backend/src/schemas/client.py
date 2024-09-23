from pydantic import BaseModel
from typing import Optional


class ClientInSchema(BaseModel):

    name: str
    surname: str
    phone_number: str


class ClientOutSchema(ClientInSchema):

    id: int
    comment: Optional[str]


class ClientFilterSchema(ClientInSchema):

    name: Optional[str]
    surname: Optional[str]
    phone_number: Optional[str]
