import { Badge } from "@/components/ui/badge";

type Props = {
  title: string;
  city: string;
  province: string;
  rating: number;
  category: string;
  description: string;
  hasVirtualTour: boolean;
};

export default function PlaceInfo({ title, city, province, rating, category, description, hasVirtualTour }: Props) {
  const location =
    city && city !== province ? `${city}، استان ${province}` : `استان ${province}`;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <h1 className="text-4xl font-black">{title}</h1>
        {hasVirtualTour && (
          <Badge variant="secondary">تور مجازی</Badge>
        )}
      </div>

      <div className="flex items-center gap-4 text-muted-foreground">
        <span>{location}</span>
        <span>•</span>
        <span className="text-primary">★ {rating}</span>
        <span>•</span>
        <Badge variant="outline">{category}</Badge>
      </div>

      <p className="leading-8 text-muted-foreground">
        {description}
      </p>
    </div>
  );
}
