from fastapi import FastAPI, Depends
from fastapi_users import FastAPIUsers

from src.auth.backend import auth_backend, current_active_user
from src.auth.user_manager import get_user_manager
from src.models.user import User
from src.schemas.user import UserRead, UserCreate, UserUpdate


fastapi_users = FastAPIUsers[User, id](
    get_user_manager,
    [auth_backend],
)
app = FastAPI()

app.include_router(
    fastapi_users.get_auth_router(auth_backend),
    prefix="/auth/jwt",
    tags=["auth"],
)


if __name__ == '__main__':
    import uvicorn

    uvicorn.run('main:app', host="0.0.0.0", port=8000, reload=True)
