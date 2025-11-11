import axios from "axios";

// Use a relative base so Vite's dev proxy (configured in vite.config.ts) forwards requests to the server.
// This avoids hard-coding hosts and prevents requests being sent to an unresolved host like `http://api`.
const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add JWT token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
