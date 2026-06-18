"use client";

import { useState } from "react";
import { authApi } from "@/lib/api/auth";
import { session } from "@/lib/auth/session";
import type { AuthUser, LoginPayload, RegisterPayload } from "@/types/api";

export const useAuth = () => {
  const [user, setUser] = useState<AuthUser | null>(() => session.getUser());

  return {
    user,
    isAuthenticated: Boolean(user),
    login: async (payload: LoginPayload) => {
      const authSession = await authApi.login(payload);
      setUser(authSession.user);
      return authSession;
    },
    register: async (payload: RegisterPayload) => {
      const authSession = await authApi.register(payload);
      setUser(authSession.user);
      return authSession;
    },
    logout: () => {
      authApi.logout();
      setUser(null);
    },
  };
};
