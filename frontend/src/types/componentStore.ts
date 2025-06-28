import type { ComponentItem } from './component';

export interface ComponentState {
  components: ComponentItem[];
  selected: ComponentItem | null;
  loading: boolean;
  error: string | null;
  fetchComponents: () => Promise<void>;
  fetchComponentById: (id: string) => Promise<void>;
  save: (name: string, code: string) => Promise<void>;
}
