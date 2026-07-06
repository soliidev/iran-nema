import api from "./axios";

export const categoryService = {
  getAll: (params?: Record<string, unknown>) =>
    api.get("/categories", { params }),

  getById: (id: number) =>
    api.get(`/categories/${id}`),

  getByCode: (code: string) =>
    api.get(`/categories/code/${code}`),
};
