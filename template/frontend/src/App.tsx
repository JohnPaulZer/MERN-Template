// Libraries
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Routes
import { authRoutes } from "./routes/auth/auth.route";
import { homeRoutes } from "./routes/home/home.route";

// Loader
import SplashScreen from "./components/general/SplashScreen";
import { rootLoader } from "./loaders/root/root.loader";

const router = createBrowserRouter([
  {
    path: "/",
    loader: rootLoader,
    children: [
      {
        index: true,
        async lazy() {
          const module = await import("@/pages/general/LandingPage");
          return { Component: module.default };
        },
      },
      {
        path: "*",
        async lazy() {
          const module = await import("@/pages/general/PageNotFound");
          return { Component: module.default };
        },
      },
    ],
  },
  authRoutes,
  homeRoutes,
]);

export default function App() {
  return (
    <>
      <Suspense fallback={<SplashScreen />}>
        <RouterProvider router={router} />
      </Suspense>
      <Toaster position="bottom-right" />
    </>
  );
}
