import { create } from "zustand";
import { figmaImport } from "../../../api/api";

interface FigmaImportState {
  fileId: string;
  nodeId: string;
  loading: boolean;
  setFileId: (id: string) => void;
  setNodeId: (id: string) => void;
  setLoading: (loading: boolean) => void;
  importFromFigma: (token: string, onImport: (code: string) => void) => Promise<void>;
}

export const useFigmaImportStore = create<FigmaImportState>((set, get) => ({
  fileId: "",
  nodeId: "",
  loading: false,
  setFileId: (fileId) => set({ fileId }),
  setNodeId: (nodeId) => set({ nodeId }),
  setLoading: (loading) => set({ loading }),
  importFromFigma: async (token, onImport) => {
    const { fileId, nodeId, setLoading } = get();
    setLoading(true);
    try {
      const code = await figmaImport(fileId, nodeId, token);
      onImport(code);
    } finally {
      setLoading(false);
    }
  },
}));
