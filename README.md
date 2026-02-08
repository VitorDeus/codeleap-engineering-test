# CodeLeap Engineering Test

A production-ready social network feed built with React, TypeScript, and Vite.

This repository also includes an optional **Django + Django REST Framework backend**
that mirrors the official CodeLeap API contract, allowing the project to be run
as a fullstack application without breaking frontend compatibility.

---

## How to Run (Frontend)

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Project Structure

```
src/
  api/
    http.ts              # Fetch wrapper with base URL and error handling
    posts.ts             # Typed API endpoints for CRUD operations
  components/
    Header.tsx           # Blue header bar
    CreatePostCard.tsx   # Form card for creating posts
    PostCard.tsx         # Individual post display with owner actions
    Modal.tsx            # Generic accessible modal (ESC, overlay click, focus trap)
    DeletePostModal.tsx  # Confirmation modal for deleting posts
    EditPostModal.tsx    # Modal for editing post title and content
  hooks/
    useUsername.ts       # localStorage abstraction for username persistence
    usePosts.ts          # React Query hooks for all post operations
  pages/
    SignupPage.tsx       # Username entry screen
    FeedPage.tsx         # Main feed with create form and posts list
  types/
    post.ts              # Post type definition
  App.tsx                # Router setup and query client provider
  main.tsx               # Entry point
```

---

## Running the Full Stack Locally

Open **two separate terminals**:

**Terminal 1 — Backend:**

```bash
cd backend
python -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver 127.0.0.1:8000
```

**Terminal 2 — Frontend:**

```bash
npm install
npm run dev
```

Open http://localhost:5173 in your browser. The Vite dev server proxies
`/careers/` requests to the Django backend automatically — no environment
variables needed for local development.

> **Tip:** Make sure your `.env` has `VITE_API_BASE_URL=` (empty). This is the
> default, which enables the Vite proxy. Only set it to a full URL when building
> for production (e.g. Vercel).

---

## Running Backend with Docker (Optional)

```bash
docker compose up --build
```

The API will be available at http://localhost:8000/careers/

Migrations run automatically on container startup. The frontend remains local:

```bash
npm run dev
```

---

## Running Tests

### Frontend (Vitest)

```bash
# Run once
npm run test:run

# Watch mode
npm run test

# With coverage
npm run test:coverage
```

### Backend (pytest)

```bash
cd backend
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pytest -q
```

### Linting (Backend)

```bash
cd backend
ruff check .
black --check .
```

> CI runs all of the above automatically via GitHub Actions on every push and PR.

---

## API Switching

The `VITE_API_BASE_URL` environment variable controls where API requests go:

| Value | Behaviour |
|-------|-----------|
| _(empty / unset)_ | Relative paths (`/careers/`). In dev, Vite proxies to `127.0.0.1:8000`. |
| `https://codeleap-engineering-test-ip1k.onrender.com` | Production — requests go directly to Render. |

For **local development**, leave it empty (default in `.env`):

```
VITE_API_BASE_URL=
```

For **production builds** (e.g. on Vercel), set it to the backend URL:

```
VITE_API_BASE_URL=https://codeleap-engineering-test-ip1k.onrender.com
```

---

## Backend Deployment (Render / Railway)

The backend can be deployed on **Render** or **Railway** as a Python web service.

🔗 **Live API URL:** https://codeleap-engineering-test-ip1k.onrender.com/careers/

### Environment Variables

| Name | Example value |
|------|---------------|
| `DJANGO_SECRET_KEY` | _(generate a strong random key)_ |
| `DJANGO_DEBUG` | `False` |
| `DJANGO_ALLOWED_HOSTS` | `.onrender.com` or `.railway.app` |
| `CORS_ALLOWED_ORIGINS` | `https://codeleap-engineering-test-delta.vercel.app` |

> If no `DATABASE_URL` is set the backend defaults to **SQLite**, which is
> fine for demos but will reset on each Render deploy. For persistence,
> attach a managed Postgres and set `DATABASE_URL`.

### Deploy on Render

1. Go to [render.com](https://render.com) → **New → Web Service**.
2. Connect your GitHub repo.
3. Set **Root Directory** to `backend`.
4. **Build Command:** `pip install -r requirements.txt && python manage.py collectstatic --noinput && python manage.py migrate --noinput`
5. **Start Command:** `gunicorn codeleap_api.wsgi --bind 0.0.0.0:$PORT`
6. Add the environment variables listed above.
7. Click **Create Web Service**.

### Deploy on Railway

1. Go to [railway.app](https://railway.app) → **New Project → Deploy from GitHub**.
2. Select this repo. Railway auto-detects the `Procfile`.
3. In **Settings → Root Directory**, set to `backend`.
4. Under **Variables**, add the environment variables listed above.
5. Railway will build and deploy automatically.

---

## Frontend Deployment (Vercel)

The frontend is deployed on Vercel.

🔗 **Live URL:** https://codeleap-engineering-test-delta.vercel.app/

### How to deploy

1. Go to [vercel.com](https://vercel.com) and sign in with your GitHub account.
2. Click **"Add New… → Project"** and import this repository.
3. In **Root Directory**, keep it as `.` (the repo root — Vercel auto-detects Vite).
4. Under **Environment Variables**, add:
   | Name | Value |
   |------|-------|
   | `VITE_API_BASE_URL` | `https://codeleap-engineering-test-ip1k.onrender.com` |
5. Click **Deploy**.

> The `VITE_API_BASE_URL` variable is baked at build time. Set it to
> whatever backend **host** you want the production build to hit (without
> `/careers/`). If omitted, the app falls back to
> `https://codeleap-engineering-test-ip1k.onrender.com`.

---

## Quick Reference Checklist

### Live Links

| Service | URL |
|---------|-----|
| **Frontend** (Vercel) | https://codeleap-engineering-test-delta.vercel.app |
| **API** (Render) | https://codeleap-engineering-test-ip1k.onrender.com/careers/ |

### How to Run Locally

```bash
# Terminal 1 — Backend
cd backend && python manage.py runserver

# Terminal 2 — Frontend
npm run dev
```

Open http://localhost:5173.

### Minimum Environment Variables

| Variable | Local (`.env`) | Vercel | Render |
|----------|---------------|--------|--------|
| `VITE_API_BASE_URL` | `http://127.0.0.1:8000/careers/` | `https://codeleap-engineering-test-ip1k.onrender.com/careers/` | — |
| `DJANGO_ALLOWED_HOSTS` | — | — | `.onrender.com` |
| `CORS_ALLOWED_ORIGINS` | — | — | `https://codeleap-engineering-test-delta.vercel.app` |

### How to Run Tests

```bash
npm run test:run    # Frontend — 14 tests (Vitest)
cd backend && pytest -q   # Backend — 8 tests (pytest)
```

### Note on Render Free Tier

> Render free-tier services spin down after ~15 min of inactivity.
> The first request after a cold start may take **30–60 seconds**.
> Subsequent requests are fast.

---

## Commit History

```text
feat(frontend): implement CodeLeap CRUD UI and API integration
feat(backend): add Django REST API for posts
chore(frontend): support configurable API base URL
feat(docker): add docker-compose for backend local development
test: add golden quality layer (tests, lint, CI)
chore(backend): align timezone settings and remove warnings
test: add additional coverage for routing, ownership, and ordering
chore(frontend): prepare frontend for Vercel deployment
chore(backend): prepare Django API for production deployment
```

