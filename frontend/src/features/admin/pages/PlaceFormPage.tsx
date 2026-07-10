import { useState, useEffect, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { toast } from "sonner";
import { adminService } from "@/services/admin.service";
import { placeService } from "@/services/place.service";
import { categoryService } from "@/services/category.service";

interface Province { id: number; name: string }
interface Category { id: number; title: string }

const PlaceFormPage = () => {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();

  const [provinces, setProvinces] = useState<Province[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryId, setCategoryId] = useState("");
  const [provinceId, setProvinceId] = useState("");
  const [code, setCode] = useState("");
  const [title, setTitle] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState("0");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const [provRes, catRes] = await Promise.all([
          import("@/services/province.service").then((m) => m.provinceService.getAll()),
          categoryService.getAll(),
        ]);
        setProvinces(provRes.data.data ?? provRes.data ?? []);
        setCategories(catRes.data.data ?? catRes.data ?? []);
      } catch {
        toast.error("خطا در دریافت اطلاعات پایه");
      }
    })();
  }, []);

  useEffect(() => {
    if (!isEdit) return;
    (async () => {
      try {
        const { data: res } = await placeService.getById(Number(id));
        const p = res.data;
        setCategoryId(String(p.category_id));
        setProvinceId(String(p.province_id));
        setCode(p.code);
        setTitle(p.title);
        setLatitude(String(p.latitude));
        setLongitude(String(p.longitude));
        setDescription(p.description ?? "");
        setRating(String(p.rating));
      } catch {
        toast.error("خطا در دریافت اطلاعات");
      } finally {
        setLoading(false);
      }
    })();
  }, [id, isEdit]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const data = {
      category_id: Number(categoryId),
      province_id: Number(provinceId),
      code, title,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      description,
      rating: parseFloat(rating),
    };
    try {
      if (isEdit) {
        await adminService.updatePlace(Number(id), data);
        toast.success("مکان ویرایش شد");
      } else {
        await adminService.createPlace(data);
        toast.success("مکان ایجاد شد");
      }
      navigate("/dashboard/places");
    } catch {
      toast.error("خطا در ذخیره مکان");
    } finally {
      setSaving(false);
    }
  };

  if (loading && isEdit) {
    return <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }

  return (
    <>
      <Helmet><title>{isEdit ? "ویرایش" : "ایجاد"} مکان | ایران‌نما</title></Helmet>
      <div className="mb-6">
        <h1 className="text-3xl font-black">{isEdit ? "ویرایش مکان" : "مکان جدید"}</h1>
      </div>

      <Card className="max-w-xl">
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">عنوان</label>
                <Input value={title} onChange={(e) => setTitle(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">کد</label>
                <Input value={code} onChange={(e) => setCode(e.target.value)} required />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">دسته‌بندی</label>
                <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm">
                  <option value="">انتخاب کنید</option>
                  {categories.map((c) => <option key={c.id} value={c.id}>{c.title}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">استان</label>
                <select value={provinceId} onChange={(e) => setProvinceId(e.target.value)} required className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm">
                  <option value="">انتخاب کنید</option>
                  {provinces.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">عرض جغرافیایی</label>
                <Input type="number" step="0.000001" value={latitude} onChange={(e) => setLatitude(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">طول جغرافیایی</label>
                <Input type="number" step="0.000001" value={longitude} onChange={(e) => setLongitude(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">امتیاز</label>
                <Input type="number" min="0" max="5" step="0.1" value={rating} onChange={(e) => setRating(e.target.value)} required />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">توضیحات</label>
              <Textarea rows={4} value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>

            <div className="flex gap-3">
              <Button type="submit" disabled={saving}>
                {saving ? "در حال ذخیره..." : isEdit ? "ویرایش" : "ایجاد"}
              </Button>
              <Button type="button" variant="outline" onClick={() => navigate("/admin/places")}>
                انصراف
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default PlaceFormPage;
