import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  signUp: (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,

      login: (email: string, password: string) => {
        const users = JSON.parse(
          localStorage.getItem('registered_users') || '[]'
        ) as User[];
        const found = users.find(
          (u) => u.email === email && u.password === password
        );
        if (found) {
          set({ user: found, isAuthenticated: true });
          return true;
        }
        return false;
      },

      signUp: (data) => {
        const newUser: User = {
          id: crypto.randomUUID(),
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: data.password,
          currency: 'EUR',
          language: 'en',
          notificationOptIn: false,
          social: { googleConnected: false, facebookConnected: false },
        };
        const users = JSON.parse(
          localStorage.getItem('registered_users') || '[]'
        ) as User[];
        users.push(newUser);
        localStorage.setItem('registered_users', JSON.stringify(users));
        set({ user: newUser, isAuthenticated: true });
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      updateUser: (updates) => {
        const current = get().user;
        if (!current) return;
        const updated = { ...current, ...updates };
        set({ user: updated });
        const users = JSON.parse(
          localStorage.getItem('registered_users') || '[]'
        ) as User[];
        const idx = users.findIndex((u) => u.id === updated.id);
        if (idx !== -1) {
          users[idx] = updated;
          localStorage.setItem('registered_users', JSON.stringify(users));
        }
      },
    }),
    { name: 'auth-storage' }
  )
);
