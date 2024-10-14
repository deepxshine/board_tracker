import os

POSTGRES_USER = os.getenv("POSTGRES_USER", 'postgres')
POSTGRES_PASSWORD = os.getenv("POSTGRES_PASSWORD", "postgres")
POSTGRES_DB = os.getenv("POSTGRES_DB", "db")
POSTGRES_PORT = os.getenv("POSTGRES_PORT", 5432)
POSTGRES_HOST = os.getenv("POSTGRES_HOST", "db")

COOLIE_MAX_AGE = os.getenv("COOLIE_MAX_AGE", 3600)
JWT_LIFETIME = os.getenv("JWT_LIFETIME", 3600)
JWT_SECRET = os.getenv("JWT_SECRET", "SECRET")
UM_SECRET = os.getenv("UM_SECRET", "UM_SECRET")
