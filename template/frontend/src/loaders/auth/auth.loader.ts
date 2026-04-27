import { useTokenStore } from "@/stores/token/token.store";
import { redirect } from "react-router-dom";

export async function authLoader() {
  const { init } = useTokenStore.getState();
  await init();

  if (useTokenStore.getState().accessToken) {
    return redirect("/home");
  }
  return null;
}
