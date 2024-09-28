from fastapi_users import FastAPIUsers
from fastapi_users.authentication import JWTStrategy, AuthenticationBackend

from src.auth.user_manager import get_user_manager
from src.constants import JWT_SECRET, JWT_LIFETIME
from src.auth.transoport import cookie_transport
from src.models.user import User


def get_jwt_strategy() -> JWTStrategy:
    return JWTStrategy(secret=JWT_SECRET, lifetime_seconds=JWT_LIFETIME)


auth_backend = AuthenticationBackend(
    name="jwt",
    transport=cookie_transport,
    get_strategy=get_jwt_strategy,
)

fastapi_users = FastAPIUsers[User, id](get_user_manager, [auth_backend])

current_active_user = fastapi_users.current_user(active=True)
