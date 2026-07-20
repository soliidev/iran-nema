import { useQuery } from "@tanstack/react-query";
import { placeService } from "@/services/place.service";
import type { ApiPlace } from "../types/place";
import { mapApiPlaceToPlace } from "../types/place";

export function usePlace(id: number) {
  return useQuery({
    queryKey: ["places", "detail", id],
    queryFn: async () => {
      const { data: res } = await placeService.getById(id);
      const apiPlace = (res.data?.data ?? res.data ?? res) as ApiPlace;
      return mapApiPlaceToPlace(apiPlace);
    },
    enabled: !!id,
  });
}

export function usePlaces() {
  return useQuery({
    queryKey: ["places"],
    queryFn: async () => {
      const { data: res } = await placeService.getAll({ per_page: 50 });
      const apiPlaces = (res.data?.data ?? res.data ?? res) as ApiPlace[];
      return apiPlaces.map(mapApiPlaceToPlace);
    },
  });
}

export function useRelatedPlaces(currentId: number, limit = 3) {
  return useQuery({
    queryKey: ["places", "related", currentId],
    queryFn: async () => {
      const { data: res } = await placeService.getRelated(currentId);
      const apiPlaces = (res.data.data ?? res.data) as ApiPlace[];
      return apiPlaces.map(mapApiPlaceToPlace).slice(0, limit);
    },
    enabled: !!currentId,
  });
}
