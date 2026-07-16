import { useQuery } from "@tanstack/react-query";
import { placeService } from "@/services/place.service";
import { virtualTourService } from "@/services/virtualTour.service";

export function useVirtualTourByPlace(placeId: number) {
  return useQuery({
    queryKey: ["virtual-tour", "place", placeId],
    queryFn: async () => {
      const { data } = await virtualTourService.getByPlace(placeId);
      return data.data ?? data;
    },
    enabled: !!placeId,
  });
}

export function usePlacesWithTours() {
  return useQuery({
    queryKey: ["places", "with-tours"],
    queryFn: async () => {
      const { data } = await placeService.getAll({ has_tour: true, per_page: 50 });
      return (data.data ?? data).filter((p: { virtual_tour_images?: unknown[]; virtualTourImages?: unknown[] }) =>
        (p.virtual_tour_images ?? p.virtualTourImages)?.length
      );
    },
    staleTime: 5 * 60 * 1000,
  });
}
