import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {Button} from "@/components/ui/button";
import {Card, CardContent} from "@/components/ui/card";
import {Table, TableHeader, TableRow, TableHead, TableBody, TableCell} from "@/components/ui/table";
import {Plus, Pencil, Trash2, Loader2, ArrowLeft} from "lucide-react";
import {Helmet} from "react-helmet-async";
import {toast} from "sonner";
import {adminService} from "@/services/admin.service";
import {placeService} from "@/services/place.service";
import ConfirmDialog from "@/components/ui/confirm-dialog";
import PlaceFormModal from "./PlaceFormModal";

interface Place {
    id: number;
    code: string;
    title: string;
    category?: { title: string };
    province?: { name: string };
    rating: number;
}

const PlacesListPage = () => {
    const navigate = useNavigate();
    const [places, setPlaces] = useState<Place[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPlaceId, setEditingPlaceId] = useState<number | null>(null);
    const [deleteId, setDeleteId] = useState<number | null>(null);

    const fetch = async () => {
        setLoading(true);
        try {
            const {data: res} = await placeService.getAll({per_page: 100});
            setPlaces(res.data ?? res);
        } catch {
            toast.error("خطا در دریافت مکان‌ها");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetch();
    }, []);

    const handleDelete = async () => {
        if (!deleteId) return;
        try {
            await adminService.deletePlace(deleteId);
            toast.success("مکان حذف شد");
            setDeleteId(null);
            fetch();
        } catch {
            toast.error("خطا در حذف مکان");
        }
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setEditingPlaceId(null);
    };

    const handleModalSuccess = () => {
        fetch();
    };

    return (
        <>
            <Helmet><title>مدیریت مکان‌ها | ایران‌نما</title></Helmet>
            <div className="mb-6 flex flex-row-reverse items-center justify-between">
                <div className="flex items-center gap-2">
                    <Button variant="outline" onClick={() => navigate(-1)}>
                        بازگشت
                        <ArrowLeft className="ml-2 h-4 w-4" />
                    </Button>
                </div>
                <div>
                    <h1 className="text-3xl font-black">مکان‌ها</h1>
                    <p className="text-muted-foreground">مدیریت جاذبه‌های گردشگری</p>
                </div>
            </div>

            <Button onClick={() => setIsModalOpen(true)}>
                <Plus className="ml-2 h-4 w-4" />
                مکان جدید
            </Button>

            <Card className="py-0! mt-5">
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
                        <Table dir="rtl" className="border border-border">
                            <TableHeader className="bg-muted/50">
                                <TableRow>
                                    <TableHead className="border border-border w-12 text-center">ردیف</TableHead>
                                    <TableHead className="border border-border text-right">کد</TableHead>
                                    <TableHead className="border border-border text-right">عنوان</TableHead>
                                    <TableHead className="border border-border text-right">دسته‌بندی</TableHead>
                                    <TableHead className="border border-border text-right">استان</TableHead>
                                    <TableHead className="border border-border text-right">امتیاز</TableHead>
                                    <TableHead className="border border-border w-24 text-right">عملیات</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {places.map((p, index) => (
                                    <TableRow key={p.id}>
                                        <TableCell className="border border-border text-center">{index + 1}</TableCell>
                                        <TableCell className="border border-border font-mono text-right"
                                                   dir="ltr">{p.code}</TableCell>
                                        <TableCell className="border border-border text-right">{p.title}</TableCell>
                                        <TableCell
                                            className="border border-border text-right">{p.category?.title ?? "-"}</TableCell>
                                        <TableCell
                                            className="border border-border text-right">{p.province?.name ?? "-"}</TableCell>
                                        <TableCell className="border border-border text-right">{p.rating}</TableCell>
                                        <TableCell className="border border-border">
                                            <div className="flex gap-2 justify-end">
                                                <Button variant="ghost" size="icon" onClick={() => {
                                                    setEditingPlaceId(p.id);
                                                    setIsModalOpen(true);
                                                }}>
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="text-red-500"
                                                        onClick={() => setDeleteId(p.id)}>
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

            <PlaceFormModal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                placeId={editingPlaceId ?? undefined}
                onSuccess={handleModalSuccess}
            />

            <ConfirmDialog
                isOpen={deleteId !== null}
                onClose={() => setDeleteId(null)}
                onConfirm={handleDelete}
                title="حذف مکان"
                description="آیا از حذف این مکان مطمئن هستید؟ این عمل قابل بازگشت نیست."
                confirmText="حذف"
                cancelText="انصراف"
                variant="danger"
            />
        </>
    );
};

export default PlacesListPage;