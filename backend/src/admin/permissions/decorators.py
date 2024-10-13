from fastapi.exceptions import HTTPException


def is_admin(current_user):
    async def inner(func):
        async def wrapper(*args, **kwargs):
            if current_user.is_superuser:
                return await func(*args, **kwargs)
            raise HTTPException(status_code=403, detail="You are not admin")
        return wrapper
    return inner
