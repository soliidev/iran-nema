import api from "./axios";

export const virtualTourService = {
  getByPlace: (placeId: number) =>
    api.get(`/places/${placeId}/virtual-tour`),
};
