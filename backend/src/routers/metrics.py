from flask import Blueprint, request
from controllers.metrics_controller import get_metrics

metrics_router = Blueprint("metrics", __name__)

@metrics_router.get("/metrics/<path:id>")
def get_shortened_url(id: str):
    metrics = get_metrics(id)
    if not metrics:
        return {"error": "metrics not found"}, 404
    return metrics, 200