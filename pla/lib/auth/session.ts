import type { AuthSession, AuthUser } from "@/types/api";

const SESSION_STORAGE_KEY = "pla-auth-session";

function canUseStorage() {
  return typeof window !== "undefined" && Boolean(window.localStorage);
}

export const session = {
  get(): AuthSession | null {
    if (!canUseStorage()) {
      return null;
    }

    const value = window.localStorage.getItem(SESSION_STORAGE_KEY);
    if (!value) {
      return null;
    }

    try {
      return JSON.parse(value) as AuthSession;
    } catch {
      window.localStorage.removeItem(SESSION_STORAGE_KEY);
      return null;
    }
  },

  set(value: AuthSession) {
    if (canUseStorage()) {
      window.localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(value));
    }
  },

  clear() {
    if (canUseStorage()) {
      window.localStorage.removeItem(SESSION_STORAGE_KEY);
    }
  },

  getToken() {
    return this.get()?.accessToken ?? null;
  },

  getUser(): AuthUser | null {
    return this.get()?.user ?? null;
  },
};
