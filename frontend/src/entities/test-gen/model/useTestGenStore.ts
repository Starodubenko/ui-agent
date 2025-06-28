import { create } from "zustand";
import { generateTest } from "../../../api/api";

interface TestGenState {
  testCode: string;
  loading: boolean;
  generate: (prompt: string, code: string, token: string) => Promise<void>;
  setTestCode: (code: string) => void;
  setLoading: (loading: boolean) => void;
}

export const useTestGenStore = create<TestGenState>((set) => ({
  testCode: "",
  loading: false,
  setTestCode: (testCode) => set({ testCode }),
  setLoading: (loading) => set({ loading }),
  generate: async (prompt, code, token) => {
    set({ loading: true });
    try {
      const test = await generateTest(prompt, code, token);
      set({ testCode: test });
    } finally {
      set({ loading: false });
    }
  },
}));
