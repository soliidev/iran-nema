import { Hero } from "@/features/home/components/hero";
import Categories from "@/features/home/components/categories/Categories";
import FeaturedPlaces from "@/features/home/components/featured-places/FeaturedPlaces";
import Statistics from "@/features/home/components/Statistics";
import VirtualTourPreview from "@/features/home/components/virtual-tour-preview/VirtualTourPreview";
import CTA from "@/features/home/components/CTA";

const HomePage = () => {
  return (
    <>
      <Hero />
      <Statistics />
      <FeaturedPlaces />
      <Categories />
      <VirtualTourPreview />
      <CTA />
    </>
  );
};

export default HomePage;
