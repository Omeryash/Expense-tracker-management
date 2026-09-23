import axios from "axios";

// Axios instance create karo with base URL
const api = axios.create({
  baseURL: "http://localhost:5000/api", // Backend URL (baad mein change karna)
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - automatically token add karega har request mein
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor - error handle karne ke liye
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired ya invalid
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default api;
