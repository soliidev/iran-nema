import { useState, useEffect, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { toast } from "sonner";
import { adminService } from "@/services/admin.service";
import { categoryService } from "@/services/category.service";

const CategoryFormPage = () => {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();

  const [code, setCode] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("");
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isEdit) return;
    (async () => {
      try {
        const { data: res } = await categoryService.getById(Number(id));
        const cat = res.data ?? res;
        setCode(cat.code);
        setTitle(cat.title);
        setDescription(cat.description ?? "");
        setIcon(cat.icon ?? "");
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
    try {
      if (isEdit) {
        await adminService.updateCategory(Number(id), { code, title, description, icon });
        toast.success("دسته‌بندی ویرایش شد");
      } else {
        await adminService.createCategory({ code, title, description, icon });
        toast.success("دسته‌بندی ایجاد شد");
      }
      navigate("/dashboard/categories");
    } catch {
      toast.error("خطا در ذخیره دسته‌بندی");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }

  return (
    <>
      <Helmet><title>{isEdit ? "ویرایش" : "ایجاد"} دسته‌بندی | ایران‌نما</title></Helmet>
      <div className="mb-6">
        <h1 className="text-3xl font-black">{isEdit ? "ویرایش دسته‌بندی" : "دسته‌بندی جدید"}</h1>
      </div>

      <Card className="max-w-lg">
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium">کد</label>
              <Input value={code} onChange={(e) => setCode(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">عنوان</label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">توضیحات</label>
              <Textarea value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">آیکون</label>
              <Input value={icon} onChange={(e) => setIcon(e.target.value)} placeholder="Landmark, Trees, ..." />
            </div>
            <div className="flex gap-3">
              <Button type="submit" disabled={saving}>
                {saving ? "در حال ذخیره..." : isEdit ? "ویرایش" : "ایجاد"}
              </Button>
              <Button type="button" variant="outline" onClick={() => navigate("/admin/categories")}>
                انصراف
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default CategoryFormPage;
