import api from "./axios";

export const provinceService = {
  getAll: () => api.get("/provinces"),
};
