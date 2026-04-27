import { useTokenStore } from "@/stores/token/token.store";
import { redirect } from "react-router-dom";

export async function rootLoader() {
  const { init } = useTokenStore.getState();
  const isLoggedIn = await init();
  if (isLoggedIn) return redirect("/home");
  return null;
}
