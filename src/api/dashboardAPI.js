import api from "./axiosConfig";

// Fetch dashboard data
export const getDashboardData = async () => {
  try {
    const { data } = await api.get("/dashboard");  // Axios will turn into /api/dashboard
    return data;
  } catch (error) {
    console.error("❌ Dashboard API Error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to fetch dashboard data.");
  }
};
