import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Container from "@/components/layout/Container";
import { Breadcrumb } from "@/components/common";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Helmet } from "react-helmet-async";
import { Play, Loader2, EyeOff } from "lucide-react";
import TourViewer360 from "../components/TourViewer360";
import { usePlacesWithTours } from "../hooks/useVirtualTours";
import { virtualTourService } from "@/services/virtualTour.service";

const VirtualTourPage = () => {
  const [searchParams] = useSearchParams();
  const [activeTour, setActiveTour] = useState<number | null>(null);
  const [tourPanoramas, setTourPanoramas] = useState<{ id: number; title: string; image: string }[]>([]);

  const { data: apiPlaces = [], isLoading } = usePlacesWithTours();

  const tours = apiPlaces.map((p) => ({
    id: p.id,
    title: p.title,
    location: p.city || p.province || "",
    image: p.primary_image?.image_url || p.primary_image?.image_path || "",
    panoramas: (p.virtual_tour_images || []).map((img) => ({
      id: img.id,
      title: img.title,
      image: img.image_url || img.image_path,
    })),
    duration: `${p.virtual_tour_images?.length || 1} بخش`,
  }));

  useEffect(() => {
    const placeId = searchParams.get("place");
    if (placeId) setActiveTour(Number(placeId));
  }, [searchParams]);

  useEffect(() => {
    if (!activeTour) return;
    const tour = tours.find((t) => t.id === activeTour);
    if (tour?.panoramas?.length) {
      setTourPanoramas(tour.panoramas);
    } else {
      setTourPanoramas([]);
      virtualTourService.getByPlace(activeTour).then(({ data }) => {
        const images = data.data ?? data;
        if (Array.isArray(images) && images.length) {
          setTourPanoramas(
            images.map((img) => ({ id: img.id, title: img.title, image: img.image_url || img.image_path }))
          );
        }
      }).catch(() => {});
    }
  }, [activeTour]);

  const activeTourData = tours.find((t) => t.id === activeTour);
  const viewerImage = activeTourData?.panoramas?.[0]?.image || activeTourData?.image || "";
  const viewerTitle = activeTourData?.title || "";

  return (
    <>
      <Helmet>
        <title>تور مجازی | ایران‌نما</title>
      </Helmet>

      {activeTourData ? (
        <TourViewer360
          image={viewerImage}
          title={viewerTitle}
          onClose={() => setActiveTour(null)}
          isPanorama={tourPanoramas.length > 0}
          panoramas={tourPanoramas}
        />
      ) : (
        <section className="py-8">
          <Container>
            <Breadcrumb />
            <div className="mt-8">
              <h1 className="text-5xl font-black">تور مجازی ۳۶۰ درجه</h1>
              <p className="mt-3 text-muted-foreground">
                تجربه بازدید مجازی از جاذبه‌های گردشگری ایران
              </p>
            </div>
            {isLoading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
              </div>
            ) : tours.length === 0 ? (
              <div className="flex flex-col items-center gap-4 py-20 text-center">
                <EyeOff className="h-16 w-16 text-muted-foreground/40" />
                <p className="text-muted-foreground">هیچ تور مجازی برای نمایش وجود ندارد</p>
              </div>
            ) : (
              <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {tours.map((tour) => (
                  <Card
                    key={tour.id}
                    className="group cursor-pointer overflow-hidden transition hover:-translate-y-2 hover:shadow-xl"
                    onClick={() => setActiveTour(tour.id)}
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={tour.image}
                        alt={tour.title}
                        className="h-52 w-full object-cover transition duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition group-hover:opacity-100">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                          <Play className="h-8 w-8" />
                        </div>
                      </div>
                      <div className="absolute left-3 top-3 flex gap-2">
                        <span className="rounded-lg bg-black/60 px-3 py-1 text-xs text-white">{tour.duration}</span>
                        {tour.panoramas.length > 0 && (
                          <Badge variant="secondary" className="text-xs">۳۶۰°</Badge>
                        )}
                      </div>
                    </div>
                    <CardContent className="p-5">
                      <h3 className="text-lg font-bold">{tour.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{tour.location}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </Container>
        </section>
      )}
    </>
  );
};

export default VirtualTourPage;
