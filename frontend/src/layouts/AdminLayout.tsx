import { useState } from "react";
import { Outlet, Navigate, Link, useLocation } from "react-router-dom";
import { useAppSelector } from "@/store/hooks";
import { LayoutDashboard, MapPin, Layers, Mail, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const sidebarLinks = [
    { icon: LayoutDashboard, label: "داشبورد", href: "/dashboard" },
    { icon: Layers, label: "دسته‌بندی‌ها", href: "/dashboard/categories" },
    { icon: MapPin, label: "مکان‌ها", href: "/dashboard/places" },
    { icon: Mail, label: "پیام‌ها", href: "/dashboard/messages" },
];

const AdminLayout = () => {
    const { isAuthenticated, user } = useAppSelector((state) => state.auth);
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (!user) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <span className="text-muted-foreground">در حال بارگذاری...</span>
            </div>
        );
    }

    if (!user.is_admin) {
        return <Navigate to="/" replace />;
    }

    const sidebar = (
        <aside className="flex h-full w-64 flex-col border-l bg-card p-4">
            <div className="mb-8 px-3">
                <h2 className="text-xl font-black">پنل مدیریت</h2>
            </div>
            <nav className="flex-1 space-y-2">
                {sidebarLinks.map((link) => {
                    const Icon = link.icon;
                    const isActive = location.pathname === link.href;
                    return (
                        <Link key={link.href} to={link.href} onClick={() => setSidebarOpen(false)}>
                            <div
                                className={`flex items-center gap-3 rounded-md px-3 py-3 text-sm font-medium transition-colors ${
                                    isActive
                                        ? "bg-primary text-primary-foreground"
                                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                }`}
                            >
                                <Icon className="h-4 w-4" />
                                {link.label}
                            </div>
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );

    return (
        <div className="flex min-h-screen" dir="rtl">
            {/* Mobile overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar: fixed drawer on mobile, static on desktop */}
            <div
                style={{ right: sidebarOpen ? "0" : "-16rem" }}
                className="fixed inset-y-0 z-50 w-64 transition-all duration-300 lg:static lg:right-0 lg:z-auto"
            >
                {sidebar}
            </div>

            <main className="min-w-0 flex-1 p-4 md:p-8">
                <div className="mb-4 flex items-center gap-3 lg:hidden">
                    <Button variant="ghost" size="icon" onClick={() => setSidebarOpen((p) => !p)}>
                        {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </Button>
                    <h2 className="text-lg font-bold">پنل مدیریت</h2>
                </div>
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
