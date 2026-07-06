import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { toast } from "sonner";
import { adminService } from "@/services/admin.service";
import { categoryService } from "@/services/category.service";

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
  const navigate = useNavigate();

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

  return (
    <>
      <Helmet><title>مدیریت دسته‌بندی‌ها | ایران‌نما</title></Helmet>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black">دسته‌بندی‌ها</h1>
          <p className="text-muted-foreground">مدیریت دسته‌بندی‌های جاذبه‌ها</p>
        </div>
        <Button onClick={() => navigate("/admin/categories/new")}>
          <Plus className="ml-2 h-4 w-4" />
          دسته‌بندی جدید
        </Button>
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
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>کد</TableHead>
                  <TableHead>عنوان</TableHead>
                  <TableHead>آیکون</TableHead>
                  <TableHead>مکان‌ها</TableHead>
                  <TableHead className="w-24">عملیات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.map((cat) => (
                  <TableRow key={cat.id}>
                    <TableCell dir="ltr" className="font-mono">{cat.code}</TableCell>
                    <TableCell>{cat.title}</TableCell>
                    <TableCell>{cat.icon}</TableCell>
                    <TableCell>{cat.places_count ?? 0}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" onClick={() => navigate(`/admin/categories/${cat.id}/edit`)}>
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
    </>
  );
};

export default CategoriesListPage;
