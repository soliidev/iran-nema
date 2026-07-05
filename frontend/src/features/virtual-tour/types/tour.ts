export type PanoramaSection = {
  id: number;
  title: string;
  image: string;
};

export type Tour = {
  id: number;
  title: string;
  location: string;
  image: string;
  panoramas?: PanoramaSection[];
  duration: string;
};
