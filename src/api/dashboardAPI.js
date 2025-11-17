import api from "./axiosConfig";

// ✅ Fetch dashboard data (Protected route)
export const getDashboardData = async () => {
  try {
    const response = await api.get("/dashboard");
    return response.data;
  } catch (error) {
    console.error("❌ Dashboard API Error:", error.response?.data || error.message);
    throw new Error(
      error.response?.data?.message || "Failed to fetch dashboard data."
    );
  }
};
