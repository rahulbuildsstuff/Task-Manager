# ✅ Task Manager

A lightweight full-stack Task Manager app built with **React + Vite** (frontend) and **Node.js + Express** (backend), using a JSON file for persistent storage.

---

## 📁 Project Structure

```
task-manager/
├── Backend/
│   ├── data/
│   │   └── tasks.json        ← persistent storage
│   ├── routes/
│   │   └── task.js           ← CRUD route handlers
│   ├── utils/
│   │   └── fileHandler.js    ← read/write helpers
│   └── server.js             ← Express app entry point
│
├── Frontend/
│   └── frontend/
│       └── src/
│           ├── Components/
│           │   ├── Taskform.jsx   ← add task form
│           │   └── Tasklist.jsx   ← task list + edit/delete
│           ├── App.jsx            ← root component + filter logic
│           ├── api.js             ← all fetch() calls
│           └── index.css
│
├── .gitignore
└── README.md
```

---

## ⚙️ Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm (comes with Node)

---

## 🚀 Setup & Run

### 1. Clone the repository

```bash
git clone https://github.com/rahulbuildsstuff/Task-Manager.git
cd Task-Manager
```

---

### 2. Start the Backend

```bash
cd Backend
npm install
npm run dev
```

The server starts at **http://localhost:5000**

> `npm run dev` uses **nodemon** for auto-restart on file changes.  
> For production: `npm start`

---

### 3. Start the Frontend

Open a **new terminal** in the project root:

```bash
cd Frontend/frontend
npm install
npm run dev
```

The React app starts at **http://localhost:5173**

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/tasks` | Fetch all tasks |
| `POST` | `/tasks` | Create a new task |
| `PATCH` | `/tasks/:id` | Update title or toggle complete |
| `DELETE` | `/tasks/:id` | Delete a task |

### Task Schema

```json
{
  "id": "uuid-string",
  "title": "string",
  "completed": false,
  "createdAt": "ISO timestamp"
}
```

---

## 🎯 Features

- **Add** a task (Add button disabled when input is empty)
- **Complete** a task — click the task title to toggle ✓
- **Edit** a task — click **Edit**, modify, then **Save** or press `Enter`
- **Cancel** editing — click **Cancel** or press `Esc`
- **Delete** a task
- **Filter** tasks — All / Completed / Pending (active filter is highlighted)
- **Loading & error** states when fetching from the backend

---

## 📝 Assumptions & Trade-offs

### Assumptions

- **Single user, local use only** — No authentication, sessions, or user accounts. The app assumes one person is using it on their local machine.
- **Always-on backend** — The frontend assumes the Express server is running at `http://localhost:5000`. There is no offline mode or service worker.
- **Small data set** — File-based storage (`tasks.json`) is sufficient; no pagination is implemented.

### Trade-offs

| Decision | Reason | Trade-off |
|----------|--------|-----------|
| **File-based storage** (JSON) instead of a database | Keeps the stack simple and dependency-free for the scope of this project | Not suitable for concurrent writes or large data; data loss risk if the file is corrupted |
| **Native `fetch`** instead of axios | Minimises dependencies | More verbose error handling; no automatic request timeout |
| **Client-side filtering** instead of query params | Simpler frontend logic; no extra API calls | All tasks are always fetched; inefficient at scale |
| **No state management library** (Redux, Zustand, etc.) | Overkill for a two-component app | `refresh()` re-fetches from the API after every mutation instead of updating local state optimistically |
| **Double-nested frontend directory** (`Frontend/frontend/`) | Artefact of initialising Vite inside an existing `Frontend/` folder | Slightly unintuitive path; can be flattened in a future cleanup |
| **Open CORS** (`app.use(cors())`) | Convenient for local development | In production this should be restricted to the frontend's origin |

---

## 🔧 Environment Variables

The backend reads `process.env.PORT` with a fallback of `5000`:

```bash
# optional — create Backend/.env
PORT=5000
```

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, Vite 8, Tailwind CSS 4 |
| Backend | Node.js, Express 5 |
| Storage | JSON file (`tasks.json`) |
| Dev tools | nodemon, ESLint |
