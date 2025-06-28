import { create } from "zustand";
import { generateComponent, getHistory, refactorCode } from "../../../api/api";

interface HistoryItem {
  prompt: string;
  code: string;
  createdAt: string;
}

interface AiCommunicationState {
  token: string | null;
  tab: number;
  input: string;
  code: string;
  loading: boolean;
  history: HistoryItem[];
  showSuccess: boolean;
  refactored: string;
  setToken: (t: string | null) => void;
  setTab: (n: number) => void;
  setInput: (s: string) => void;
  setCode: (c: string) => void;
  setLoading: (l: boolean) => void;
  setHistory: (h: HistoryItem[]) => void;
  setShowSuccess: (v: boolean) => void;
  setRefactored: (c: string) => void;
  handleGenerate: () => Promise<void>;
  handleRefactor: () => Promise<void>;
  fetchHistory: () => Promise<void>;
}

export const useAiCommunicationStore = create<AiCommunicationState>((set, get) => ({
  token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
  tab: 0,
  input: "",
  code: "",
  loading: false,
  history: [],
  showSuccess: false,
  refactored: "",
  setToken: (token) => {
    set({ token });
    if (typeof window !== "undefined" && token)
      localStorage.setItem("token", token);
  },
  setTab: (tab) => set({ tab }),
  setInput: (input) => set({ input }),
  setCode: (code) => set({ code }),
  setLoading: (loading) => set({ loading }),
  setHistory: (history) => set({ history }),
  setShowSuccess: (showSuccess) => set({ showSuccess }),
  setRefactored: (refactored) => set({ refactored }),

  fetchHistory: async () => {
    const token = get().token;
    if (token) {
      const history = await getHistory(token);
      set({ history });
    }
  },

  handleGenerate: async () => {
    set({ loading: true, code: "", refactored: "" });
    try {
      const { input, token } = get();
      if (token) {
        const generated = await generateComponent(input, token);
        set({ code: generated.trim(), showSuccess: true });
        await get().fetchHistory();
      }
    } catch {
      set({ code: "// Ошибка генерации :(" });
    } finally {
      set({ loading: false });
    }
  },

  handleRefactor: async () => {
    const { code, token } = get();
    if (!code || !token) return;
    set({ loading: true });
    try {
      const refact = await refactorCode(code, token);
      set({ refactored: refact.trim(), showSuccess: true });
    } catch {
      set({ refactored: "// Ошибка рефакторинга :(" });
    }
    set({ loading: false });
  },
}));
