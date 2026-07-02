import PlaceCard from "@/features/places/components/PlaceCard";
import { places } from "@/features/places/data/places";
import Container from "@/components/layout/Container";
import SectionTitle from "@/components/common/SectionTitle";

const FeaturedPlaces = () => {
    return (
        <section className="py-20">
            <Container>

                <SectionTitle
                    title="مکان‌های پیشنهادی"
                    description="محبوب‌ترین جاذبه‌های گردشگری ایران را به صورت مجازی بازدید کنید."
                />

                <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
                    {places.map((place) => (
                        <PlaceCard
                            key={place.id}
                            title={place.title}
                            city={place.city}
                            image={place.image}
                            rating={place.rating}
                        />
                    ))}

                </div>

            </Container>
        </section>
    );
}

export default FeaturedPlaces