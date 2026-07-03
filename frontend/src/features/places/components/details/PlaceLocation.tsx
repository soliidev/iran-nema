import { MapPin } from "lucide-react";
import { useParams } from "react-router-dom";
import { usePlace } from "../../hooks/usePlace";

export default function PlaceLocation() {
  const { id } = useParams();
  const place = usePlace(Number(id));

  if (!place) return null;

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold">موقعیت مکانی</h3>
      <div className="flex items-center gap-3 text-muted-foreground">
        <MapPin className="h-5 w-5 shrink-0 text-primary" />
        <span>{place.city}، {place.province}</span>
      </div>
      <div className="h-48 w-full rounded-2xl bg-muted flex items-center justify-center text-muted-foreground">
        <div className="text-center">
          <MapPin className="mx-auto h-8 w-8 text-primary" />
          <p className="mt-2 text-sm">{place.latitude}°, {place.longitude}°</p>
        </div>
      </div>
    </div>
  );
}
