# Jianni Spot

React UI on top of a small Django REST API in `backend/`. SQLite for the database, nothing fancy.

## Running it on your machine

You need two terminals: one for Django, one for the React dev server.

Backend (from `backend/`, with a venv):

```bash
python3 -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt
python3 manage.py migrate
python3 manage.py seed_accounts
python3 manage.py runserver
```

If `python3` isn’t found, install it (on Ubuntu/WSL: `sudo apt install python3 python3-venv python3-pip`). On Windows I’ve had better luck with `py` than `python`.

Frontend (repo root, where `package.json` is):

```bash
npm install
npm start
```

Then open http://localhost:3000 yourself — especially on WSL, the browser might not pop up on its own. The dev server sends `/api` requests to port 8000 via the proxy in `package.json`, so keep Django running or login will fail.

Test logins after seeding: `muli` / `jianni` and `masai` / `demo123`.

If you get stuck on “Loading…”, clear `token` in localStorage for localhost and refresh. If port 3000 is taken, `PORT=3001 npm start` (or pick another port on Windows the same way).

## Putting the project on GitHub

GitHub stores the repo; it doesn’t run Django or Node for you unless you add Actions or something else later.

1. Make a new empty repository on github.com (no README if you already have one here).
2. In this project folder:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

Replace the URL with yours. If Git asks you to log in, use a personal access token instead of a password for HTTPS.

Don’t commit secrets. This repo ignores `backend/db.sqlite3` and typical venv paths so your local DB and virtualenv don’t get uploaded.

## If you want a live site later

GitHub Pages can host the **built** React app (`npm run build` → `build/` folder) for free, but Pages only serves static files. You’d still need somewhere else to run Django (Render, Railway, a VPS, etc.) and set `REACT_APP_API_URL` when you build the front so it knows where the API lives. Same story for CORS: put your GitHub Pages URL (or custom domain) in `CORS_EXTRA_ORIGINS` on the server. The `backend/Procfile` and `gunicorn` in `requirements.txt` are there if you deploy the API to a host that understands Procfiles.

## Renaming “Jianni”

Search the codebase for `Jianni` and change it to whatever you want in the header, login copy, and `public/index.html`.
