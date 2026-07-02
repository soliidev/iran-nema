import Categories from "@/features/home/components/categories/Categories";
import FeaturedPlaces from "@/features/home/components/featured-places/FeaturedPlaces";
import { Hero } from "@/features/home/components/hero";

const HomePage = () => {
    return (
        <>
            <Hero />
            <FeaturedPlaces />
            <Categories />
        </>
    );
}

export default HomePage;