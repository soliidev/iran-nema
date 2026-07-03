import api from "@/services/axios";
import { ENDPOINTS } from "@/services/endpoints";
import type { LoginRequest, RegisterRequest, AuthResponse } from "../types/auth";

export const authService = {
  async login(data: LoginRequest) {
    return api.post<AuthResponse>(ENDPOINTS.login, data);
  },

  async register(data: RegisterRequest) {
    return api.post<AuthResponse>(ENDPOINTS.register, data);
  },

  async getUser() {
    return api.get(ENDPOINTS.user);
  },

  async logout() {
    return api.post("/auth/logout");
  },
};
