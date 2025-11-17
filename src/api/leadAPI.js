import api from "./axiosConfig"; // Centralized axios instance

// ✅ Base API URL — uses .env or defaults to localhost
const API_BASE_URL =
  process.env.REACT_APP_API_URL?.replace(/\/$/, "") || "http://localhost:5000/api";

// ✅ Helper: safely build Authorization headers
const getAuthConfig = () => {
  try {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userInfo?.token;
    return {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
        "Content-Type": "application/json",
      },
    };
  } catch {
    return {
      headers: { "Content-Type": "application/json" },
    };
  }
};

// ✅ Fetch all leads
export const getLeads = async () => {
  try {
    const config = getAuthConfig();
    const { data } = await api.get(`${API_BASE_URL}/leads`, config);
    console.log("✅ Leads fetched:", data);
    return data; // Expected: array of leads
  } catch (error) {
    console.error("❌ Error fetching leads:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to fetch leads");
  }
};

// ✅ Create a new lead
export const createLead = async (leadData) => {
  try {
    const config = getAuthConfig();
    const { data } = await api.post(`${API_BASE_URL}/leads`, leadData, config);
    console.log("✅ Lead created:", data);
    return data;
  } catch (error) {
    console.error("❌ Error creating lead:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to create lead");
  }
};

// ✅ Update an existing lead
export const updateLead = async (id, leadData) => {
  try {
    const config = getAuthConfig();
    const { data } = await api.put(`${API_BASE_URL}/leads/${id}`, leadData, config);
    console.log("✅ Lead updated:", data);
    return data;
  } catch (error) {
    console.error("❌ Error updating lead:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to update lead");
  }
};

// ✅ Delete a lead
export const deleteLead = async (id) => {
  try {
    const config = getAuthConfig();
    const { data } = await api.delete(`${API_BASE_URL}/leads/${id}`, config);
    console.log("✅ Lead deleted:", data);
    return data;
  } catch (error) {
    console.error("❌ Error deleting lead:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to delete lead");
  }
};
