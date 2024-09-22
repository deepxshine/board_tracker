from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


if __name__ == '__main__':
    #123
    import uvicorn
    uvicorn.run('main:app', host="0.0.0.0", port=8000, reload=True)
