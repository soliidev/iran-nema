import {Outlet, Navigate, Link, useLocation} from "react-router-dom";
import {useAppSelector} from "@/store/hooks";
import {LayoutDashboard, MapPin, Layers} from "lucide-react";

const sidebarLinks = [
    {icon: LayoutDashboard, label: "داشبورد", href: "/dashboard"},
    {icon: Layers, label: "دسته‌بندی‌ها", href: "/dashboard/categories"},
    {icon: MapPin, label: "مکان‌ها", href: "/dashboard/places"},
];

const AdminLayout = () => {
    const {isAuthenticated, user} = useAppSelector((state) => state.auth);
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (!user?.is_admin) {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="flex min-h-screen" dir="rtl">
            <aside className="flex w-64 flex-col border-l bg-card p-4">
                <div className="mb-8 px-3">
                    <h2 className="text-xl font-black">پنل مدیریت</h2>
                </div>
                <nav className="flex-1 space-y-2">
                    {sidebarLinks.map((link) => {
                        const Icon = link.icon;
                        const isActive = location.pathname === link.href;
                        return (
                            <Link key={link.href} to={link.href}>
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
            <main className="flex-1 p-8">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
