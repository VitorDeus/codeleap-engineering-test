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

Running the Backend

cd backend
python -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

---

The API will be available at:

http://localhost:8000/careers/

---

API Switching

If no environment variable is provided, the application automatically falls back to:
https://dev.codeleap.co.uk/careers/

To use the local backend, create a .env file in the frontend directory:
VITE_API_BASE_URL=http://localhost:8000/careers/

---

## Commit History

```text
feat(frontend): implement CodeLeap CRUD UI and API integration
feat(backend): add Django REST API for posts
chore(frontend): support configurable API base URL
docs: add fullstack README with backend setup and API switching
```

