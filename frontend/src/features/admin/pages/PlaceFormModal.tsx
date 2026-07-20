import { useState, useEffect, type FormEvent } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { adminService } from "@/services/admin.service";
import { placeService } from "@/services/place.service";
import { categoryService } from "@/services/category.service";
import { provinceService } from "@/services/province.service";
import StarRating from "@/components/common/StarRating";

interface Category {
  id: number;
  title: string;
}

interface Province {
  id: number;
  name: string;
}

interface PlaceFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  placeId?: number;
  onSuccess: () => void;
}

const PlaceFormModal = ({ isOpen, onClose, placeId, onSuccess }: PlaceFormModalProps) => {
  const [code, setCode] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [provinceId, setProvinceId] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [rating, setRating] = useState(0);
  const [saving, setSaving] = useState(false);
  const isEdit = !!placeId;
  const [categories, setCategories] = useState<Category[]>([]);
  const [provinces, setProvinces] = useState<Province[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catsRes, provsRes] = await Promise.all([
          categoryService.getAll(),
          provinceService.getAll(),
        ]);
        setCategories(catsRes.data.data ?? catsRes.data);
        setProvinces(provsRes.data.data ?? provsRes.data);
      } catch {
        toast.error("خطا در دریافت داده‌های اولیه");
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (isOpen) {
      if (placeId) {
        (async () => {
          try {
            const { data: res } = await placeService.getById(placeId);
            const place = res.data;
            setCode(place.code);
            setTitle(place.title);
            setDescription(place.description ?? "");
            setCategoryId(place.category_id?.toString() ?? "");
            setProvinceId(place.province_id?.toString() ?? "");
            setLatitude(place.latitude?.toString() ?? "");
            setLongitude(place.longitude?.toString() ?? "");
            setRating(place.rating ?? 0);
          } catch {
            toast.error("خطا در دریافت اطلاعات");
            onClose();
          }
        })();
      } else {
        setCode("");
        setTitle("");
        setDescription("");
        setCategoryId("");
        setProvinceId("");
        setLatitude("");
        setLongitude("");
        setRating(0);
      }
    }
  }, [isOpen, placeId, onClose]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        code,
        title,
        description,
        category_id: Number(categoryId),
        province_id: Number(provinceId),
        latitude: Number(latitude),
        longitude: Number(longitude),
        rating: Number(rating),
      };
      if (isEdit) {
        await adminService.updatePlace(placeId!, payload);
        toast.success("مکان ویرایش شد");
      } else {
        await adminService.createPlace(payload);
        toast.success("مکان ایجاد شد");
      }
      onSuccess();
      onClose();
    } catch {
      toast.error("خطا در ذخیره مکان");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent showCloseButton={false} className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isEdit ? "ویرایش مکان" : "مکان جدید"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="code" className="text-sm font-medium">کد</label>
            <Input id="code" value={code} onChange={(e) => setCode(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">عنوان</label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">توضیحات</label>
            <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} />
          </div>
          <div className="space-y-2">
            <label htmlFor="category_id" className="text-sm font-medium">دسته‌بندی</label>
            <select
              id="category_id"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              required
            >
              <option value="">انتخاب دسته‌بندی</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id.toString()}>{cat.title}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label htmlFor="province_id" className="text-sm font-medium">استان</label>
            <select
              id="province_id"
              value={provinceId}
              onChange={(e) => setProvinceId(e.target.value)}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              required
            >
              <option value="">انتخاب استان</option>
              {provinces.map((prov) => (
                <option key={prov.id} value={prov.id.toString()}>{prov.name}</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="latitude" className="text-sm font-medium">عرض جغرافیایی</label>
              <Input id="latitude" type="number" step="any" value={latitude} onChange={(e) => setLatitude(e.target.value)} placeholder="مثال: 35.6892" required />
            </div>
            <div className="space-y-2">
              <label htmlFor="longitude" className="text-sm font-medium">طول جغرافیایی</label>
              <Input id="longitude" type="number" step="any" value={longitude} onChange={(e) => setLongitude(e.target.value)} placeholder="مثال: 51.3890" required />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="rating" className="text-sm font-medium">امتیاز</label>
            <div className="flex items-center justify-center gap-3">
              <StarRating value={rating} onChange={setRating} />
            </div>
          </div>
          <DialogFooter>
            <div className="flex gap-2 w-full justify-end">
              <Button type="submit" disabled={saving}>
                {saving ? "در حال ذخیره..." : isEdit ? "ویرایش" : "ایجاد"}
              </Button>
              <Button type="button" variant="outline" onClick={onClose} disabled={saving}>
                انصراف
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PlaceFormModal;