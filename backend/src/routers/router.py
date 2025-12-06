from .health import health_router
from .shortener import shortener_router
from .metrics import metrics_router

all_blueprints = [
    health_router,
    shortener_router,
    metrics_router
]