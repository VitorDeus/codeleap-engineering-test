# CodeLeap Engineering Test

A production-ready social network feed built with React, TypeScript, and Vite.

## How to Run

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

## Architecture Overview

### Tech Stack
- **React 19 + TypeScript** – Type-safe component-driven UI.
- **Vite** – Fast dev server and optimized builds.
- **Tailwind CSS v4** – Utility-first styling with zero config.
- **TanStack React Query** – Server-state management with caching, invalidation, and loading/error states.
- **date-fns** – Lightweight date formatting ("X minutes ago").
- **react-router-dom** – Client-side routing between Signup and Feed.

### Project Structure

```
src/
  api/
    http.ts             # Fetch wrapper with base URL and error handling
    posts.ts            # Typed API endpoints for CRUD operations
  components/
    Header.tsx          # Blue header bar
    CreatePostCard.tsx   # Form card for creating posts
    PostCard.tsx         # Individual post display with owner actions
    Modal.tsx           # Generic accessible modal (ESC, overlay click, focus trap)
    DeletePostModal.tsx  # Confirmation modal for deleting posts
    EditPostModal.tsx    # Modal for editing post title and content
  hooks/
    useUsername.ts       # localStorage abstraction for username persistence
    usePosts.ts         # React Query hooks for all post operations
  pages/
    SignupPage.tsx       # Username entry screen
    FeedPage.tsx         # Main feed with create form and posts list
  types/
    post.ts             # Post type definition
  App.tsx               # Router setup and query client provider
  main.tsx              # Entry point
```

### Design Decisions
- **React Query** handles server state, caching, and automatic refetching after mutations — no manual state syncing needed.
- **Generic Modal** component uses the native `<dialog>` element for built-in accessibility (ESC to close, focus trapping).
- **localStorage** persists the username across sessions; the hook abstracts read/write logic.
- **No Redux** — React Query covers server state; local UI state is handled with `useState`.

## Known Limitations
- No pagination — all posts are fetched in a single request.
- No logout functionality.
- Username is stored in localStorage only (no server-side authentication).
- No optimistic updates — UI waits for server confirmation before reflecting changes.

## Deployment
<!-- Add deployment link here -->
