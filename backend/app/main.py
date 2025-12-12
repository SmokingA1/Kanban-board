from fastapi import FastAPI
from app.core.config import settings

from app.api.main import main_router

app = FastAPI(title=settings.PROJECT_NAME)
app.include_router(main_router)

@app.get("/", response_model=dict)
async def home():
    return {"data": "Hello master"}