"""
Configuration module for Campaign Pilot API
"""

from pydantic_settings import BaseSettings
from functools import lru_cache

class Settings(BaseSettings):
    """Application settings loaded from environment variables."""
    
    app_name: str = "Campaign Pilot API"
    app_version: str = "1.0.0"
    app_description: str = "AI-powered marketing campaign generation API"
    
    # Server settings
    fastapi_env: str = "development"
    host: str = "0.0.0.0"
    port: int = 8000
    
    # CORS settings
    frontend_url: str = "http://localhost:3000"
    allowed_origins: list[str] = ["http://localhost:3000", "http://localhost:3001", "*"]
    
    class Config:
        env_file = ".env"
        case_sensitive = False

@lru_cache()
def get_settings() -> Settings:
    """Get cached settings instance."""
    return Settings()
