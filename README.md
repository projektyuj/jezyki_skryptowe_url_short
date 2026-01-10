# URL Shortener – Backend

Backend aplikacji skracającej URL, napisany w **Python / Flask**, z bazą MongoDB i obsługą statystyk odwiedzin.

---

## Struktura katalogów
```
backend/
  src/
    app.py                 # entrypoint Flask
    config.py              # konfiguracja aplikacji (singleton)
    decorators.py          # dekorator singleton
    routers/               # blueprinty (endpointy)
      health.py
      shortener.py
      metrics.py
      router.py            # lista wszystkich blueprintów
    controllers/           # logika biznesowa
      shortener_controller.py
      metrics_controller.py
    database/              # serwis MongoDB
      db_service.py
    statistics/            # pusty placeholder
    utils/
      id_generator.py      # generowanie unikalnych ID
  requirements.txt         # zależności
  smoke_tests/             # szybkie testy działania
  tests/                   # pełne testy jednostkowe





---
```
## Funkcjonalności

- Skracanie długich URLi (`POST /url`)  
- Pobieranie oryginalnego URL (`GET /url/<id>`)  
- Tworzenie custom ID (`POST /url/<id>/custom`)  
- Usuwanie URL (demo) (`DELETE /url/<id>`)  
- Pobieranie statystyk odwiedzin (`GET /metrics/<id>`)  
- Sprawdzenie stanu backendu (`GET /health`)  

---

## Endpointy i kody HTTP

| Metoda | Endpoint                 | Opis                         | Kod HTTP |
|--------|-------------------------|------------------------------|----------|
| GET    | /health                  | Sprawdza stan serwera        | 200      |
| POST   | /url                     | Tworzy nowy skrócony URL     | 201      |
| GET    | /url/<id>                | Pobiera oryginalny URL       | 200 / 404|
| DELETE | /url/<id>                | Usuwa skrócony URL           | 200      |
| POST   | /url/<id>/custom         | Tworzy URL z własnym ID      | 201      |
| GET    | /metrics/<id>            | Pobiera liczbę odwiedzin     | 200 / 404|

---

## Logika działania

1. **Tworzenie skróconego URL**
   - `save_url()` w `shortener_controller.py`:
     - Generuje ID (`IdGenerator`)  
     - Zapisuje URL w MongoDB (`MongoDBService`)  
     - Tworzy metryki odwiedzin (`create_metrics`)  

2. **Pobieranie skróconego URL**
   - `get_url()`:
     - Pobiera URL z bazy  
     - Zwiększa licznik odwiedzin (`increment_metrics`)  

3. **Obsługa metryk**
   - `get_metrics()` – zwraca JSON z liczbą odwiedzin  

4. **Konfiguracja**
   - `Config` singleton – host, port, debug, CORS
   - CORS konfigurowalny (`allow_all` lub lista domen)

5. **Generowanie ID**
   - `IdGenerator` tworzy unikalne ID z cyfr i wielkich liter  
   - Bazuje na ostatnim zapisanym ID w bazie  

---

## Testy

- `scripts/backend/smoke_test.sh` – szybkie testy smoke, sprawdzają podstawowe endpointy.  
- `scripts/backend/test.sh` – pełne testy jednostkowe z `pytest`.  
- `build.sh` – instaluje zależności i kompiluje pliki `.py`, wykrywając błędy składni.

---

## Uruchomienie lokalne

```bash
cd backend
pip install -r requirements.txt
python src/app.py
```

Domyślnie serwer działa na: `http://localhost:5000`




# URL Shortener – Frontend

Frontend aplikacji skracającej URL, napisany w **React / Vite**, z prostym UI do generowania skróconych linków i podglądu statystyk odwiedzin.

---

## Struktura katalogów

```
frontend/
src/
    main.jsx               # entrypoint React
    App.jsx                # główny komponent z routingiem
    Layout.jsx             # wspólny layout dla wszystkich stron
    LandingPage.jsx        # strona generowania skróconego URL
    UrlShortenerPage.jsx   # placeholder dla strony skróconego URL
    StatisticsPage.jsx     # strona wyświetlająca statystyki odwiedzin
    ErrorPage.jsx          # strona 404
    _requests.jsx          # funkcje do komunikacji z backendem
    App.css                # style komponentów
    index.css              # style globalne
  package.json             # dependencies i skrypty projektu
  vite.config.js           # konfiguracja bundlera Vite
  public/                  # statyczne zasoby (np. obrazki)

---
```
## Funkcjonalności

- Formularz do generowania skróconego URL (`LandingPage`)  
- Wyświetlanie skróconego URL (`UrlShortenerPage`) – w planach  
- Wyświetlanie liczby odwiedzin linku (`StatisticsPage`)  
- Strona błędu 404 (`ErrorPage`)  
- Routing po stronie klienta (`react-router`)  

---

## Routing

| Ścieżka                  | Komponent                   | Opis                           |
|---------------------------|----------------------------|--------------------------------|
| /generate                 | LandingPage                | Generowanie skróconego URL     |
| /:id                      | UrlShortenerPage           | Wyświetlanie skróconego URL (placeholder) |
| /statistics/:id           | StatisticsPage             | Statystyki odwiedzin           |
| /404                      | ErrorPage                  | Strona błędu                   |
| *                         | /404                       | Catch-all dla nieistniejących tras |

---

## Komunikacja z backendem

- `_requests.jsx` definiuje funkcje fetch do backendu:  
  - `createLink(body)` – POST do `/`  
  - `getLink(id)` – GET do `/:id`  
  - `getStats(id)` – GET do `/statistics/:id`  


---

## Style

- `App.css` – style komponentów (layout, formularze, nagłówki, przyciski, responsywność)  
- `index.css` – style globalne, fonty, body, kolory i motyw jasny/ciemny  

---

## Uruchomienie lokalne

```bash
cd frontend
npm install
npm run dev
```

Domyślnie frontend działa na: `http://localhost:5173` (Vite dev server)  
Backend powinien działać pod: `http://localhost:5000`  

> Frontend oczekuje działającego backendu na `http://localhost:5000` do generowania linków i pobierania statystyk.





---

# Deploy

Projekt jest skonfigurowany do automatycznego deployu na platformie **Render** przy użyciu pliku `render.yaml`.

## Backend

- Repozytorium: `https://github.com/projektyuj/jezyki_skryptowe_url_short`
- Runtime: Python
- Build: `pip install -r backend/requirements.txt`
- Start: `gunicorn -w 2 -b 0.0.0.0:$PORT backend.src.app:app`
- Health check: `/health`
- Automatyczny deploy przy commitach (`autoDeployTrigger: commit`)
- Zmienna środowiskowa CORS: `CORS_ALLOW_ALL=true`
- Python version: `3.14.0`
- Dev backend: `http://<dev-backend-url>`
- Prod backend: `http://<prod-backend-url>`

## Frontend

- Repozytorium: `https://github.com/kierasuj/jezyki_skryptowe_url_short`
- Runtime: static site
- Build: `cd frontend && npm install && npm run build`
- Publikacja: folder `frontend/dist`
- Automatyczny deploy przy commitach (`autoDeployTrigger: commit`)
- Zmienna środowiskowa dla API: `VITE_API_BASE_URL_PROD` ustawiona na URL backendu

> Frontend i backend są deployowane niezależnie, ale frontend wymaga działającego backendu.
