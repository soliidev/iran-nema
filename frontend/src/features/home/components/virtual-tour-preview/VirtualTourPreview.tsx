import Container from "@/components/layout/Container";
import SectionTitle from "@/components/common/SectionTitle";
import TourCard from "./TourCard";
import { usePlacesWithTours } from "@/features/virtual-tour/hooks/useVirtualTours";
import { Loader2, EyeOff } from "lucide-react";

const VirtualTourPreview = () => {
  const { data: apiPlaces = [], isLoading } = usePlacesWithTours();

  if (isLoading) {
    return (
      <section className="bg-muted/50 py-24">
        <Container>
          <SectionTitle title="تور مجازی ۳۶۰ درجه" description="تجربه بازدید مجازی از معروف‌ترین جاذبه‌های ایران" />
          <div className="flex justify-center py-12">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
        </Container>
      </section>
    );
  }

  if (apiPlaces.length === 0) return null;

  const tours = apiPlaces.slice(0, 3).map((p) => ({
    id: p.id,
    title: p.title,
    location: p.city || p.province || "",
    image: p.primary_image?.image_url || p.primary_image?.image_path || "",
  }));

  return (
    <section className="bg-muted/50 py-24">
      <Container>
        <SectionTitle title="تور مجازی ۳۶۰ درجه" description="تجربه بازدید مجازی از معروف‌ترین جاذبه‌های ایران" />
        <div className="grid gap-8 md:grid-cols-3">
          {tours.map((tour) => (
            <TourCard key={tour.id} {...tour} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default VirtualTourPreview;
