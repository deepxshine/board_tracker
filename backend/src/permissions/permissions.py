def is_admin(current_user) -> bool:
    if current_user.is_superuser:
        return True
    return False
