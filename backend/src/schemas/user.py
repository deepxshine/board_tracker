from typing import Optional
from pydantic import BaseModel
from fastapi_users import schemas


class UserRead(schemas.BaseUser[int]):
    id: int
    fullname: str
    is_superuser: bool

    class Config:
        orm_mode = True


class UserCreate(schemas.BaseUserCreate):
    fullname: str


class UserUpdate(BaseModel):
    fullname: Optional[str] = None
    is_active: Optional[bool] = None
    is_verified: Optional[bool] = None
    is_superuser: Optional[bool] = None
    password: Optional[bool] = None
    email: Optional[str] = None



