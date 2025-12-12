import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // MUST end with /api
  headers: { "Content-Type": "application/json" }
});

// Attach token to every request
api.interceptors.request.use((config) => {
  const userInfo = localStorage.getItem("userInfo");
  if (userInfo) {
    const token = JSON.parse(userInfo)?.token;
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
