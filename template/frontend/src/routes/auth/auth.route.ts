import AuthLayout from "@/layouts/auth/AuthLayout";
import type { RouteObject } from "react-router-dom";
import { authLoader } from "../../loaders/auth/auth.loader";

export const authRoutes: RouteObject = {
  path: "auth",
  Component: AuthLayout,
  loader: authLoader,
  children: [
    {
      path: "login",
      async lazy() {
        const module = await import("@/pages/auth/login/LoginPage");
        return { Component: module.default };
      },
    },
    {
      path: "register",
      async lazy() {
        const module = await import("@/pages/auth/register/RegisterPage");
        return { Component: module.default };
      },
    },
  ],
};
