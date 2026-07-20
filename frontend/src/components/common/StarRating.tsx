import { useState } from "react";
import { Star } from "lucide-react";

interface StarRatingProps {
  value: number;
  onChange?: (value: number) => void;
  readOnly?: boolean;
  size?: number;
}

export default function StarRating({
  value,
  onChange,
  readOnly = false,
  size = 20,
}: StarRatingProps) {
  const [hover, setHover] = useState<number | null>(null);
  const display = hover ?? value;

  const handleMove = (e: React.MouseEvent<HTMLSpanElement>, index: number) => {
    if (readOnly) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const isLeftHalf = e.clientX - rect.left < rect.width / 2;
    setHover(isLeftHalf ? index - 0.5 : index);
  };

  return (
    <div className="flex items-center justify-center gap-1" dir="ltr">
      {[1, 2, 3, 4, 5].map((index) => {
        const fill = Math.max(0, Math.min(1, display - (index - 1)));
        return (
          <span
            key={index}
            className={readOnly ? "relative inline-block" : "relative inline-block cursor-pointer"}
            style={{ width: size, height: size }}
            onMouseMove={(e) => handleMove(e, index)}
            onMouseLeave={() => {
              if (!readOnly) setHover(null);
            }}
            onClick={() => {
              if (!readOnly) onChange?.(hover ?? index);
            }}
          >
            <Star
              className="absolute inset-0 text-muted-foreground/40"
              style={{ width: size, height: size }}
            />
            <span
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${fill * 100}%` }}
            >
              <Star
                className="text-yellow-400"
                fill="currentColor"
                style={{ width: size, height: size }}
              />
            </span>
          </span>
        );
      })}
    </div>
  );
}
