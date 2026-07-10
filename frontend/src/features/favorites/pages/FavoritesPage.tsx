import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Container from "@/components/layout/Container";
import { Breadcrumb } from "@/components/common";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Heart, Trash2 } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { toast } from "sonner";
import { favoriteService } from "@/services/favorite.service";
import { useNavigate } from "react-router-dom";

interface Place {
  id: number;
  title: string;
  province?: { id: number; name: string };
  primary_image?: { image_path: string; image_url?: string };
}

interface FavoriteItem {
  id: number;
  place: Place;
}

const FavoritesPage = () => {
  const [items, setItems] = useState<FavoriteItem[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetch = async () => {
    setLoading(true);
    try {
      const { data: res } = await favoriteService.getAll();
      setItems(res.data ?? res);
    } catch {
      toast.error("خطا در دریافت علاقه‌مندی‌ها");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetch(); }, []);

  const handleRemove = async (placeId: number) => {
    try {
      await favoriteService.remove(placeId);
      toast.success("از علاقه‌مندی‌ها حذف شد");
      fetch();
    } catch {
      toast.error("خطا در حذف");
    }
  };

  return (
    <>
      <Helmet><title>علاقه‌مندی‌ها | ایران‌نما</title></Helmet>
      <section className="py-8">
        <Container>
          <Breadcrumb />
          <div className="mt-8">
            <h1 className="text-4xl font-black">علاقه‌مندی‌ها</h1>
            <p className="mt-2 text-muted-foreground">مکان‌های مورد علاقه شما</p>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : items.length === 0 ? (
            <div className="flex flex-col items-center gap-4 py-20 text-center">
              <Heart className="h-16 w-16 text-muted-foreground/40" />
              <p className="text-muted-foreground">هنوز هیچ مکانی به علاقه‌مندی‌ها اضافه نکرده‌اید</p>
              <Button variant="outline" onClick={() => navigate("/places")}>مشاهده مکان‌ها</Button>
            </div>
          ) : (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-4">
                    <Link to={`/places/${item.place.id}`}>
                      <img
                        src={item.place.primary_image?.image_url || item.place.primary_image?.image_path || ""}
                        alt={item.place.title}
                        className="mb-3 h-40 w-full rounded-lg object-cover"
                      />
                      <h3 className="font-bold">{item.place.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.place.province?.name}</p>
                    </Link>
                    <Button variant="ghost" size="sm" className="mt-2 w-full text-red-500" onClick={() => handleRemove(item.place.id)}>
                      <Trash2 className="ml-2 h-4 w-4" />
                      حذف
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
};

export default FavoritesPage;
