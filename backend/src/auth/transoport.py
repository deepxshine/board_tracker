from fastapi_users.authentication import CookieTransport
from src.constants import COOLIE_MAX_AGE

cookie_transport = CookieTransport(cookie_max_age=COOLIE_MAX_AGE)
