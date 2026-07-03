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
