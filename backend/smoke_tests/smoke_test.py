import requests

def test_healthcheck_smoke():
    response = requests.get("https://jezyki-skryptowe-url-short-backend-dev.onrender.com/health")
    assert response.status_code == 200