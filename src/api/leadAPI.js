import api from "./axiosConfig";

// Always use full path WITHOUT extra /api
export const getLeads = async () => {
  const { data } = await api.get("/leads");
  return data;
};

export const createLead = async (leadData) => {
  const { data } = await api.post("/leads", leadData);
  return data;
};

export const updateLead = async (id, leadData) => {
  const { data } = await api.put(`/leads/${id}`, leadData);
  return data;
};

export const deleteLead = async (id) => {
  const { data } = await api.delete(`/leads/${id}`);
  return data;
};
