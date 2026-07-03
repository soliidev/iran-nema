import { useParams } from "react-router-dom";
import { usePlace } from "../../hooks/usePlace";
import { Badge } from "@/components/ui/badge";

export default function PlaceInfo() {
  const { id } = useParams();
  const place = usePlace(Number(id));

  if (!place) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <h1 className="text-4xl font-black">{place.title}</h1>
        {place.hasVirtualTour && (
          <Badge variant="secondary">تور مجازی</Badge>
        )}
      </div>

      <div className="flex items-center gap-4 text-muted-foreground">
        <span>{place.city}، {place.province}</span>
        <span>•</span>
        <span className="text-primary">★ {place.rating}</span>
        <span>•</span>
        <Badge variant="outline">{place.category}</Badge>
      </div>

      <p className="leading-8 text-muted-foreground">
        {place.description}
      </p>
    </div>
  );
}
