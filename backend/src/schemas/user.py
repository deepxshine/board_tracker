from fastapi_users import schemas


class UserRead(schemas.BaseUser[int]):
    id: int
    fullname: str

    class Config:
        orm_mode = True


class UserCreate(schemas.BaseUserCreate):
    fullname: str


class UserUpdate(schemas.BaseUserUpdate):
    pass
