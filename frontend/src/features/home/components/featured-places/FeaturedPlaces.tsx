import Container from "@/components/layout/Container";
import PlaceGrid from "@/features/places/components/PlaceGrid";
import { places } from "@/features/places/data/places";

const FeaturedPlaces = () => {
    return (
        <section className="py-24">

            <Container>

                <div className="mb-12 text-center">

                    <h2 className="text-4xl font-black">
                        محبوب‌ترین مکان‌ها
                    </h2>

                    <p className="mt-4 text-muted-foreground">
                        بازدید از معروف‌ترین جاذبه‌های ایران
                    </p>

                </div>

                <PlaceGrid
                    places={places}
                />

            </Container>

        </section>
    );
}

export default FeaturedPlaces;