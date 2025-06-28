import { create } from "zustand";
import { login, register } from "../../../api/api";

interface AuthState {
  email: string;
  pass: string;
  error: string;
  tab: number;
  setEmail: (email: string) => void;
  setPass: (pass: string) => void;
  setError: (e: string) => void;
  setTab: (tab: number) => void;
  handleLogin: (onAuth: (token: string) => void) => Promise<void>;
  handleRegister: (onAuth: (token: string) => void) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  email: "",
  pass: "",
  error: "",
  tab: 0,
  setEmail: (email) => set({ email }),
  setPass: (pass) => set({ pass }),
  setError: (error) => set({ error }),
  setTab: (tab) => set({ tab }),
  handleLogin: async (onAuth) => {
    const { email, pass, setError } = get();
    try {
      const token = await login(email, pass);
      setError("");
      onAuth(token);
    } catch {
      setError("Ошибка входа");
    }
  },
  handleRegister: async (onAuth) => {
    const { email, pass, setError } = get();
    try {
      const token = await register(email, pass);
      setError("");
      onAuth(token);
    } catch {
      setError("Ошибка регистрации");
    }
  }
}));
