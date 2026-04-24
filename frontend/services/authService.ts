import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  Userdata?: {
    access_token: string;
    token_type: string;
    expires_in: number;
    ".issued": string;
    ".expires": string;
  };
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  Userdata?: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

export const authService = {
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    try {
      const response = await axios.post<LoginResponse>(`${API_URL}/api/login`, data);
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return error.response.data;
      }
      return {
        success: false,
        message: "Terjadi kesalahan saat login. Silakan coba lagi.",
      };
    }
  },

  register: async (data: RegisterRequest): Promise<RegisterResponse> => {
    try {
      const response = await axios.post<RegisterResponse>(`${API_URL}/api/register`, data);
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return error.response.data;
      }
      return {
        success: false,
        message: "Terjadi kesalahan saat registrasi. Silakan coba lagi.",
      };
    }
  },
};
