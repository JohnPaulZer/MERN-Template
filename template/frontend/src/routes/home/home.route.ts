import HomeLayout from "@/layouts/home/HomeLayout";
import type { RouteObject } from "react-router-dom";
import { homeLoader } from "../../loaders/home/home.loader";

export const homeRoutes: RouteObject = {
  path: "home",
  Component: HomeLayout,
  loader: homeLoader,
  children: [
    {
      index: true,
      async lazy() {
        const module = await import("@/pages/home/HomePage");
        return { Component: module.default };
      },
    },
  ],
};
