export interface Place {
  id: number;
  title: string;
  city: string;
  province: string;
  description: string;
  image: string;
  gallery: string[];
  latitude: number;
  longitude: number;
  rating: number;
  category: string;
  hasVirtualTour: boolean;
}

export interface ApiPlace {
  id: number;
  category_id: number;
  province_id: number;
  code: string;
  title: string;
  latitude: string | number;
  longitude: string | number;
  description: string | null;
  rating: string | number;
  category?: { id: number; title: string } | null;
  province?: { id: number; name: string } | null;
  primary_image?: { image_path: string } | null;
  images?: { image_path: string }[];
  virtual_tour_images?: { id: number; title: string; image_path: string }[];
  created_at?: string;
  updated_at?: string;
}

export function mapApiPlaceToPlace(api: ApiPlace): Place {
  return {
    id: api.id,
    title: api.title,
    city: api.province?.name || "",
    province: api.province?.name || "",
    description: api.description || "",
    image: api.primary_image?.image_path || "/images/places/persepolis/persepolis.jpg",
    gallery: (api.images || []).map((i) => i.image_path),
    latitude: Number(api.latitude),
    longitude: Number(api.longitude),
    rating: Number(api.rating),
    category: api.category?.title || "",
    hasVirtualTour: (api.virtual_tour_images || []).length > 0,
  };
}
