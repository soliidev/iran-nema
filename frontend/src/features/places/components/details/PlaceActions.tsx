import { Button } from "@/components/ui/button";
import { Heart, Share2, MapPin, Eye } from "lucide-react";
import { toast } from "sonner";

export default function PlaceActions() {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: document.title, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("لینک کپی شد");
    }
  };

  const handleFavorite = () => {
    toast.success("به علاقه‌مندی‌ها اضافه شد");
  };

  return (
    <div className="flex flex-wrap gap-3">
      <Button size="lg" className="gap-2">
        <Eye className="h-5 w-5" />
        شروع تور مجازی
      </Button>

      <Button variant="outline" size="lg" className="gap-2">
        <MapPin className="h-5 w-5" />
        مشاهده روی نقشه
      </Button>

      <Button variant="outline" size="icon" className="h-12 w-12" onClick={handleFavorite}>
        <Heart className="h-5 w-5" />
      </Button>

      <Button variant="outline" size="icon" className="h-12 w-12" onClick={handleShare}>
        <Share2 className="h-5 w-5" />
      </Button>
    </div>
  );
}
