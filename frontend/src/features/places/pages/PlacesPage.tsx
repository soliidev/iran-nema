import Container from "@/components/layout/Container";

import PlaceGrid from "../components/PlaceGrid";
import { places } from "../data/places";
import PlaceSearch from "../components/PlaceSearch";
import PlaceFilter from "../components/PlaceFilter";

export default function PlacesPage() {
    return (
        <section className="py-20">

            <Container>

                <div className="mb-10">

                    <h1 className="text-4xl font-black">
                        همه مکان‌ها
                    </h1>

                    <p className="mt-3 text-muted-foreground">
                        جاذبه‌های تاریخی، طبیعی و فرهنگی ایران
                    </p>

                </div>

                <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                    <PlaceSearch />

                    <PlaceFilter />

                </div>

                <PlaceGrid places={places} />

            </Container>

        </section>
    );
}