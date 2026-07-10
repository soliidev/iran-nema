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
  primary_image?: { image_path: string; image_url?: string } | null;
  primary_image_path?: string;
  images?: { image_path: string; image_url?: string; is_primary?: boolean }[];
  virtual_tour_images?: { id: number; title: string; image_path: string; image_url?: string }[];
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
    image: api.primary_image?.image_url || api.primary_image?.image_path || api.primary_image_path || "/images/places/persepolis/persepolis.jpg",
    gallery: (() => {
      const imgs = (api.images || []).map((i) => ({
        url: i.image_url || i.image_path,
        isPrimary: !!i.is_primary,
      }));
      const primary = imgs.filter((i) => i.isPrimary);
      const others = imgs.filter((i) => !i.isPrimary);
      return [...primary, ...others].map((i) => i.url);
    })(),
    latitude: Number(api.latitude),
    longitude: Number(api.longitude),
    rating: Number(api.rating),
    category: api.category?.title || "",
    hasVirtualTour: (api.virtual_tour_images || []).length > 0,
  };
}
