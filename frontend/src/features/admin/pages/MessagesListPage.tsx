import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Mail, Trash2, Loader2, ArrowLeft, Search, X } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { toast } from "sonner";
import { adminService } from "@/services/admin.service";
import { Input } from "@/components/ui/input";
import ConfirmDialog from "@/components/ui/confirm-dialog";

interface Message {
    id: number;
    name: string;
    email: string;
    subject: string;
    message: string;
    created_at: string;
}

const MessagesListPage = () => {
    const navigate = useNavigate();
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [search, setSearch] = useState("");
    const [detailMessage, setDetailMessage] = useState<Message | null>(null);

    const fetchMessages = async () => {
        setLoading(true);
        try {
            const res = await adminService.getMessages({ per_page: 50, ...(search ? { search } : {}) });
            setMessages(res.data ?? []);
        } catch {
            toast.error("خطا در دریافت پیام‌ها");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    const handleDelete = async () => {
        if (!deleteId) return;
        try {
            await adminService.deleteMessage(deleteId);
            toast.success("پیام حذف شد");
            setDeleteId(null);
            fetchMessages();
        } catch {
            toast.error("خطا در حذف پیام");
        }
    };

    const handleSearch = () => {
        fetchMessages();
    };

    return (
        <>
            <Helmet><title>مدیریت پیام‌ها | ایران‌نما</title></Helmet>
            <div className="mb-6 flex flex-row-reverse items-center justify-between">
                <div className="flex items-center gap-2">
                    <Button variant="outline" onClick={() => navigate("/")}>
                        بازگشت به خانه
                        <ArrowLeft className="ml-2 h-4 w-4" />
                    </Button>
                </div>
                <div>
                    <h1 className="text-3xl font-black">پیام‌ها</h1>
                    <p className="text-muted-foreground">مدیریت پیام‌های دریافتی</p>
                </div>
            </div>

            <div className="mb-5 flex items-center gap-2">
                <div className="relative flex-1">
                    <Search className="absolute right-5 inset-y-0 my-auto h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="جستجو در نام، ایمیل یا موضوع..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                        className="pr-12"
                    />
                </div>
                <Button variant="outline" onClick={handleSearch}>جستجو</Button>
            </div>

            <Card className="py-0!">
                <CardContent className="p-0">
                    {loading ? (
                        <div className="flex justify-center py-12">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        </div>
                    ) : messages.length === 0 ? (
                        <div className="py-12 text-center text-muted-foreground">
                            هیچ پیامی وجود ندارد
                        </div>
                    ) : (
                        <div className="w-full max-w-full overflow-x-auto">
                            <Table dir="rtl" className="border border-border min-w-[700px]">
                                <TableHeader className="bg-muted/50">
                                    <TableRow>
                                        <TableHead className="border border-border w-12 text-center">ردیف</TableHead>
                                        <TableHead className="border border-border text-right">نام</TableHead>
                                        <TableHead className="border border-border text-right">ایمیل</TableHead>
                                        <TableHead className="border border-border text-right">موضوع</TableHead>
                                        <TableHead className="border border-border text-right">تاریخ</TableHead>
                                        <TableHead className="border border-border w-24 text-right">عملیات</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {messages.map((msg, index) => (
                                        <TableRow key={msg.id}>
                                            <TableCell className="border border-border text-center">{index + 1}</TableCell>
                                            <TableCell className="border border-border text-right">{msg.name}</TableCell>
                                            <TableCell className="border border-border text-right" dir="ltr">{msg.email}</TableCell>
                                            <TableCell className="border border-border text-right">{msg.subject}</TableCell>
                                            <TableCell className="border border-border text-right" dir="ltr">{new Date(msg.created_at).toLocaleDateString("fa-IR")}</TableCell>
                                            <TableCell className="border border-border">
                                                <div className="flex items-center gap-2 justify-end">
                                                    <Button variant="ghost" size="icon" onClick={() => setDetailMessage(msg)}>
                                                        <Mail className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="icon" className="text-red-500" onClick={() => setDeleteId(msg.id)}>
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </CardContent>
            </Card>

            {detailMessage && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setDetailMessage(null)}>
                    <div className="mx-4 w-full max-w-lg rounded-2xl border bg-card p-6 shadow-lg" onClick={(e) => e.stopPropagation()}>
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="text-xl font-bold">{detailMessage.subject}</h3>
                            <Button variant="ghost" size="icon" onClick={() => setDetailMessage(null)} className="h-10 w-10">
                                                        <X className="h-6 w-6" />
                                                    </Button>
                        </div>
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">نام:</span>
                                <span className="font-medium">{detailMessage.name}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">ایمیل:</span>
                                <span className="font-medium" dir="ltr">{detailMessage.email}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">تاریخ:</span>
                                <span className="font-medium" dir="ltr">{new Date(detailMessage.created_at).toLocaleDateString("fa-IR")}</span>
                            </div>
                            <hr />
                            <p className="leading-7 whitespace-pre-wrap">{detailMessage.message}</p>
                        </div>
                    </div>
                </div>
            )}

            <ConfirmDialog
                isOpen={deleteId !== null}
                onClose={() => setDeleteId(null)}
                onConfirm={handleDelete}
                title="حذف پیام"
                description="آیا از حذف این پیام مطمئن هستید؟"
                confirmText="حذف"
                cancelText="انصراف"
                variant="danger"
            />
        </>
    );
};

export default MessagesListPage;
