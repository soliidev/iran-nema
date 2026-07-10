import api from "./axios";

export const adminService = {
  getProvinces: () => api.get("/provinces"),

  createCategory: (data: Record<string, unknown>) => api.post("/categories", data),
  updateCategory: (id: number, data: Record<string, unknown>) => api.put(`/categories/${id}`, data),
  deleteCategory: (id: number) => api.delete(`/categories/${id}`),

  createPlace: (data: Record<string, unknown>) => api.post("/places", data),
  updatePlace: (id: number, data: Record<string, unknown>) => api.put(`/places/${id}`, data),
  deletePlace: (id: number) => api.delete(`/places/${id}`),

  uploadImage: (placeId: number, formData: FormData) =>
    api.post(`/places/${placeId}/images/upload`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  deleteImage: (placeId: number, imageId: number) =>
    api.delete(`/places/${placeId}/images/${imageId}`),
  setPrimaryImage: (placeId: number, imageId: number) =>
    api.post(`/places/${placeId}/images/${imageId}/primary`),

  uploadVirtualTour: (placeId: number, formData: FormData) =>
    api.post(`/places/${placeId}/virtual-tour/upload`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  deleteVirtualTour: (placeId: number, tourId: number) =>
    api.delete(`/places/${placeId}/virtual-tour/${tourId}`),
};
