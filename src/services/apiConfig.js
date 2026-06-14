import axios from "axios";

// Instance A
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, 
  headers: {
    "Content-Type": "application/json",
  },
});

// Instance B
export const catalogApi = axios.create({
  baseURL: import.meta.env.VITE_EXTERNAL_CATALOG_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically inject credentials for Protected Internal Nodes
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;