import PlaceCard from "@/features/places/components/PlaceCard";
import { places } from "@/features/places/data/places";
import Container from "@/components/layout/Container";

const FeaturedPlaces = () => {
    return (
        <section className="py-20">
            <Container>

                <h2 className="mb-8 text-3xl font-bold">
                    مکان‌های پیشنهادی
                </h2>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

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