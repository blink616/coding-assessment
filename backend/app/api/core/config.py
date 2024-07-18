# app/core/config.py
from pydantic import BaseSettings

class Settings(BaseSettings):
    APP_NAME: str = "FastAPI Image Classification"
    API_V1_STR: str = "/api/v1"
    # Add more settings as needed

settings = Settings()
