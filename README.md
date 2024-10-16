# board_tracker

Данное приложение предназначено для упрощения процесса предоставления в аренду спортивного инвентаря. 
Оно предлагает удобный и интуитивно понятный интерфейс, который позволяет пользователям легко управлять
арендой различных видов спортивного оборудования. 

В приложении предусмотрены две ключевые роли: **User** и **Admin**.

### User
Пользователь (User) имеет доступ к следующим функциям:

- **Создание тикетов**: Пользователи могут создавать тикеты для аренды инвентаря, указывая необходимые детали,
  такие как тип инвентаря, дата и время аренды.

- **Редактирование тикетов**: Пользователи могут вносить изменения в уже созданные тикеты, что позволяет
  корректировать информацию в случае изменения планов или требований.

- **Удаление тикетов**: Если аренда больше не требуется, пользователи могут удалить соответствующие тикеты,
  освобождая ресурсы и упрощая управление.

- **Создание клиентов**: Пользователи могут добавлять новых клиентов в систему, что упрощает процесс аренды и
  позволяет отслеживать историю взаимодействия с каждым клиентом.

### Admin

Администратор (Admin) обладает более широкими правами и может выполнять следующие действия:

- **Управление тикетами**: Администраторы имеют возможность создавать, редактировать и удалять любые тикеты.

- **Управление клиентами**: Администраторы могут добавлять новых клиентов, а также редактировать или удалять
  существующих клиентов из базы данных.

- **Управление инвентарем**: Администраторы могут создавать, редактировать и удалять записи об инвентаре.
  Это включает в себя добавление новых предметов для аренды, обновление информации о доступных ресурсах и
  удаление устаревших или поврежденных предметов.

### Схема базы данных:
![image](https://github.com/user-attachments/assets/219fc0a9-f1fa-4d77-962c-b4d18ac97551)

### Сценарии использования:
![image](https://github.com/user-attachments/assets/6d152d70-d7b4-4ac4-8f11-b10c9167d986)

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
    source venv\Scripts\activate

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