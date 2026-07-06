import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Trash2, Image, Star, Upload } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { toast } from "sonner";
import { adminService } from "@/services/admin.service";
import { placeService } from "@/services/place.service";

interface Img {
  id: number;
  image_path: string;
  alt_text?: string;
  is_primary: boolean;
}

const PlaceImagesPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [placeTitle, setPlaceTitle] = useState("");
  const [images, setImages] = useState<Img[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const fetch = async () => {
    setLoading(true);
    try {
      const { data: placeRes } = await placeService.getById(Number(id));
      const p = placeRes.data ?? placeRes;
      setPlaceTitle(p.title);
      const { data: imgRes } = await placeService.getImages(Number(id));
      setImages(imgRes.data ?? imgRes);
    } catch {
      toast.error("خطا در دریافت اطلاعات");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetch(); }, [id]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append("image", file);
    try {
      await adminService.uploadImage(Number(id), fd);
      toast.success("تصویر آپلود شد");
      fetch();
    } catch {
      toast.error("خطا در آپلود تصویر");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (imageId: number) => {
    if (!confirm("حذف شود؟")) return;
    try {
      await adminService.deleteImage(Number(id), imageId);
      toast.success("تصویر حذف شد");
      fetch();
    } catch {
      toast.error("خطا در حذف تصویر");
    }
  };

  const handleSetPrimary = async (imageId: number) => {
    try {
      await adminService.setPrimaryImage(Number(id), imageId);
      toast.success("تصویر اصلی تنظیم شد");
      fetch();
    } catch {
      toast.error("خطا در تنظیم تصویر اصلی");
    }
  };

  return (
    <>
      <Helmet><title>تصاویر {placeTitle} | ایران‌نما</title></Helmet>
      <div className="mb-6">
        <h1 className="text-3xl font-black">تصاویر مکان</h1>
        <p className="text-muted-foreground">{placeTitle}</p>
      </div>

      <div className="mb-6">
        <label className="cursor-pointer">
          <Button variant="outline" asChild disabled={uploading}>
            <span>
              <Upload className="ml-2 h-4 w-4" />
              {uploading ? "در حال آپلود..." : "آپلود تصویر"}
            </span>
          </Button>
          <input type="file" accept="image/*" className="hidden" onChange={handleUpload} disabled={uploading} />
        </label>
        <Button variant="ghost" className="mr-3" onClick={() => navigate("/admin/places")}>
          بازگشت
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : images.length === 0 ? (
        <div className="py-12 text-center text-muted-foreground">تصویری وجود ندارد</div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((img) => (
            <Card key={img.id}>
              <CardContent className="p-3">
                <img
                  src={img.image_path}
                  alt={img.alt_text ?? ""}
                  className="mb-3 h-48 w-full rounded-lg object-cover"
                />
                <div className="flex justify-between">
                  <div className="flex gap-1">
                    {!img.is_primary && (
                      <Button variant="ghost" size="icon" onClick={() => handleSetPrimary(img.id)} title="تنظیم به عنوان تصویر اصلی">
                        <Star className="h-4 w-4" />
                      </Button>
                    )}
                    {img.is_primary && <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />}
                  </div>
                  <Button variant="ghost" size="icon" className="text-red-500" onClick={() => handleDelete(img.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </>
  );
};

export default PlaceImagesPage;
