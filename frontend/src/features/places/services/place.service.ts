import api from "@/services/api";
import { ENDPOINTS } from "@/services/endpoints";

export const placeService = {
    getAll() {
        return api.get(ENDPOINTS.places);
    },

    getById(id: number) {
        return api.get(ENDPOINTS.placeDetails(id));
    },
};