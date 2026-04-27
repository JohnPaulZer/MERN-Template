// Libraries
import { create } from "zustand";
// Types
import type { TokenStoreType } from "@/types/token/token.type";
// Api's
import { refreshTokenApi } from "@/api/token/token.api";

export const useTokenStore = create<TokenStoreType>((set, get) => ({
  accessToken: null,
  initialized: false,
  _refreshPromise: null,
  loading: false,

  init: async () => {
    const { initialized } = get();
    if (initialized) return get().accessToken !== null;

    set({ initialized: true });

    const existing = get()._refreshPromise;
    if (existing) return existing;

    const p = (async () => {
      try {
        const res = await refreshTokenApi();
        const token = res?.accessToken ?? null;

        set({ accessToken: token });
        return token !== null;
      } catch (err) {
        console.error(err);
        set({ accessToken: null });
        return false;
      } finally {
        set({ _refreshPromise: null });
      }
    })();

    set({ _refreshPromise: p });
    return p;
  },
  setToken: (token) => set({ accessToken: token }),
  setClearToken: () => {
    set({ accessToken: null, initialized: false, _refreshPromise: null });
  },
}));
