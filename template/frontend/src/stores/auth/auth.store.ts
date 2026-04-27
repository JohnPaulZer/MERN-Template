// Libraries
import toast from "react-hot-toast";
import { create } from "zustand";
// Types
import type { AuthStoreType } from "@/types/auth/auth.type";
// Utils
import { showError } from "@/utils/error/error.util";
// APi's
import { loginApi, logoutApi, registerApi } from "@/api/auth/auth.api";

export const useAuthStore = create<AuthStoreType>((set) => ({
  loading: false,

  setRegister: async (data) => {
    set({
      loading: true,
    });
    try {
      const response = await registerApi(data);
      toast.success(response.message);
      return response.accessToken;
    } catch (error) {
      showError(error);
      return false;
    } finally {
      set({
        loading: false,
      });
    }
  },
  setLogin: async (data) => {
    set({ loading: true });
    try {
      const response = await loginApi(data);
      toast.success(response.message);
      return response.accessToken;
    } catch (error) {
      showError(error);
      return false;
    } finally {
      set({
        loading: false,
      });
    }
  },
  logout: async () => {
    set({ loading: true });
    try {
      const response = await logoutApi();
      toast.success(response.message);
      return true;
    } catch (error) {
      console.error(error);
      showError(error);
      return false;
    } finally {
      set({ loading: false });
    }
  },
}));
