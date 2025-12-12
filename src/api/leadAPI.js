import api from "./axiosConfig";

// Fetch all leads
export const getLeads = async () => {
  const { data } = await api.get("/leads");
  return data;
};

// Create lead
export const createLead = async (leadData) => {
  const { data } = await api.post("/leads", leadData);
  return data;
};

// Update lead
export const updateLead = async (id, leadData) => {
  const { data } = await api.put(`/leads/${id}`, leadData);
  return data;
};

// Delete lead
export const deleteLead = async (id) => {
  const { data } = await api.delete(`/leads/${id}`);
  return data;
};
