import Container from "@/components/layout/Container";

import PlaceGallery from "../components/details/PlaceGallery";
import PlaceInfo from "../components/details/PlaceInfo";
import PlaceLocation from "../components/details/PlaceLocation";
import PlaceActions from "../components/details/PlaceActions";

export default function PlaceDetailsPage() {
    return (
        <section className="py-16">

            <Container>

                <div className="grid gap-10 lg:grid-cols-2">

                    <PlaceGallery />

                    <div className="space-y-8">

                        <PlaceInfo />

                        <PlaceLocation />

                        <PlaceActions />

                    </div>

                </div>

            </Container>

        </section>
    );
}