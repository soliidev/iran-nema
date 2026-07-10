import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useEffect, useState } from "react";

type Props = {
  images: string[];
  title: string;
};

export default function PlaceGallery({ images, title }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    setSelectedIndex(0);
  }, [images]);

  const allImages = images.length > 0 ? images : [""];
  const safeIndex = selectedIndex < allImages.length ? selectedIndex : 0;

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-3xl bg-card shadow-lg ring-1 ring-border">
        <AspectRatio ratio={4 / 3}>
          <img
            src={allImages[safeIndex]}
            alt={title}
            className="h-full w-full cursor-pointer object-cover transition-all duration-500"
          />
        </AspectRatio>
      </div>

      {allImages.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedIndex(idx)}
                className={`shrink-0 cursor-pointer overflow-hidden rounded-xl bg-card shadow-lg ring-1 ring-border transition-all ${
                  idx === safeIndex ? "ring-2 ring-primary ring-offset-2" : "opacity-60 hover:opacity-100"
                }`}
              >
                <img src={img} alt="" className="h-20 w-20 cursor-pointer object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
