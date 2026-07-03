import { useParams } from "react-router-dom";
import { usePlace } from "../../hooks/usePlace";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useState } from "react";

export default function PlaceGallery() {
  const { id } = useParams();
  const place = usePlace(Number(id));
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (!place) return null;

  const images = place.gallery.length > 0 ? place.gallery : [place.image];

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-3xl">
        <AspectRatio ratio={4 / 3}>
          <img
            src={images[selectedIndex]}
            alt={place.title}
            className="h-full w-full object-cover transition-all duration-500"
          />
        </AspectRatio>
      </div>

      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedIndex(idx)}
              className={`shrink-0 overflow-hidden rounded-xl transition-all ${
                idx === selectedIndex ? "ring-2 ring-primary ring-offset-2" : "opacity-60 hover:opacity-100"
              }`}
            >
              <img src={img} alt="" className="h-20 w-20 object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
