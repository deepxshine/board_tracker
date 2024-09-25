FROM python:3.11

WORKDIR /backend


COPY ./src /src

COPY requirements.txt requirements.txt

RUN pip install -r requirements.txt


CMD ["sh", "-c", "export PYTHONPATH=\"${PYTHONPATH}:src\""]
CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]

