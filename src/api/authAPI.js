import api from "./axiosConfig";

const API_BASE_URL = "/auth"; // Base path since api already has http://localhost:5000/api

// ✅ Login user
export const login = async (email, password) => {
  try {
    const response = await api.post(`${API_BASE_URL}/login`, { email, password });

    const data = response.data;

    // Save user + token to localStorage safely
    if (data.token) {
      localStorage.setItem("userInfo", JSON.stringify(data));
    }

    return data;
  } catch (error) {
    console.error("❌ Login API Error:", error.response?.data || error.message);
    throw new Error(
      error.response?.data?.message || "Login failed. Please try again."
    );
  }
};

// ✅ Register new user
export const register = async (userData) => {
  try {
    const response = await api.post(`${API_BASE_URL}/register`, userData);
    return response.data;
  } catch (error) {
    console.error("❌ Register API Error:", error.response?.data || error.message);
    throw new Error(
      error.response?.data?.message || "Signup failed. Please try again."
    );
  }
};
