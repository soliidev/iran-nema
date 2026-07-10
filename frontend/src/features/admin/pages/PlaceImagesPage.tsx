import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Loader2, Trash2, Star, Upload, Video, X, Image as ImageIcon } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { toast } from "sonner";
import { adminService } from "@/services/admin.service";
import { placeService } from "@/services/place.service";

interface Img {
  id: number;
  image_path: string;
  image_url?: string;
  alt_text?: string;
  is_primary: boolean;
}

interface VirtualTour {
  id: number;
  title: string;
  image_path: string;
  image_url?: string;
}

const PlaceImagesPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const placeId = Number(id);
  const [placeTitle, setPlaceTitle] = useState("");
  const [images, setImages] = useState<Img[]>([]);
  const [virtualTours, setVirtualTours] = useState<VirtualTour[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [vtUploading, setVtUploading] = useState(false);
  const [vtTitle, setVtTitle] = useState("");
  const [activeTab, setActiveTab] = useState<"images" | "virtual-tours">("images");

  const fetch = async () => {
    setLoading(true);
    try {
      const { data: placeRes } = await placeService.getById(placeId);
      const p = placeRes.data ?? placeRes;
      setPlaceTitle(p.title);
      const [{ data: imgRes }, { data: vtRes }] = await Promise.all([
        placeService.getImages(placeId),
        placeService.getVirtualTours(placeId),
      ]);
      setImages(imgRes.data ?? imgRes);
      setVirtualTours(vtRes.data ?? vtRes);
    } catch {
      toast.error("خطا در دریافت اطلاعات");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetch(); }, [placeId]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append("image", file);
    try {
      await adminService.uploadImage(placeId, fd);
      toast.success("تصویر آپلود شد");
      fetch();
    } catch {
      toast.error("خطا در آپلود تصویر");
    } finally {
      setUploading(false);
    }
  };

  const handleVtUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !vtTitle.trim()) return;
    setVtUploading(true);
    const fd = new FormData();
    fd.append("image", file);
    fd.append("title", vtTitle.trim());
    try {
      await adminService.uploadVirtualTour(placeId, fd);
      toast.success("تور مجازی آپلود شد");
      setVtTitle("");
      fetch();
    } catch {
      toast.error("خطا در آپلود تور مجازی");
    } finally {
      setVtUploading(false);
    }
  };

  const handleDelete = async (imageId: number) => {
    if (!confirm("حذف شود؟")) return;
    try {
      await adminService.deleteImage(placeId, imageId);
      toast.success("تصویر حذف شد");
      fetch();
    } catch {
      toast.error("خطا در حذف تصویر");
    }
  };

  const handleVtDelete = async (tourId: number) => {
    if (!confirm("حذف شود؟")) return;
    try {
      await adminService.deleteVirtualTour(placeId, tourId);
      toast.success("تور مجازی حذف شد");
      fetch();
    } catch {
      toast.error("خطا در حذف تور مجازی");
    }
  };

  const handleSetPrimary = async (imageId: number) => {
    try {
      await adminService.setPrimaryImage(placeId, imageId);
      toast.success("تصویر اصلی تنظیم شد");
      fetch();
    } catch {
      toast.error("خطا در تنظیم تصویر اصلی");
    }
  };

  return (
    <>
      <Helmet><title>مدیا {placeTitle} | ایران‌نما</title></Helmet>
      <div className="mb-6">
        <h1 className="text-3xl font-black">مدیا مکان</h1>
        <p className="text-muted-foreground">{placeTitle}</p>
      </div>

      <div className="mb-6 flex items-center gap-2 border-b">
        <Button variant={activeTab === "images" ? "default" : "ghost"} onClick={() => setActiveTab("images")}>
          <ImageIcon className="ml-2 h-4 w-4" />
          تصاویر
        </Button>
        <Button variant={activeTab === "virtual-tours" ? "default" : "ghost"} onClick={() => setActiveTab("virtual-tours")}>
          <Video className="ml-2 h-4 w-4" />
          تورهای مجازی
        </Button>
        <div className="flex-1" />
        <Button variant="ghost" onClick={() => navigate("/dashboard/places")}>
          بازگشت
        </Button>
      </div>

      {activeTab === "images" ? (
        <>
          <div className="mb-6">
            <label htmlFor="image-upload" className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed" style={{backgroundColor: uploading ? "hsl(var(--muted))" : "transparent"}}>
              <Upload className="h-4 w-4" />
              {uploading ? "در حال آپلود..." : "آپلود تصویر"}
            </label>
            <input id="image-upload" type="file" accept="image/*" className="hidden" onChange={handleUpload} disabled={uploading} />
          </div>

          {loading ? (
            <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
          ) : images.length === 0 ? (
            <div className="py-12 text-center text-muted-foreground">تصویری وجود ندارد</div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {images.map((img) => (
                <Card key={img.id}>
                  <CardContent className="p-3">
                    <img src={img.image_url ?? img.image_path} alt={img.alt_text ?? ""} className="mb-3 h-48 w-full rounded-lg object-cover" />
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
      ) : (
        <>
          <div className="mb-6 flex gap-2">
            <Input value={vtTitle} onChange={(e) => setVtTitle(e.target.value)} placeholder="عنوان تور مجازی" className="w-64" />
            <label htmlFor="vt-upload" className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed" style={{backgroundColor: vtUploading || !vtTitle.trim() ? "hsl(var(--muted))" : "transparent"}}>
              <Upload className="h-4 w-4" />
              {vtUploading ? "در حال آپلود..." : "آپلود تور"}
            </label>
            <input id="vt-upload" type="file" accept="image/*" className="hidden" onChange={handleVtUpload} disabled={vtUploading || !vtTitle.trim()} />
          </div>

          {loading ? (
            <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
          ) : virtualTours.length === 0 ? (
            <div className="py-12 text-center text-muted-foreground">تور مجازی وجود ندارد</div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {virtualTours.map((vt) => (
                <Card key={vt.id}>
                  <CardContent className="p-3">
                    <img src={vt.image_url ?? vt.image_path} alt={vt.title} className="mb-3 h-48 w-full rounded-lg object-cover" />
                    <div className="flex justify-between">
                      <span className="font-medium truncate">{vt.title}</span>
                      <Button variant="ghost" size="icon" className="text-red-500" onClick={() => handleVtDelete(vt.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default PlaceImagesPage;
