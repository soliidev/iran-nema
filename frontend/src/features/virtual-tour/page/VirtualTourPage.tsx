import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Container from "@/components/layout/Container";
import { Helmet } from "react-helmet-async";
import { Loader2, EyeOff, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import TourViewer360 from "../components/TourViewer360";
import { placeService } from "@/services/place.service";
import { virtualTourService } from "@/services/virtualTour.service";

type Panorama = { id: number; title: string; image: string };

const VirtualTourPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const placeId = Number(searchParams.get("place"));

  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [panoramas, setPanoramas] = useState<Panorama[]>([]);

  useEffect(() => {
    if (!placeId) {
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);

    const load = async () => {
      try {
        const [placeRes, tourRes] = await Promise.all([
          placeService.getById(placeId),
          virtualTourService.getByPlace(placeId),
        ]);

        if (cancelled) return;

        const place = placeRes.data?.data ?? placeRes.data;
        setTitle(place?.title ?? "");

        const images = tourRes.data?.data ?? tourRes.data;
        if (Array.isArray(images)) {
          setPanoramas(
            images.map((img) => ({
              id: img.id,
              title: img.title,
              image:
                img.image_url ||
                (img.image_path ? `/api/media/${img.image_path}` : ""),
            }))
          );
        }
      } catch {
        if (!cancelled) setPanoramas([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [placeId]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!placeId || panoramas.length === 0) {
    return (
      <section className="py-20">
        <Container>
          <div className="flex flex-col items-center gap-4 text-center">
            <EyeOff className="h-16 w-16 text-muted-foreground/40" />
            <p className="text-muted-foreground">تور مجازی برای این مکان وجود ندارد</p>
            <Button variant="outline" onClick={() => navigate("/places")}>
              <ArrowRight className="ml-2 h-4 w-4" />
              بازگشت به مکان‌ها
            </Button>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <>
      <Helmet>
        <title>تور مجازی {title} | ایران‌نما</title>
      </Helmet>
      <TourViewer360
        image={panoramas[0].image}
        title={title}
        onClose={() => navigate(-1)}
        isPanorama
        panoramas={panoramas}
      />
    </>
  );
};

export default VirtualTourPage;
