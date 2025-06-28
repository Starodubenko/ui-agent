import { create } from "zustand";
import * as api from "../api/api";
import type { AuthState } from "../types/auth";

export const useAuthStore = create<AuthState>((set) => ({
  token: typeof window !== "undefined" ? localStorage.getItem('token') : null,
  loading: false,
  error: null,
  login: async (email: string, password: string): Promise<void> => {
    set({ loading: true, error: null });
    try {
      const token: string = await api.login(email, password);
      set({ token, loading: false });
      localStorage.setItem('token', token);
    } catch {
      set({ error: "Ошибка входа", loading: false });
    }
  },
  register: async (email: string, password: string): Promise<void> => {
    set({ loading: true, error: null });
    try {
      const token: string = await api.register(email, password);
      set({ token, loading: false });
      localStorage.setItem('token', token);
    } catch {
      set({ error: "Ошибка регистрации", loading: false });
    }
  },
  logout: (): void => {
    set({ token: null });
    localStorage.removeItem('token');
  }
}));
