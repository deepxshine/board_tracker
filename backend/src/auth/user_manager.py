from typing import Optional

from fastapi import Depends, Request
from fastapi_users import BaseUserManager, IntegerIDMixin

from src.models.user import User, get_user_db
from src.constants import UM_SECRET


class UserManager(IntegerIDMixin, BaseUserManager[User, id]):
    reset_password_token_secret = UM_SECRET
    verification_token_secret = UM_SECRET

    async def on_after_register(self, user: User,
                                request: Optional[Request] = None):
        print(f"User {user.id} has registered.")



async def get_user_manager(user_db=Depends(get_user_db)):
    yield UserManager(user_db)
