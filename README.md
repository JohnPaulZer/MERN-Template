# MERN Template CLI tool

`mern-template-jpz` is a CLI tool that creates a ready-to-use MERN authentication starter.

The generated app is based on the [`wesdevteam/mern-template`](https://github.com/wesdevteam/mern-template) project and includes a TypeScript/Express + MongoDB backend with secure access/refresh token authentication, plus a React/Vite frontend wired to the API.

## What It Creates

- `backend` - Express, MongoDB, Mongoose, TypeScript, JWT auth, httpOnly refresh cookies, session tracking, rate limiting, and security middleware
- `frontend` - React, Vite, TypeScript, Tailwind CSS, React Router, Zustand, Axios, and auth pages

The scaffold includes registration, login, logout, token refresh, protected routing, and startup refresh handling.

## Quick Start

Create a new project folder:

```bash
npx mern-template-jpz my-app
```

You can also run the CLI without a project name:

```bash
npx mern-template-jpz
```

When you do not add a project name, the template files are created in the current folder.

If you created a new project folder, open it:

```bash
cd my-app
```

Install and start the backend:

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Open another terminal, then install and start the frontend:

```bash
cd my-app/frontend
npm install
cp .env.example .env
npm run dev
```

The frontend runs at `http://localhost:5173` by default. The backend API runs at the port configured in `backend/.env`.

## Using Global Install

```bash
npm install -g mern-template-jpz
mern-template-jpz my-app
```

## Command Format

```bash
npx mern-template-jpz [project-name]
```

Options:

- `-f, --force` - allow scaffolding into a non-empty directory
- `-h, --help` - show help

## Generated Folder Structure

```text
backend/
  src/
    controllers/
    db/
    middlewares/
    models/
    routes/
    services/
    types/
    utils/
    index.ts

frontend/
  src/
    api/
    assets/
    axios/
    components/
    layouts/
    loaders/
    pages/
    routes/
    stores/
    types/
    utils/
    App.tsx
    index.css
    main.tsx
```

## License

This CLI tool is licensed under the MIT License. See [LICENSE](LICENSE).
