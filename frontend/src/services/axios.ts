import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    // Normalize Laravel paginator response: { data: { data: [], ... } } -> { data: [] }
    const data = response.data;
    if (data && typeof data === "object" && "data" in data && Array.isArray(data.data)) {
      response.data = data.data;
    }
    return response;
  },
  (error) => {
    // Only redirect on 401 for authenticated routes (not login/register)
    if (error.response?.status === 401 && !error.config?.url?.includes("/auth/")) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default api;