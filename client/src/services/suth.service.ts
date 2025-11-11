import api from "../api";
import type { User } from "../types/User.type";

type Credentials = {
  email: string;
  password: string;
};

type RegisterData = {
  name: string;
  email: string;
  password: string;
};

type AuthResponse = {
  user: User;
  token: string;
};

export const loginService = async (
  credentials: Credentials,
): Promise<AuthResponse> => {
  const response = await api.post("/auth/login", credentials);
  return {
    user: response.data.user,
    token: response.data.token,
  };
};

export const registerService = async (
  data: RegisterData,
): Promise<AuthResponse> => {
  const response = await api.post("/auth/register", data);
  return {
    user: response.data.user,
    token: response.data.token,
  };
};

export const validateTokenService = async (token: string): Promise<User> => {
  const response = await api.get("/auth/validate", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.user;
};
