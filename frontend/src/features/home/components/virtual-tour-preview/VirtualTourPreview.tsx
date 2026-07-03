import Container from "@/components/layout/Container";
import SectionTitle from "@/components/common/SectionTitle";
import TourCard from "./TourCard";

const tours = [
  { id: 1, title: "تخت جمشید", location: "شیراز", image: "/images/places/perspolis.jpg" },
  { id: 2, title: "میدان نقش جهان", location: "اصفهان", image: "/images/places/naghsh-jahan.jpg" },
  { id: 3, title: "حافظیه", location: "شیراز", image: "/images/places/hafezieh.jpg" },
];

const VirtualTourPreview = () => {
  return (
    <section className="bg-muted/50 py-24">
      <Container>
        <SectionTitle
          title="تور مجازی ۳۶۰ درجه"
          description="تجربه بازدید مجازی از معروف‌ترین جاذبه‌های ایران"
        />
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
