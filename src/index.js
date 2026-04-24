#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");

const versions = {
  react: "^19.2.5",
  reactDom: "^19.2.5",
  reactTypes: "^19.2.14",
  reactDomTypes: "^19.2.3",
  reactRouterDom: "^7.14.2",
  axios: "^1.15.2",
  zustand: "^5.0.12",
  vite: "^8.0.10",
  viteReact: "^6.0.1",
  tailwindcss: "^4.2.4",
  tailwindcssVite: "^4.2.4",
  typescript: "^6.0.3",
  express: "^5.2.1",
  expressTypes: "^5.0.6",
  cors: "^2.8.6",
  corsTypes: "^2.8.19",
  dotenv: "^17.4.2",
  mongoose: "^9.5.0",
  nodeTypes: "^25.6.0",
  tsx: "^4.21.0",
};

function main() {
  const { target: parsedTarget, force, help } = parseArgs(process.argv.slice(2));

  if (help) {
    printHelp();
    return;
  }

  const target = parsedTarget || ".";
  const targetDir = path.resolve(process.cwd(), target);
  const projectName = packageNameFromTarget(targetDir, target);
  createProject(targetDir, projectName, force);

  const relativeTarget = path.relative(process.cwd(), targetDir) || ".";
  console.log("");
  console.log("Created MERN TypeScript template in " + relativeTarget);
  console.log("");
  console.log("Next steps:");
  if (relativeTarget !== ".") {
    console.log("  cd " + relativeTarget);
  }
  console.log("  cd backend");
  console.log("  npm install");
  console.log("  Copy .env.example to .env and update it if needed");
  console.log("  npm run dev");
  console.log("");
  console.log("In another terminal:");
  console.log("  cd " + path.join(relativeTarget, "frontend"));
  console.log("  npm install");
  console.log("  npm run dev");
}

function parseArgs(args) {
  let target = "";
  let force = false;
  let help = false;

  for (const arg of args) {
    if (arg === "-h" || arg === "--help") {
      help = true;
    } else if (arg === "-f" || arg === "--force") {
      force = true;
    } else if (arg.startsWith("-")) {
      throw new Error("Unknown option: " + arg);
    } else if (!target) {
      target = arg;
    }
  }

  return { target, force, help };
}

function printHelp() {
  console.log(`
mern-template-jpz

Usage:
  mern-template-jpz
  mern-template-jpz [project-name]
  mern-template-jpz . --force

Examples:
  mern-template-jpz
  mern-template-jpz my-app

Options:
  -f, --force   Allow scaffolding into a non-empty directory
  -h, --help    Show this help message

No project name means the template will be created in the current directory.
`);
}

function packageNameFromTarget(targetDir, rawTarget) {
  const folderName = rawTarget === "." ? path.basename(targetDir) : path.basename(rawTarget);
  const cleaned = folderName
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/^[._-]+|[._-]+$/g, "");

  return cleaned || "mern-app";
}

function createProject(targetDir, projectName, force) {
  ensureSafeTarget(targetDir, force);

  const template = buildTemplate(projectName);

  for (const directory of template.directories) {
    fs.mkdirSync(path.join(targetDir, directory), { recursive: true });
  }

  for (const [filePath, contents] of Object.entries(template.files)) {
    const destination = path.join(targetDir, filePath);
    fs.mkdirSync(path.dirname(destination), { recursive: true });
    fs.writeFileSync(destination, contents, "utf8");
  }
}

function ensureSafeTarget(targetDir, force) {
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
    return;
  }

  const existingFiles = fs.readdirSync(targetDir);
  if (existingFiles.length > 0 && !force) {
    throw new Error(
      "Target directory is not empty. Use --force to scaffold into it: " + targetDir
    );
  }
}

function buildTemplate(projectName) {
  const appTitle = toTitle(projectName);
  const dbName = projectName.replace(/[^a-z0-9-]+/g, "-") || "mern-app";

  const directories = [
    "backend/src/controllers",
    "backend/src/db",
    "backend/src/middlewares",
    "backend/src/models",
    "backend/src/routes",
    "backend/src/services",
    "backend/src/types",
    "backend/src/utils",
    "frontend/src/api",
    "frontend/src/assets",
    "frontend/src/axios",
    "frontend/src/components",
    "frontend/src/layouts",
    "frontend/src/loaders",
    "frontend/src/pages",
    "frontend/src/routes",
    "frontend/src/stores",
    "frontend/src/types",
    "frontend/src/utils",
  ];

  const files = {
    "backend/.gitignore": lines([
      "node_modules",
      "dist",
      ".env",
      ".env.*",
      "!.env.example",
      "npm-debug.log*",
      "yarn-debug.log*",
      "yarn-error.log*",
      "pnpm-debug.log*",
      ".DS_Store",
    ]),
    "frontend/.gitignore": lines([
      "node_modules",
      "dist",
      ".env",
      ".env.*",
      "!.env.example",
      "npm-debug.log*",
      "yarn-debug.log*",
      "yarn-error.log*",
      "pnpm-debug.log*",
      ".DS_Store",
    ]),
    "README.md": lines([
      "# " + appTitle,
      "",
      "MERN starter generated with TypeScript, Express, MongoDB, React, Vite, and Tailwind CSS.",
      "",
      "## Getting Started",
      "",
      "Start the backend:",
      "",
      "```bash",
      "cd backend",
      "npm install",
      "cp .env.example .env",
      "npm run dev",
      "```",
      "",
      "Start the frontend in another terminal:",
      "",
      "```bash",
      "cd frontend",
      "npm install",
      "npm run dev",
      "```",
      "",
      "The API runs on `http://localhost:5000` and the frontend runs on `http://localhost:5173` by default.",
    ]),
    "backend/package.json": json({
      name: projectName + "-backend",
      version: "0.1.0",
      private: true,
      main: "dist/index.js",
      scripts: {
        dev: "tsx watch src/index.ts",
        build: "tsc",
        start: "node dist/index.js",
      },
      dependencies: {
        cors: versions.cors,
        dotenv: versions.dotenv,
        express: versions.express,
        mongoose: versions.mongoose,
      },
      devDependencies: {
        "@types/cors": versions.corsTypes,
        "@types/express": versions.expressTypes,
        "@types/node": versions.nodeTypes,
        tsx: versions.tsx,
        typescript: versions.typescript,
      },
      engines: {
        node: ">=20.19.0",
      },
    }),
    "backend/tsconfig.json": json({
      compilerOptions: {
        target: "ES2022",
        module: "Node16",
        moduleResolution: "Node16",
        rootDir: "src",
        outDir: "dist",
        strict: true,
        esModuleInterop: true,
        resolveJsonModule: true,
        forceConsistentCasingInFileNames: true,
        skipLibCheck: true,
      },
      include: ["src"],
    }),
    "backend/.env.example": lines([
      "PORT=5000",
      "MONGODB_URI=mongodb://127.0.0.1:27017/" + dbName,
      "CLIENT_URL=http://localhost:5173",
    ]),
    "backend/src/index.ts": lines([
      'import cors from "cors";',
      'import dotenv from "dotenv";',
      'import express from "express";',
      'import { connectDB } from "./db/connect";',
      'import { errorHandler, notFound } from "./middlewares/error.middleware";',
      'import apiRoutes from "./routes";',
      "",
      "dotenv.config();",
      "",
      "const app = express();",
      "const port = Number(process.env.PORT) || 5000;",
      'const mongoUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/' + dbName + '";',
      'const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";',
      "",
      "app.use(cors({ origin: clientUrl, credentials: true }));",
      "app.use(express.json());",
      "",
      'app.use("/api", apiRoutes);',
      "",
      "app.use(notFound);",
      "app.use(errorHandler);",
      "",
      "async function bootstrap() {",
      "  await connectDB(mongoUri);",
      "  app.listen(port, () => {",
      '    console.log("API running on http://localhost:" + port);',
      "  });",
      "}",
      "",
      "bootstrap().catch((error) => {",
      '  console.error("Failed to start API", error);',
      "  process.exit(1);",
      "});",
    ]),
    "backend/src/controllers/health.controller.ts": lines([
      'import type { Request, Response } from "express";',
      'import { getHealthStatus } from "../services/health.service";',
      "",
      "export function healthCheck(_req: Request, res: Response) {",
      "  res.status(200).json(getHealthStatus());",
      "}",
    ]),
    "backend/src/db/connect.ts": lines([
      'import mongoose from "mongoose";',
      "",
      "export async function connectDB(mongoUri: string) {",
      "  if (!mongoUri) {",
      '    throw new Error("MONGODB_URI is required");',
      "  }",
      "",
      "  const connection = await mongoose.connect(mongoUri);",
      '  console.log("MongoDB connected: " + connection.connection.host);',
      "}",
    ]),
    "backend/src/middlewares/error.middleware.ts": lines([
      'import type { ErrorRequestHandler, RequestHandler } from "express";',
      'import { HttpError } from "../utils/http-error";',
      "",
      "export const notFound: RequestHandler = (req, _res, next) => {",
      '  next(new HttpError("Route " + req.originalUrl + " not found", 404));',
      "};",
      "",
      "export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {",
      "  const statusCode = err instanceof HttpError ? err.statusCode : 500;",
      '  const message = err instanceof Error ? err.message : "Unexpected server error";',
      "",
      "  res.status(statusCode).json({",
      "    message,",
      '    status: statusCode >= 500 ? "error" : "fail",',
      "  });",
      "};",
    ]),
    "backend/src/models/user.model.ts": lines([
      'import { Schema, model, type InferSchemaType } from "mongoose";',
      "",
      "const userSchema = new Schema(",
      "  {",
      "    name: { type: String, required: true, trim: true },",
      "    email: { type: String, required: true, unique: true, lowercase: true, trim: true },",
      "  },",
      "  { timestamps: true }",
      ");",
      "",
      "export type User = InferSchemaType<typeof userSchema>;",
      "export const UserModel = model<User>(\"User\", userSchema);",
    ]),
    "backend/src/routes/health.routes.ts": lines([
      'import { Router } from "express";',
      'import { healthCheck } from "../controllers/health.controller";',
      "",
      "const router = Router();",
      "",
      'router.get("/", healthCheck);',
      "",
      "export default router;",
    ]),
    "backend/src/routes/index.ts": lines([
      'import { Router } from "express";',
      'import healthRoutes from "./health.routes";',
      "",
      "const router = Router();",
      "",
      'router.use("/health", healthRoutes);',
      "",
      "export default router;",
    ]),
    "backend/src/services/health.service.ts": lines([
      "export function getHealthStatus() {",
      "  return {",
      '    status: "ok",',
      '    service: "api",',
      "    timestamp: new Date().toISOString(),",
      "  };",
      "}",
    ]),
    "backend/src/types/env.ts": lines([
      "export interface Env {",
      "  PORT?: string;",
      "  MONGODB_URI?: string;",
      "  CLIENT_URL?: string;",
      "}",
    ]),
    "backend/src/utils/http-error.ts": lines([
      "export class HttpError extends Error {",
      "  statusCode: number;",
      "",
      "  constructor(message: string, statusCode = 500) {",
      "    super(message);",
      "    this.name = \"HttpError\";",
      "    this.statusCode = statusCode;",
      "  }",
      "}",
    ]),
    "frontend/package.json": json({
      name: projectName + "-frontend",
      version: "0.1.0",
      private: true,
      type: "module",
      scripts: {
        dev: "vite",
        build: "tsc -b && vite build",
        preview: "vite preview",
      },
      dependencies: {
        axios: versions.axios,
        react: versions.react,
        "react-dom": versions.reactDom,
        "react-router-dom": versions.reactRouterDom,
        zustand: versions.zustand,
      },
      devDependencies: {
        "@tailwindcss/vite": versions.tailwindcssVite,
        "@types/react": versions.reactTypes,
        "@types/react-dom": versions.reactDomTypes,
        "@vitejs/plugin-react": versions.viteReact,
        tailwindcss: versions.tailwindcss,
        typescript: versions.typescript,
        vite: versions.vite,
      },
      engines: {
        node: ">=20.19.0",
      },
    }),
    "frontend/index.html": lines([
      '<!doctype html>',
      '<html lang="en">',
      "  <head>",
      '    <meta charset="UTF-8" />',
      '    <meta name="viewport" content="width=device-width, initial-scale=1.0" />',
      "    <title>" + appTitle + "</title>",
      "  </head>",
      "  <body>",
      '    <div id="root"></div>',
      '    <script type="module" src="/src/main.tsx"></script>',
      "  </body>",
      "</html>",
    ]),
    "frontend/tsconfig.json": json({
      compilerOptions: {
        target: "ES2022",
        useDefineForClassFields: true,
        lib: ["DOM", "DOM.Iterable", "ES2022"],
        allowJs: false,
        skipLibCheck: true,
        esModuleInterop: true,
        allowSyntheticDefaultImports: true,
        strict: true,
        forceConsistentCasingInFileNames: true,
        module: "ESNext",
        moduleResolution: "Bundler",
        resolveJsonModule: true,
        isolatedModules: true,
        noEmit: true,
        jsx: "react-jsx",
      },
      include: ["src"],
      references: [],
    }),
    "frontend/vite.config.ts": lines([
      'import tailwindcss from "@tailwindcss/vite";',
      'import react from "@vitejs/plugin-react";',
      'import { defineConfig } from "vite";',
      "",
      "export default defineConfig({",
      "  plugins: [react(), tailwindcss()],",
      "  server: {",
      "    port: 5173,",
      "  },",
      "});",
    ]),
    "frontend/src/main.tsx": lines([
      'import { StrictMode } from "react";',
      'import { createRoot } from "react-dom/client";',
      'import { BrowserRouter } from "react-router-dom";',
      'import App from "./App";',
      'import "./index.css";',
      "",
      'createRoot(document.getElementById("root")!).render(',
      "  <StrictMode>",
      "    <BrowserRouter>",
      "      <App />",
      "    </BrowserRouter>",
      "  </StrictMode>",
      ");",
    ]),
    "frontend/src/App.tsx": lines([
      'import { AppRoutes } from "./routes";',
      "",
      "export default function App() {",
      "  return <AppRoutes />;",
      "}",
    ]),
    "frontend/src/index.css": lines([
      '@import "tailwindcss";',
      "",
      ":root {",
      "  color: #172033;",
      "  background: #f7f8fb;",
      "  font-family:",
      '    Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;',
      "}",
      "",
      "* {",
      "  box-sizing: border-box;",
      "}",
      "",
      "body {",
      "  margin: 0;",
      "  min-width: 320px;",
      "  min-height: 100vh;",
      "}",
      "",
      "button, input, textarea, select {",
      "  font: inherit;",
      "}",
    ]),
    "frontend/src/api/health.ts": lines([
      'import { apiClient } from "../axios/client";',
      'import type { HealthResponse } from "../types/api";',
      "",
      "export async function fetchHealth() {",
      '  const { data } = await apiClient.get<HealthResponse>("/health");',
      "  return data;",
      "}",
    ]),
    "frontend/src/assets/.gitkeep": "",
    "frontend/src/axios/client.ts": lines([
      'import axios from "axios";',
      "",
      "export const apiClient = axios.create({",
      '  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:5000/api",',
      "  withCredentials: true,",
      "});",
    ]),
    "frontend/src/components/HealthStatus.tsx": lines([
      'import { useHealthCheck } from "../loaders/useHealthCheck";',
      'import { cn } from "../utils/cn";',
      "",
      "export function HealthStatus() {",
      "  const { data, error, refetch, status } = useHealthCheck();",
      '  const isOnline = status === "success" && data?.status === "ok";',
      "",
      "  return (",
      '    <section className="w-full max-w-xl rounded-lg border border-slate-200 bg-white p-5 shadow-sm">',
      '      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">',
      "        <div>",
      '          <p className="text-sm font-medium text-slate-500">API status</p>',
      "          <div className=\"mt-2 flex items-center gap-2\">",
      "            <span",
      "              className={cn(",
      '                "h-3 w-3 rounded-full",',
      '                isOnline ? "bg-emerald-500" : "bg-amber-500"',
      "              )}",
      "            />",
      '            <strong className="text-lg text-slate-950">',
      "              {isOnline ? \"Connected\" : status === \"loading\" ? \"Checking\" : \"Waiting\"}",
      "            </strong>",
      "          </div>",
      "          {data ? (",
      '            <p className="mt-2 text-sm text-slate-500">Last checked {data.timestamp}</p>',
      "          ) : null}",
      "          {error ? <p className=\"mt-2 text-sm text-rose-600\">{error}</p> : null}",
      "        </div>",
      "        <button",
      "          className=\"rounded-md bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400\"",
      "          disabled={status === \"loading\"}",
      "          onClick={() => void refetch()}",
      "          type=\"button\"",
      "        >",
      "          Refresh",
      "        </button>",
      "      </div>",
      "    </section>",
      "  );",
      "}",
    ]),
    "frontend/src/layouts/MainLayout.tsx": lines([
      'import { Outlet } from "react-router-dom";',
      'import { useAppStore } from "../stores/app.store";',
      "",
      "export default function MainLayout() {",
      "  const appName = useAppStore((state) => state.appName);",
      "",
      "  return (",
      '    <div className="min-h-screen bg-slate-50 text-slate-950">',
      '      <header className="border-b border-slate-200 bg-white">',
      '        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">',
      '          <a className="text-base font-bold tracking-normal text-slate-950" href="/">',
      "            {appName}",
      "          </a>",
      '          <a className="text-sm font-medium text-slate-600 hover:text-slate-950" href="https://vite.dev" rel="noreferrer" target="_blank">',
      "            Vite",
      "          </a>",
      "        </nav>",
      "      </header>",
      '      <main className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-10">',
      "        <Outlet />",
      "      </main>",
      "    </div>",
      "  );",
      "}",
    ]),
    "frontend/src/loaders/useHealthCheck.ts": lines([
      'import { useCallback, useEffect, useState } from "react";',
      'import { fetchHealth } from "../api/health";',
      'import type { HealthResponse } from "../types/api";',
      "",
      'type RequestStatus = "idle" | "loading" | "success" | "error";',
      "",
      "export function useHealthCheck() {",
      "  const [data, setData] = useState<HealthResponse | null>(null);",
      "  const [error, setError] = useState<string | null>(null);",
      '  const [status, setStatus] = useState<RequestStatus>("idle");',
      "",
      "  const load = useCallback(async () => {",
      '    setStatus("loading");',
      "    setError(null);",
      "",
      "    try {",
      "      const result = await fetchHealth();",
      "      setData(result);",
      '      setStatus("success");',
      "    } catch (requestError) {",
      '      setStatus("error");',
      "      setError(requestError instanceof Error ? requestError.message : \"Request failed\");",
      "    }",
      "  }, []);",
      "",
      "  useEffect(() => {",
      "    void load();",
      "  }, [load]);",
      "",
      "  return { data, error, refetch: load, status };",
      "}",
    ]),
    "frontend/src/pages/HomePage.tsx": lines([
      'import { HealthStatus } from "../components/HealthStatus";',
      'import { useAppStore } from "../stores/app.store";',
      "",
      "export default function HomePage() {",
      "  const appName = useAppStore((state) => state.appName);",
      "",
      "  return (",
      '    <div className="grid gap-8 lg:grid-cols-[1fr_28rem] lg:items-start">',
      "      <section>",
      '        <p className="text-sm font-semibold uppercase tracking-normal text-emerald-700">MERN TypeScript starter</p>',
      '        <h1 className="mt-3 max-w-3xl text-4xl font-bold text-slate-950 sm:text-5xl">',
      "          {appName}",
      "        </h1>",
      '        <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">',
      "          Start building with an Express API, MongoDB connection, React Router, Zustand, Axios, Vite, and Tailwind CSS.",
      "        </p>",
      '        <div className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-3">',
      '          <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">',
      '            <p className="text-sm font-semibold text-slate-950">Backend</p>',
      '            <p className="mt-1 text-sm text-slate-500">Express + Mongoose</p>',
      "          </div>",
      '          <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">',
      '            <p className="text-sm font-semibold text-slate-950">Frontend</p>',
      '            <p className="mt-1 text-sm text-slate-500">React + Vite</p>',
      "          </div>",
      '          <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">',
      '            <p className="text-sm font-semibold text-slate-950">Styles</p>',
      '            <p className="mt-1 text-sm text-slate-500">Tailwind CSS</p>',
      "          </div>",
      "        </div>",
      "      </section>",
      "      <HealthStatus />",
      "    </div>",
      "  );",
      "}",
    ]),
    "frontend/src/routes/index.tsx": lines([
      'import { Navigate, Route, Routes } from "react-router-dom";',
      'import MainLayout from "../layouts/MainLayout";',
      'import HomePage from "../pages/HomePage";',
      "",
      "export function AppRoutes() {",
      "  return (",
      "    <Routes>",
      "      <Route element={<MainLayout />}>",
      "        <Route index element={<HomePage />} />",
      "      </Route>",
      '      <Route path="*" element={<Navigate replace to="/" />} />',
      "    </Routes>",
      "  );",
      "}",
    ]),
    "frontend/src/stores/app.store.ts": lines([
      'import { create } from "zustand";',
      "",
      "type AppState = {",
      "  appName: string;",
      "  setAppName: (appName: string) => void;",
      "};",
      "",
      "export const useAppStore = create<AppState>((set) => ({",
      '  appName: "' + appTitle + '",',
      "  setAppName: (appName) => set({ appName }),",
      "}));",
    ]),
    "frontend/src/types/api.ts": lines([
      "export type HealthResponse = {",
      '  status: "ok";',
      "  service: string;",
      "  timestamp: string;",
      "};",
    ]),
    "frontend/src/types/vite-env.d.ts": lines([
      '/// <reference types="vite/client" />',
      "",
      "interface ImportMetaEnv {",
      "  readonly VITE_API_URL?: string;",
      "}",
    ]),
    "frontend/src/utils/cn.ts": lines([
      "type ClassValue = string | false | null | undefined;",
      "",
      "export function cn(...classes: ClassValue[]) {",
      '  return classes.filter(Boolean).join(" ");',
      "}",
    ]),
  };

  return { directories, files };
}

function json(value) {
  return JSON.stringify(value, null, 2) + "\n";
}

function lines(value) {
  return value.join("\n") + "\n";
}

function toTitle(value) {
  return value
    .split(/[-_.\s]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}
