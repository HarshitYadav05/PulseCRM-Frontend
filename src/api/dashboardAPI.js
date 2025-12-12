import api from "./axiosConfig";

export const getDashboardData = async () => {
  const { data } = await api.get("/dashboard");
  return data;
};
