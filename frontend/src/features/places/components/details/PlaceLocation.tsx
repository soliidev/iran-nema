import { MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Props = {
  latitude: number;
  longitude: number;
};

export default function PlaceLocation({ latitude, longitude }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<unknown | null>(null);
  const [mapError, setMapError] = useState(false);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    let cancelled = false;
    let map: unknown = null;

    const initMap = async () => {
      try {
        const [
          { default: Map },
          { default: View },
          { default: TileLayer },
          { default: OSM },
          { default: Feature },
          { default: Point },
          { default: VectorLayer },
          { default: VectorSource },
          { Style, Icon },
          { fromLonLat },
          { default: FullScreen },
          { default: Zoom },
        ] = await Promise.all([
          import("ol/Map"),
          import("ol/View"),
          import("ol/layer/Tile"),
          import("ol/source/OSM"),
          import("ol/Feature"),
          import("ol/geom/Point"),
          import("ol/layer/Vector"),
          import("ol/source/Vector"),
          import("ol/style"),
          import("ol/proj"),
          import("ol/control/FullScreen"),
          import("ol/control/Zoom"),
        ]);

        if (cancelled || !mapRef.current) return;

        const coordinates = fromLonLat([longitude, latitude]);

        const marker = new Feature({
          geometry: new Point(coordinates),
        });

        marker.setStyle(
          new Style({
            image: new Icon({
              src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%230f766e' width='48' height='48'%3E%3Cpath d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z'/%3E%3C/svg%3E",
              scale: 1.2,
              anchor: [0.5, 1],
            }),
          }),
        );

        const vectorSource = new VectorSource({
          features: [marker],
        });

        const vectorLayer = new VectorLayer({
          source: vectorSource,
        });

        map = new Map({
          target: mapRef.current,
          controls: [new FullScreen(), new Zoom()],
          layers: [
            new TileLayer({
              source: new OSM({
                attributions: [],
              }),
            }),
            vectorLayer,
          ],
          view: new View({
            center: coordinates,
            zoom: 15,
          }),
        });

        mapInstanceRef.current = map;
      } catch (err) {
        console.error("Map init error:", err);
        if (!cancelled) setMapError(true);
      }
    };

    initMap();

    return () => {
      cancelled = true;
      if (map && typeof map === "object" && "setTarget" in map) {
        (map as { setTarget: (t: undefined) => void }).setTarget(undefined);
      }
      mapInstanceRef.current = null;
    };
  }, [latitude, longitude]);

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold">موقعیت مکانی</h3>
      <div className="flex items-center gap-3 text-muted-foreground">
        <MapPin className="h-5 w-5 shrink-0 text-primary" />
        <span>
          {Number(longitude).toFixed(6)}، {Number(latitude).toFixed(6)}
        </span>
      </div>
      {mapError ? (
        <div className="flex h-64 w-full items-center justify-center rounded-2xl bg-muted">
          <p className="text-muted-foreground">خطا در بارگذاری نقشه</p>
        </div>
      ) : (
        <div
          ref={mapRef}
          style={{ height: "256px", width: "100%", borderRadius: "1rem" }}
        />
      )}
    </div>
  );
}
