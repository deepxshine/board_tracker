# board_tracker
## Документация по запуску проекта

### Клонирование репозитория

1. Клонируйте репозиторий с помощью следующей команды:
    bash
    git clone git@github.com:deepxshine/board_tracker.git

### Разворачивание проекта через Docker
Запустите проект с помощью Docker:
    bash
    docker-compose -f infra/docker-compose.yaml up --build

## Запуск Backend

### Перейдите в директорию backend:
    bash
    cd backend

### Создайте виртуальное окружение:
    bash
    python3 -m venv .venv

### Активируйте виртуальное окружение:
    Для Unix-систем:
    bash
    source .venv/bin/activate

### Для Windows-систем:
    bash
    .venv\Scripts\activate

### Установите зависимости:
    С помощью Poetry:
    bash
    poetry install

### Либо с помощью pip:
    bash
    pip install .

### Примените миграции базы данных:
    bash
    alembic upgrade head

### Запустите сервер:
    bash
    python3 -m uvicorn src.main:app --host 127.0.0.1 --port 8080 --reload

### Доступ к Swagger API документации:
    Откройте в браузере: http://127.0.0.1:8080/docs

##  Запуск Frontend

### Установите зависимости для фронтенда:
    bash
    npm install

### Соберите проект:
    bash
    npm run build

### Запустите фронтенд сервер:
    bash
    npm start

## Запуск через Docker
    Если вы запускаете проект через Docker, используйте следующие адреса для доступа:
    Фронтенд: http://0.0.0.0:3000
    Backend: http://0.0.0.0:8080/docs
    Grafana: http://0.0.0.0:3001

Эта документация предназначена для упрощения процесса запуска проекта и обеспечения корректной работы всех его компонентов.
