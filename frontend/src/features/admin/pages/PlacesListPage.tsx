import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Plus, Pencil, Trash2, Loader2, Image } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { toast } from "sonner";
import { adminService } from "@/services/admin.service";
import { placeService } from "@/services/place.service";

interface Place {
  id: number;
  code: string;
  title: string;
  category?: { title: string };
  province?: { name: string };
  rating: number;
}

const PlacesListPage = () => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetch = async () => {
    setLoading(true);
    try {
      const { data: res } = await placeService.getAll({ per_page: 100 });
      setPlaces(res.data ?? res);
    } catch {
      toast.error("خطا در دریافت مکان‌ها");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetch(); }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("آیا از حذف این مکان مطمئن هستید؟")) return;
    try {
      await adminService.deletePlace(id);
      toast.success("مکان حذف شد");
      fetch();
    } catch {
      toast.error("خطا در حذف مکان");
    }
  };

  return (
    <>
      <Helmet><title>مدیریت مکان‌ها | ایران‌نما</title></Helmet>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black">مکان‌ها</h1>
          <p className="text-muted-foreground">مدیریت جاذبه‌های گردشگری</p>
        </div>
        <Button onClick={() => navigate("/admin/places/new")}>
          <Plus className="ml-2 h-4 w-4" />
          مکان جدید
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : places.length === 0 ? (
            <div className="py-12 text-center text-muted-foreground">
              هیچ مکانی وجود ندارد
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>کد</TableHead>
                  <TableHead>عنوان</TableHead>
                  <TableHead>دسته‌بندی</TableHead>
                  <TableHead>استان</TableHead>
                  <TableHead>امتیاز</TableHead>
                  <TableHead className="w-36">عملیات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {places.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell dir="ltr" className="font-mono">{p.code}</TableCell>
                    <TableCell>{p.title}</TableCell>
                    <TableCell>{p.category?.title ?? "-"}</TableCell>
                    <TableCell>{p.province?.name ?? "-"}</TableCell>
                    <TableCell>{p.rating}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" onClick={() => navigate(`/admin/places/${p.id}/edit`)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => navigate(`/admin/places/${p.id}/images`)}>
                          <Image className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-red-500" onClick={() => handleDelete(p.id)}>
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

export default PlacesListPage;
