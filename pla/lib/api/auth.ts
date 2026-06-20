import { apiClient } from "@/lib/api/client";
import { session } from "@/lib/auth/session";
import type {
  ForgotPasswordResponse,
  AuthSession,
  AuthUser,
  LoginPayload,
  RegisterPayload,
} from "@/types/api";

async function persistAuth(request: Promise<AuthSession>) {
  const authSession = await request;
  session.set(authSession);
  return authSession;
}

export const authApi = {
  login(payload: LoginPayload) {
    return persistAuth(apiClient.post<AuthSession>("/auth/login", payload));
  },

  register(payload: RegisterPayload) {
    return persistAuth(apiClient.post<AuthSession>("/auth/register", payload));
  },

  me() {
    return apiClient.get<AuthUser>("/auth/me", { auth: true });
  },

  logout() {
    session.clear();
  },

  forgotPassword(email: string) {
    return apiClient.post<ForgotPasswordResponse>("/auth/forgot-password", {
      email,
    });
  },

  verifyResetCode(email: string, code: string) {
    return apiClient.post<{ message: string }>("/auth/verify-reset-code", {
      email,
      code,
    });
  },

  resetPassword(email: string, code: string, password: string) {
    return apiClient.post<{ message: string }>("/auth/reset-password", {
      email,
      code,
      password,
    });
  },
};
