import { create } from 'zustand';

export type User = {
  id: string;
  email: string;
  createdAt: string;
};

type UserStore = {
  user: User | null;
  accessToken: string | null;
  rehydrated: boolean;
  setAuth: (user: User, accessToken: string) => void;
  logout: () => void;
  rehydrate: () => void;
};

const USER_STORAGE_KEY = 'uiagent_auth';

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  accessToken: null,
  rehydrated: false,
  setAuth: (user, accessToken) => {
    set({ user, accessToken });
    window.localStorage.setItem(
      USER_STORAGE_KEY,
      JSON.stringify({ user, accessToken })
    );
  },
  logout: () => {
    set({ user: null, accessToken: null });
    window.localStorage.removeItem(USER_STORAGE_KEY);
  },
  rehydrate: () => {
    const data = window.localStorage.getItem(USER_STORAGE_KEY);
    if (data) {
      try {
        const { user, accessToken } = JSON.parse(data);
        if (!accessToken) {
          set({ user: null, accessToken: null, rehydrated: true });
          window.localStorage.removeItem(USER_STORAGE_KEY);
        } else {
          set({ user: user || null, accessToken, rehydrated: true });
        }
      } catch {
        set({ user: null, accessToken: null, rehydrated: true });
        window.localStorage.removeItem(USER_STORAGE_KEY);
      }
    } else {
      set({ user: null, accessToken: null, rehydrated: true });
    }
  },
}));
