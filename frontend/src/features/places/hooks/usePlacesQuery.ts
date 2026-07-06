import { useQuery } from "@tanstack/react-query";
import { placeService } from "@/services/place.service";

export const placesKeys = {
  all: ["places"] as const,
  list: (filters?: Record<string, unknown>) => ["places", "list", filters] as const,
  details: (id: number) => ["places", "detail", id] as const,
  byCode: (code: string) => ["places", "code", code] as const,
  byCategory: (id: number) => ["places", "category", id] as const,
  byProvince: (id: number) => ["places", "province", id] as const,
  related: (id: number) => ["places", "related", id] as const,
  statistics: ["places", "statistics"] as const,
};

export function usePlaces(filters?: Record<string, unknown>) {
  return useQuery({
    queryKey: placesKeys.list(filters),
    queryFn: async () => {
      const { data } = await placeService.getAll(filters);
      return data.data ?? data;
    },
  });
}

export function usePlaceById(id: number) {
  return useQuery({
    queryKey: placesKeys.details(id),
    queryFn: async () => {
      const { data } = await placeService.getById(id);
      return data.data ?? data;
    },
    enabled: !!id,
  });
}

export function usePlaceByCode(code: string) {
  return useQuery({
    queryKey: placesKeys.byCode(code),
    queryFn: async () => {
      const { data } = await placeService.getByCode(code);
      return data.data ?? data;
    },
    enabled: !!code,
  });
}

export function usePlacesByCategory(categoryId: number, filters?: Record<string, unknown>) {
  return useQuery({
    queryKey: placesKeys.byCategory(categoryId),
    queryFn: async () => {
      const { data } = await placeService.getByCategory(categoryId, filters);
      return data.data ?? data;
    },
    enabled: !!categoryId,
  });
}

export function usePlacesByProvince(provinceId: number, filters?: Record<string, unknown>) {
  return useQuery({
    queryKey: placesKeys.byProvince(provinceId),
    queryFn: async () => {
      const { data } = await placeService.getByProvince(provinceId, filters);
      return data.data ?? data;
    },
    enabled: !!provinceId,
  });
}

export function useSearchPlaces(query: string, filters?: Record<string, unknown>) {
  return useQuery({
    queryKey: ["places", "search", query, filters],
    queryFn: async () => {
      const { data } = await placeService.search(query, filters);
      return data.data ?? data;
    },
    enabled: query.length >= 2,
  });
}

export function useRelatedPlaces(id: number) {
  return useQuery({
    queryKey: placesKeys.related(id),
    queryFn: async () => {
      const { data } = await placeService.getRelated(id);
      return data.data ?? data;
    },
    enabled: !!id,
  });
}

export function usePlaceStatistics() {
  return useQuery({
    queryKey: placesKeys.statistics,
    queryFn: async () => {
      const { data } = await placeService.getStatistics();
      return data.data ?? data;
    },
    staleTime: 5 * 60 * 1000,
  });
}
