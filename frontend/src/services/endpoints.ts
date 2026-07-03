export const ENDPOINTS = {
  places: "/places",
  placeDetails: (id: number) => `/places/${id}`,
  categories: "/categories",
  login: "/auth/login",
  register: "/auth/register",
  user: "/user",
  favorites: "/favorites",
  search: "/places/search",
} as const;
