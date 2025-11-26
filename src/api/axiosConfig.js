import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token automatically to every request
api.interceptors.request.use(
  (config) => {
    // Read userInfo from localStorage
    const userInfoString = localStorage.getItem("userInfo");

    if (userInfoString) {
      const userInfo = JSON.parse(userInfoString);

      // Extract ONLY the token string (important!)
      const token = userInfo?.token;

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
