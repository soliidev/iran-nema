import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Container from "@/components/layout/Container";
import { Breadcrumb } from "@/components/common";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Helmet } from "react-helmet-async";
import { Play } from "lucide-react";
import TourViewer360 from "../components/TourViewer360";

type Tour = {
  id: number;
  title: string;
  location: string;
  image: string;
  panorama?: string;
  duration: string;
};

const tours: Tour[] = [
  { id: 1, title: "تخت جمشید", location: "شیراز", image: "/images/places/perspolis.jpg", panorama: "/images/places/perspolis360.jpg", duration: "۵:۳۲" },
  { id: 2, title: "میدان نقش جهان", location: "اصفهان", image: "/images/places/naghsh-jahan.jpg", duration: "۴:۱۵" },
  { id: 3, title: "حافظیه", location: "شیراز", image: "/images/places/hafezieh.jpg", duration: "۳:۴۵" },
  { id: 4, title: "ارگ بم", location: "بم", image: "/images/places/arg-e-bam.jpg", duration: "۶:۲۰" },
  { id: 5, title: "پل خواجو", location: "اصفهان", image: "/images/places/khaju-bridge.jpg", duration: "۴:۰۰" },
];

const VirtualTourPage = () => {
  const [searchParams] = useSearchParams();
  const [activeTour, setActiveTour] = useState<number | null>(null);

  useEffect(() => {
    const placeId = searchParams.get("place");
    if (placeId) setActiveTour(Number(placeId));
  }, [searchParams]);

  const activeTourData = tours.find((t) => t.id === activeTour);

  return (
    <>
      <Helmet>
        <title>تور مجازی | ایران‌نما</title>
      </Helmet>

      {activeTourData ? (
        <TourViewer360
          image={activeTourData.panorama || activeTourData.image}
          title={activeTourData.title}
          onClose={() => setActiveTour(null)}
          isPanorama={!!activeTourData.panorama}
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
                      {tour.panorama && (
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
          </Container>
        </section>
      )}
    </>
  );
};

export default VirtualTourPage;
