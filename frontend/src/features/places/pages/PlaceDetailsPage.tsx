import Container from "@/components/layout/Container";
import PlaceGallery from "../components/details/PlaceGallery";
import PlaceInfo from "../components/details/PlaceInfo";
import PlaceLocation from "../components/details/PlaceLocation";
import PlaceActions from "../components/details/PlaceActions";
import { Breadcrumb } from "@/components/common";
import PlaceGrid from "../components/PlaceGrid";
import { useParams } from "react-router-dom";
import { usePlace, useRelatedPlaces } from "../hooks/usePlace";
import { Helmet } from "react-helmet-async";

export default function PlaceDetailsPage() {
  const { id } = useParams();
  const place = usePlace(Number(id));
  const relatedPlaces = useRelatedPlaces(Number(id));

  if (!place) {
    return (
      <Container>
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="text-center">
            <h2 className="text-3xl font-bold">مکان پیدا نشد</h2>
            <p className="mt-2 text-muted-foreground">مکان مورد نظر وجود ندارد.</p>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <>
      <Helmet>
        <title>{place.title} | ایران‌نما</title>
      </Helmet>
      <section className="py-8">
        <Container>
          <Breadcrumb />

          <div className="mt-4 grid gap-10 lg:grid-cols-2">
            <PlaceGallery />
            <div className="space-y-8">
              <PlaceInfo />
              <PlaceLocation />
              <PlaceActions />
            </div>
          </div>

          {relatedPlaces.length > 0 && (
            <section className="mt-20">
              <h2 className="mb-8 text-3xl font-bold">مکان‌های مشابه</h2>
              <PlaceGrid places={relatedPlaces} />
            </section>
          )}
        </Container>
      </section>
    </>
  );
}
