import api from "./axiosConfig";

// ✅ BASE URL (NO /api here)
const API_BASE_URL =
  process.env.REACT_APP_API_URL?.replace(/\/$/, "") ||
  "http://localhost:5000";

// ✅ Auth header helper
const getAuthConfig = () => {
  const userInfo = localStorage.getItem("userInfo");

  if (!userInfo) {
    return {
      headers: { "Content-Type": "application/json" },
    };
  }

  const { token } = JSON.parse(userInfo);

  return {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
};

// ✅ Fetch all leads
export const getLeads = async () => {
  const config = getAuthConfig();
  const { data } = await api.get(`${API_BASE_URL}/api/leads`, config);
  return data;
};

// ✅ Create new lead
export const createLead = async (leadData) => {
  const config = getAuthConfig();
  const { data } = await api.post(
    `${API_BASE_URL}/api/leads`,
    leadData,
    config
  );
  return data;
};

// ✅ Update lead
export const updateLead = async (id, leadData) => {
  const config = getAuthConfig();
  const { data } = await api.put(
    `${API_BASE_URL}/api/leads/${id}`,
    leadData,
    config
  );
  return data;
};

// ✅ Delete lead
export const deleteLead = async (id) => {
  const config = getAuthConfig();
  const { data } = await api.delete(
    `${API_BASE_URL}/api/leads/${id}`,
    config
  );
  return data;
};
