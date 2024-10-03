from fastapi import FastAPI
from fastapi_users import FastAPIUsers
from fastapi.middleware.cors import CORSMiddleware

from src.auth.backend import auth_backend
from src.auth.user_manager import get_user_manager
from src.models.user import User
from src.schemas.user import UserRead, UserCreate, UserUpdate
from src.routers.ticket import router as ticket_router
from src.routers.inventory import router as inventory_router
from src.admin.app import app as admin_app
from src.routers.client import router as client_router

fastapi_users = FastAPIUsers[User, id](
    get_user_manager,
    [auth_backend],
)
app = FastAPI()
app.mount("/admin", admin_app)

app.include_router(
    fastapi_users.get_auth_router(auth_backend),
    prefix="/auth/jwt",
    tags=["auth"],
)

app.include_router(
    fastapi_users.get_register_router(UserRead, UserCreate),
    prefix="/auth/jwt",
    tags=["auth"],
)

app.include_router(
    fastapi_users.get_users_router(UserRead, UserUpdate),
    prefix="/users",
    tags=["users"],
)

app.include_router(ticket_router)
app.include_router(inventory_router)
app.include_router(client_router)

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8080",
    "0.0.0.0",

]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

if __name__ == '__main__':
    import uvicorn

    uvicorn.run('main:app', host="127.0.0.1", port=8000, reload=True)
