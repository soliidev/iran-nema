import api from "./axios";

export const placeService = {
  getAll: (params?: Record<string, unknown>) =>
    api.get("/places", { params }),

  getById: (id: number) =>
    api.get(`/places/${id}`),

  getByCode: (code: string) =>
    api.get(`/places/code/${code}`),

  getByCategory: (categoryId: number, params?: Record<string, unknown>) =>
    api.get(`/places/category/${categoryId}`, { params }),

  getByProvince: (provinceId: number, params?: Record<string, unknown>) =>
    api.get(`/places/province/${provinceId}`, { params }),

  search: (query: string, params?: Record<string, unknown>) =>
    api.get("/places/search", { params: { q: query, ...params } }),

  getRelated: (id: number) =>
    api.get(`/places/${id}/related`),

  getStatistics: () =>
    api.get("/statistics"),
};
