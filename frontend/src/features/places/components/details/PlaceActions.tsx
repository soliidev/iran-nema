import { Button } from "@/components/ui/button";
import { Heart, Share2, Eye } from "lucide-react";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAppSelector } from "@/store/hooks";
import { favoriteService } from "@/services/favorite.service";

export default function PlaceActions() {
  const navigate = useNavigate();
  const { id } = useParams();
  const placeId = Number(id);
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const [favorited, setFavorited] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || !placeId) return;
    favoriteService
      .check(placeId)
      .then(({ data }) => setFavorited(!!data.favorited))
      .catch(() => {});
  }, [isAuthenticated, placeId]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: document.title, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("لینک کپی شد");
    }
  };

  const handleFavorite = async () => {
    try {
      setLoading(true);
      const { data } = await favoriteService.toggle(placeId);
      setFavorited(data.favorited);
      toast.success(data.favorited ? "به علاقه‌مندی‌ها اضافه شد" : "از علاقه‌مندی‌ها حذف شد");
    } catch (err: unknown) {
      const status = (err as { response?: { status?: number } })?.response?.status;
      if (status === 401) {
        toast.error("برای افزودن به علاقه‌مندی‌ها ابتدا وارد شوید");
        navigate("/login");
      } else {
        toast.error("خطا در ثبت علاقه‌مندی");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <Button
        size="lg"
        className="h-12 gap-2 cursor-pointer"
        onClick={() => navigate(`/virtual-tour?place=${id}`)}
      >
        <Eye className="h-5 w-5" />
        شروع تور مجازی
      </Button>

      <div className="flex gap-3">
        <Button
          variant="outline"
          size="icon"
          className="h-12 w-12 cursor-pointer"
          onClick={handleFavorite}
          disabled={loading}
          aria-label="افزودن به علاقه‌مندی‌ها"
        >
          <Heart
            className={`h-5 w-5 ${favorited ? "fill-red-500 text-red-500" : ""}`}
          />
        </Button>

        <Button variant="outline" size="icon" className="h-12 w-12" onClick={handleShare}>
          <Share2 className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
