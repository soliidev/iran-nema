import { Button } from "@/components/ui/button";
import { Heart, Share2, Eye } from "lucide-react";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";

export default function PlaceActions() {
  const navigate = useNavigate();
  const { id } = useParams();

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
    <div className="flex flex-wrap items-center gap-3">
      <Button
        size="lg"
        className="h-12 gap-2"
        onClick={() => navigate(`/virtual-tour?place=${id}`)}
      >
        <Eye className="h-5 w-5" />
        شروع تور مجازی
      </Button>

      <div className="flex gap-3">
        <Button variant="outline" size="icon" className="h-12 w-12" onClick={handleFavorite}>
          <Heart className="h-5 w-5" />
        </Button>

        <Button variant="outline" size="icon" className="h-12 w-12" onClick={handleShare}>
          <Share2 className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
