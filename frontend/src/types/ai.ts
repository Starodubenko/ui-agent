export interface AIState {
  code: string;
  loading: boolean;
  error: string | null;
  history: unknown[];
  generate: (prompt: string) => Promise<void>;
  refactor: (code: string) => Promise<void>;
  generateTest: (prompt: string, code: string) => Promise<void>;
  figmaImport: (fileId: string, nodeId: string) => Promise<void>;
  fetchHistory: () => Promise<void>;
}
