# MERN Template CLI tool

`mern-template-jpz` is a CLI tool that creates a ready-to-use MERN starter project.

Instead of manually creating the same folders and setup files every time you start a new MERN project, you can run one command and get a clean full-stack project structure.

It generates a full-stack app with:

- MongoDB
- Express
- React
- Node.js
- TypeScript
- Vite
- Tailwind CSS

This template is useful if you want to start a MERN project quickly with TypeScript already configured for both the backend and frontend.

## What It Creates

The CLI creates a project with two main folders:

- `backend` - Express, MongoDB, Mongoose, and TypeScript API
- `frontend` - React, Vite, TypeScript, and Tailwind CSS app

The backend includes a basic Express server, MongoDB connection setup, routes, controllers, services, middlewares, models, types, and utility files.

The frontend includes a Vite React app with Tailwind CSS, Axios setup, routes, layouts, pages, components, stores, types, and utility files.

It also includes a simple health-check example so the frontend can connect to the backend API.

## Quick Start

Run this command:

```bash
npx mern-template-jpz my-app
```

`my-app` is the name of the folder that will be created. You can replace it with any project name you want.

Then open the new project:

```bash
cd my-app
```

Install dependencies:

```bash
npm install
```

Create your backend environment file:

```bash
cp backend/.env.example backend/.env
```

Start the app:

```bash
npm run dev
```

This starts both the backend and frontend together.

The frontend will run at:

```text
http://localhost:5173
```

The backend API will run at:

```text
http://localhost:5000
```

## Using Global Install

You can also install the CLI globally:

```bash
npm install -g mern-template-jpz
```

The `-g` means global. This installs the CLI tool on your computer instead of inside one project folder.

After global installation, npm makes the `mern-template-jpz` command available in your terminal. This means you can run the command from any folder without using `npx`.

Then create a project with:

```bash
mern-template-jpz my-app
```

This command creates a new folder called `my-app` and adds the MERN template files inside it.

## Command Format

```bash
npx mern-template-jpz <project-name>
```

Example:

```bash
npx mern-template-jpz my-mern-project
```

This creates a folder named `my-mern-project` and puts the template files inside it.

Use `npx` when you only want to run the CLI once. Use global install if you want the command available on your computer all the time.

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
