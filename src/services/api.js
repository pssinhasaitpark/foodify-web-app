import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor to add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  // Skip token for public APIs
  const publicRoutes = ["/auth/login", "/auth/register", "/home"];

  const isPublic = publicRoutes.some((route) => config.url.includes(route));

  if (token && !isPublic) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const authService = {
  login: async (email, password) => {
    const response = await api.post("/auth/login", { email, password });
    return response.data;
  },
  register: async (userData) => {
    const response = await api.post("/auth/register", userData);
    return response.data;
  },
};

export const homeService = {
  getHomeData: async (category) => {
    const response = await api.get("/home", {
      params: category ? { category } : undefined,
    });
    return response.data;
  },
};

export default api;
