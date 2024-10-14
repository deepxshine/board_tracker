from typing import List

from src.crud.user import edit_user, del_user
from src.crud.utils import get_all_or_404, get_count
from src.database.database import get_session
from src.models.user import User
from fastapi import APIRouter, Depends, HTTPException
from src.permissions.permissions import is_admin
from src.schemas.user import UserUpdate, UserRead
from sqlalchemy.ext.asyncio import AsyncSession
from src.auth.backend import current_active_user

router = APIRouter(
    prefix="/user",
    tags=["admin-user"],
    responses={404: {"description": "Not found"}},
)


@router.get("/")
async def get_users(
        session: AsyncSession = Depends(get_session),
        current_user: int = Depends(current_active_user, ),
) -> List[UserRead]:
    if is_admin(current_user):
        users = await get_all_or_404(User, session)
        return users
    raise HTTPException(status_code=403, detail="Forbidden")


@router.get("/count")
async def get_users_count(
        session: AsyncSession = Depends(get_session),
        current_user: int = Depends(current_active_user, ),
) -> int:
    if is_admin(current_user):
        count = await get_count(User, session)
        return count
    raise HTTPException(status_code=403, detail="Forbidden")


@router.patch("/{user_id:int}/")
async def patch_user(
        user_id: int,
        data: UserUpdate,
        session: AsyncSession = Depends(get_session),
        current_user: int = Depends(current_active_user, ),
) -> UserRead:
    if is_admin(current_user):
        user = await edit_user(user_id, data, session)
        return user
    raise HTTPException(status_code=403, detail="Forbidden")


@router.delete("/{user_id:int}/")
async def delete_user(
        user_id: int,
        session: AsyncSession = Depends(get_session),
        current_user: int = Depends(current_active_user, ),
) -> dict:
    if is_admin(current_user):
        await del_user(user_id, session)
        return {"message": "User deleted successfully"}
    raise HTTPException(status_code=403, detail="Forbidden")
