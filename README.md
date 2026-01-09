# jezyki_skryptowe_url_short

## Backend dostępny jest na stronie:
- https://jezyki-skryptowe-url-short-backend-dev.onrender.com/

## Frontend:
- https://jezyki-skryptowe-url-short-frontend.onrender.com/

### Endpointy:
GET /metrics/{id} - do sprawdzania wejść na stronę

GET /url/{id} - do sprawdzenia url na podstawie id

POST /url body: {"url": "string"} - dodanie własnego urla

GET /health - do smoketestów

## Uwagi
Korzystamy z mongodb atlas.

Przy każdym startupie programu sprawdzane jest ostatnie id i jest ono inkrementowane.


Singletony użyliśmy w:
- configu
- id generatorze
- mongodb service