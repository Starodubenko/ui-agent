import { create } from "zustand";
import * as api from "../api/api";
import { useAuthStore } from "./auth";
import type { AIState } from "../types/ai";

export const useAIStore = create<AIState>((set) => ({
  code: "",
  loading: false,
  error: null,
  history: [],
  generate: async (prompt: string): Promise<void> => {
    set({ loading: true, error: null });
    try {
      const token = useAuthStore.getState().token!;
      const code: string = await api.generateComponent(prompt, token);
      set({ code, loading: false });
    } catch {
      set({ error: "Ошибка генерации", loading: false });
    }
  },
  refactor: async (codeStr: string): Promise<void> => {
    set({ loading: true, error: null });
    try {
      const token = useAuthStore.getState().token!;
      const code: string = await api.refactorCode(codeStr, token);
      set({ code, loading: false });
    } catch {
      set({ error: "Ошибка рефакторинга", loading: false });
    }
  },
  generateTest: async (prompt: string, codeStr: string): Promise<void> => {
    set({ loading: true, error: null });
    try {
      const token = useAuthStore.getState().token!;
      const code: string = await api.generateTest(prompt, codeStr, token);
      set({ code, loading: false });
    } catch {
      set({ error: "Ошибка генерации теста", loading: false });
    }
  },
  figmaImport: async (fileId: string, nodeId: string): Promise<void> => {
    set({ loading: true, error: null });
    try {
      const token = useAuthStore.getState().token!;
      const code: string = await api.figmaImport(fileId, nodeId, token);
      set({ code, loading: false });
    } catch {
      set({ error: "Ошибка импорта из Figma", loading: false });
    }
  },
  fetchHistory: async (): Promise<void> => {
    set({ loading: true, error: null });
    try {
      const token = useAuthStore.getState().token!;
      const history: unknown[] = await api.getHistory(token);
      set({ history, loading: false });
    } catch {
      set({ error: "Ошибка загрузки истории", loading: false });
    }
  }
}));
