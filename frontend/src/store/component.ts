import { create } from "zustand";
import * as api from "../api/api";
import { useAuthStore } from "./auth";
import type { ComponentState } from "../types/componentStore";

export const useComponentStore = create<ComponentState>((set) => ({
  components: [],
  selected: null,
  loading: false,
  error: null,
  fetchComponents: async (): Promise<void> => {
    set({ loading: true, error: null });
    try {
      const token = useAuthStore.getState().token!;
      const components = await api.getLatestComponents(token);
      set({ components, loading: false });
    } catch {
      set({ error: "Ошибка загрузки компонентов", loading: false });
    }
  },
  fetchComponentById: async (id: string): Promise<void> => {
    set({ loading: true, error: null });
    try {
      const token = useAuthStore.getState().token!;
      const selected = await api.getComponentById(id, token);
      set({ selected, loading: false });
    } catch {
      set({ error: "Ошибка загрузки компонента", loading: false });
    }
  },
  save: async (name: string, code: string): Promise<void> => {
    set({ loading: true, error: null });
    try {
      const token = useAuthStore.getState().token!;
      await api.saveComponent(name, code, token);
      set({ loading: false });
    } catch {
      set({ error: "Ошибка сохранения", loading: false });
    }
  }
}));
