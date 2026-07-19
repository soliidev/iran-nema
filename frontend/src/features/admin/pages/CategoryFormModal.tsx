import { useState, useEffect, type FormEvent } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { adminService } from "@/services/admin.service";
import { categoryService } from "@/services/category.service";

interface CategoryFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  categoryId?: number;
  onSuccess: () => void;
}

const CategoryFormModal = ({ isOpen, onClose, categoryId, onSuccess }: CategoryFormModalProps) => {
  const [code, setCode] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("");
  const [saving, setSaving] = useState(false);
  const [isEdit, setIsEdit] = useState(!!categoryId);

  useEffect(() => {
    if (isOpen) {
      if (categoryId) {
        setIsEdit(true);
        (async () => {
          try {
            const { data: res } = await categoryService.getById(categoryId);
            const cat = res?.data?.data ?? res?.data ?? res;
            setCode(cat.code ?? "");
            setTitle(cat.title ?? "");
            setDescription(cat.description ?? "");
            setIcon(cat.icon ?? "");
          } catch (err) {
            console.error("Category getById error:", err);
            toast.error("خطا در دریافت اطلاعات دسته‌بندی");
            onClose();
          }
        })();
      } else {
        setIsEdit(false);
        setCode("");
        setTitle("");
        setDescription("");
        setIcon("");
      }
    }
  }, [isOpen, categoryId, onClose]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (isEdit) {
        await adminService.updateCategory(categoryId!, { code, title, description, icon });
        toast.success("دسته‌بندی ویرایش شد");
      } else {
        await adminService.createCategory({ code, title, description, icon });
        toast.success("دسته‌بندی ایجاد شد");
      }
      onSuccess();
      onClose();
    } catch {
      toast.error("خطا در ذخیره دسته‌بندی");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent showCloseButton={false} className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isEdit ? "ویرایش دسته‌بندی" : "دسته‌بندی جدید"}</DialogTitle>
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
            <label htmlFor="icon" className="text-sm font-medium">آیکون</label>
            <Input id="icon" value={icon} onChange={(e) => setIcon(e.target.value)} placeholder="Landmark, Trees, ..." />
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

export default CategoryFormModal;
