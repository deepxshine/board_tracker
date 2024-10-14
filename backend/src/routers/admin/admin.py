from fastapi import APIRouter

from src.routers.admin.routers.client import router as client_router
from src.routers.admin.routers.ticket import router as ticket_router
from src.routers.admin.routers.inventory import router as inventory_router
from src.routers.admin.routers.user import router as user_router

router = APIRouter(
    prefix="/admin",
    responses={404: {"description": "Not found"}},
)

router.include_router(client_router)
router.include_router(ticket_router)
router.include_router(inventory_router)
router.include_router(user_router)
