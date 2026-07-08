import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { toast } from "sonner";
import { adminService } from "@/services/admin.service";
import { categoryService } from "@/services/category.service";
import CategoryFormModal from "./CategoryFormModal";

interface Category {
  id: number;
  code: string;
  title: string;
  icon?: string;
  places_count?: number;
}

const CategoriesListPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState<number | null>(null);

  const fetch = async () => {
    setLoading(true);
    try {
      const { data: res } = await categoryService.getAll();
      setCategories(res.data ?? res);
    } catch {
      toast.error("خطا در دریافت دسته‌بندی‌ها");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetch(); }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("آیا از حذف این دسته‌بندی مطمئن هستید؟")) return;
    try {
      await adminService.deleteCategory(id);
      toast.success("دسته‌بندی حذف شد");
      fetch();
    } catch {
      toast.error("خطا در حذف دسته‌بندی");
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingCategoryId(null);
  };

  const handleModalSuccess = () => {
    fetch();
  };

  return (
    <>
      <Helmet><title>مدیریت دسته‌بندی‌ها | ایران‌نما</title></Helmet>
      <div className="mb-6 flex flex-row-reverse items-center justify-between">
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="ml-2 h-4 w-4" />
          دسته‌بندی جدید
        </Button>
        <div>
          <h1 className="text-3xl font-black">دسته‌بندی‌ها</h1>
          <p className="text-muted-foreground">مدیریت دسته‌بندی‌های جاذبه‌ها</p>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : categories.length === 0 ? (
            <div className="py-12 text-center text-muted-foreground">
              هیچ دسته‌بندی‌ای وجود ندارد
            </div>
          ) : (
            <Table dir="rtl" className="border border-border">
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead className="border border-border text-right">کد</TableHead>
                  <TableHead className="border border-border text-right">عنوان</TableHead>
                  <TableHead className="border border-border text-right">آیکون</TableHead>
                  <TableHead className="border border-border text-right">مکان‌ها</TableHead>
                  <TableHead className="border border-border w-24">عملیات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.map((cat) => (
                  <TableRow key={cat.id} dir="rtl">
                    <TableCell className="border border-border font-mono text-right" dir="ltr">{cat.code}</TableCell>
                    <TableCell className="border border-border text-right">{cat.title}</TableCell>
                    <TableCell className="border border-border text-right">{cat.icon}</TableCell>
                    <TableCell className="border border-border text-right">{cat.places_count ?? 0}</TableCell>
                    <TableCell className="border border-border">
                      <div className="flex gap-2 justify-end">
                        <Button variant="ghost" size="icon" onClick={() => { setEditingCategoryId(cat.id); setIsModalOpen(true); } }>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-red-500" onClick={() => handleDelete(cat.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <CategoryFormModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        categoryId={editingCategoryId ?? undefined}
        onSuccess={handleModalSuccess}
      />
    </>
  );
};

export default CategoriesListPage;
