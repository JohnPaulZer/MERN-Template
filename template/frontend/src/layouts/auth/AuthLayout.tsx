import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="h-dvh w-dvw flex flex-col items-center justify-center bg-primary">
      <Outlet />
    </div>
  );
}
