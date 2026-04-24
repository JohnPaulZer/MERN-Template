# mern-template-jpz

Scaffold a MERN TypeScript starter with:

- Express + MongoDB/Mongoose backend
- React + Vite + TypeScript frontend
- Tailwind CSS via the official Vite plugin
- Axios, React Router, Zustand, and a health-check flow

## Usage

```bash
npx mern-template-jpz my-app
cd my-app
npm install
cp backend/.env.example backend/.env
npm run dev
```

You can also install it globally:

```bash
npm install -g mern-template-jpz
mern-template-jpz my-app
```

## Generated Structure

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

## Local Development

```bash
npm test
node src/index.js demo-app
```
