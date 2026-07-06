import api from "./axios";

export const favoriteService = {
  getAll: () =>
    api.get("/favorites"),

  toggle: (placeId: number) =>
    api.post("/favorites", { place_id: placeId }),

  remove: (placeId: number) =>
    api.delete(`/favorites/${placeId}`),

  check: (placeId: number) =>
    api.get(`/favorites/check/${placeId}`),

  count: (placeId: number) =>
    api.get(`/favorites/count/${placeId}`),
};
