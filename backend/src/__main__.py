from backend.src.app import app


@app.get("/")
def read_root():
    return {"Hello": "World123123"}


if __name__ == '__main__':
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
