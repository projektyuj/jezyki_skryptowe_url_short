import os
from .decorators import singleton


@singleton
class Config:
    """Application configuration as a Singleton accessible via Config.get_instance()."""

    def __init__(self) -> None:
        # Backend
        self.host: str = os.getenv("HOST", "0.0.0.0")
        self.port: int = int(os.getenv("PORT", "5000"))
        self.debug: bool = os.getenv("FLASK_DEBUG", "false").lower() == "true"

        # CORS
        self.cors_allow_all: bool = os.getenv("CORS_ALLOW_ALL", "true").lower() == "true"
        self.cors_origins: str = os.getenv("CORS_ORIGINS", "*")  # comma-separated