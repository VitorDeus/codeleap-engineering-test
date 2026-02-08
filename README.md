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

---

Project Structure

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

---

## Running the Backend

cd backend
python -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

---

## The API will be available at:

http://localhost:8000/careers/

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

Make sure your `.env` has:
```
VITE_API_BASE_URL=http://localhost:8000/careers/
```

---

## API Switching

If no environment variable is provided, the application automatically falls back to:
https://dev.codeleap.co.uk/careers/

To use the local backend, create a .env file in the frontend directory:
VITE_API_BASE_URL=http://localhost:8000/careers/

---

## Backend Deployment (Render / Railway)

The backend can be deployed on **Render** or **Railway** as a Python web service.

🔗 **Live API URL:** _https://your-api.onrender.com/careers/_ <!-- replace with actual URL after deploy -->

### Environment Variables

| Name | Example value |
|------|---------------|
| `DJANGO_SECRET_KEY` | _(generate a strong random key)_ |
| `DJANGO_DEBUG` | `False` |
| `DJANGO_ALLOWED_HOSTS` | `.onrender.com` or `.railway.app` |
| `CORS_ALLOWED_ORIGINS` | `https://your-app.vercel.app` |

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

🔗 **Live URL:** _https://your-app.vercel.app_ <!-- replace with actual URL after deploy -->

### How to deploy

1. Go to [vercel.com](https://vercel.com) and sign in with your GitHub account.
2. Click **"Add New… → Project"** and import this repository.
3. In **Root Directory**, keep it as `.` (the repo root — Vercel auto-detects Vite).
4. Under **Environment Variables**, add:
   | Name | Value |
   |------|-------|
   | `VITE_API_BASE_URL` | `https://dev.codeleap.co.uk/careers/` |
5. Click **Deploy**.

> The `VITE_API_BASE_URL` variable is baked at build time. Set it to
> whatever backend you want the production build to hit. If omitted, the
> app falls back to `https://dev.codeleap.co.uk/careers/`.

---

## Commit History

```text
feat(frontend): implement CodeLeap CRUD UI and API integration
feat(backend): add Django REST API for posts
chore(frontend): support configurable API base URL
docs: add fullstack README with backend setup and API switching
```

