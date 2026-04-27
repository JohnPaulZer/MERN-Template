import { useTokenStore } from "@/stores/token/token.store";
import { redirect } from "react-router-dom";

export async function homeLoader() {
  const { accessToken } = useTokenStore.getState();
  if (!accessToken) return redirect("/auth/login");
  return null;
}
