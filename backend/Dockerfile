FROM python:3.11

WORKDIR /backend


COPY ./src /src

CMD ["export", "PYTHONPATH=/backend/src"]

COPY requirements.txt requirements.txt

RUN pip install -r requirements.txt

CMD ["python", "src"]

