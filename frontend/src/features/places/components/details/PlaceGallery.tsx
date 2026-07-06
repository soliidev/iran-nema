import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useState } from "react";

type Props = {
  images: string[];
  title: string;
};

export default function PlaceGallery({ images, title }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const allImages = images.length > 0 ? images : [""];

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-3xl">
        <AspectRatio ratio={4 / 3}>
          <img
            src={allImages[selectedIndex]}
            alt={title}
            className="h-full w-full object-cover transition-all duration-500"
          />
        </AspectRatio>
      </div>

      {allImages.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {allImages.map((img, idx) => (
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
