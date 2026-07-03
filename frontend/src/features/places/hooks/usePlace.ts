import { places } from "../data/places";
import type { Place } from "../types/place";

export function usePlace(id: number): Place | undefined {
  return places.find((item) => item.id === id);
}

export function usePlaces(): Place[] {
  return places;
}

export function useRelatedPlaces(currentId: number, limit = 3): Place[] {
  const current = usePlace(currentId);
  if (!current) return [];
  return places
    .filter((p) => p.id !== currentId && p.category === current.category)
    .slice(0, limit);
}
