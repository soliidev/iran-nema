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
import { Loader2, Frown } from "lucide-react";

export default function PlaceDetailsPage() {
  const { id } = useParams();
  const { data: place, isLoading, isError } = usePlace(Number(id));
  const { data: relatedPlaces = [] } = useRelatedPlaces(Number(id));

  if (isLoading) {
    return (
      <Container>
        <div className="flex min-h-[60vh] items-center justify-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      </Container>
    );
  }

  if (isError || !place) {
    return (
      <Container>
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="text-center">
            <Frown className="mx-auto h-16 w-16 text-muted-foreground/40" />
            <h2 className="mt-4 text-3xl font-bold">مکان پیدا نشد</h2>
            <p className="mt-2 text-muted-foreground">مکان مورد نظر وجود ندارد یا حذف شده است.</p>
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
            <PlaceGallery images={place.gallery} title={place.title} />
            <div className="space-y-8">
              <PlaceInfo
                title={place.title}
                city={place.city}
                province={place.province}
                rating={place.rating}
                category={place.category}
                description={place.description}
                hasVirtualTour={place.hasVirtualTour}
              />
              <PlaceLocation latitude={place.latitude} longitude={place.longitude} city={place.city} province={place.province} />
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
