import Categories from "@/features/home/components/Categories";
import CTA from "@/features/home/components/CTA";
import FeaturedPlaces from "@/features/home/components/FeaturedPlaces";
import Hero from "@/features/home/components/Hero";
import Statistics from "@/features/home/components/Statistics";

const HomePage = () => {
    return (
        <>
            <Hero />
            <FeaturedPlaces />
            <Statistics />
            <Categories />
            <CTA />
        </>
    );
}

export default HomePage;