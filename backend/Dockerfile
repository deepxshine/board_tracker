FROM python:3.11-slim

ENV PYTHONUNBUFFERED=1

ENV PYTHONDONTWRITEBYTECODE=1

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY ./src ./src
COPY ./migrations ./migrations
COPY alembic.ini .
CMD ["sh", "-c", "alembic upgrade head && python3 -m uvicorn src.main:app --host 0.0.0.0 --port 8080 --reload"]