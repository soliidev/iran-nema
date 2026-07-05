import { MapPin } from "lucide-react";
import { useParams } from "react-router-dom";
import { usePlace } from "../../hooks/usePlace";
import ClientOnly from "@/components/common/ClientOnly";
import { useEffect, useRef } from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Style, Icon } from "ol/style";
import { fromLonLat } from "ol/proj";
import "ol/ol.css";

export default function PlaceLocation() {
  const { id } = useParams();
  const place = usePlace(Number(id));
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<Map | null>(null);

  useEffect(() => {
    if (!place || !mapRef.current || mapInstanceRef.current) return;

    const coordinates = fromLonLat([place.longitude, place.latitude]);

    const marker = new Feature({
      geometry: new Point(coordinates),
    });

    marker.setStyle(
      new Style({
        image: new Icon({
          src: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
          scale: 0.5,
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

    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        vectorLayer,
      ],
      view: new View({
        center: coordinates,
        zoom: 13,
      }),
    });

    mapInstanceRef.current = map;

    return () => {
      map.setTarget(undefined);
      mapInstanceRef.current = null;
    };
  }, [place]);

  if (!place) return null;

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold">موقعیت مکانی</h3>
      <div className="flex items-center gap-3 text-muted-foreground">
        <MapPin className="h-5 w-5 shrink-0 text-primary" />
        <span>{place.city}، {place.province}</span>
      </div>
      <ClientOnly>
        <div ref={mapRef} className="h-64 w-full overflow-hidden rounded-2xl" />
      </ClientOnly>
    </div>
  );
}
