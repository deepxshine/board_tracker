import os

POSTGRES_USER = os.getenv("POSTGRES_USER", 'postgres')
POSTGRES_PASSWORD = os.getenv("POSTGRES_PASSWORD", "postgres")
POSTGRES_DB = os.getenv("POSTGRES_DB", "db")
POSTGRES_PORT = os.getenv("POSTGRES_PORT", 5432)
POSTGRES_HOST = os.getenv("POSTGRES_HOST", "0.0.0.0")
