import { Outlet, Navigate, Link, useLocation, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, MapPin, Layers, LogOut } from "lucide-react";
import { logout } from "@/store/slices/authSlice";

const sidebarLinks = [
  { icon: LayoutDashboard, label: "داشبورد", href: "/dashboard" },
  { icon: Layers, label: "دسته‌بندی‌ها", href: "/dashboard/categories" },
  { icon: MapPin, label: "مکان‌ها", href: "/dashboard/places" },
];

const AdminLayout = () => {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login", { replace: true });
  };

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
          <p className="text-sm text-muted-foreground">{user.username}</p>
        </div>
        <nav className="flex-1 space-y-1">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.href || location.pathname.startsWith(link.href + "/");
            return (
              <Link key={link.href} to={link.href}>
                <Button variant={isActive ? "default" : "ghost"} className="w-full justify-start gap-3" size="sm">
                  <Icon className="h-4 w-4" />
                  {link.label}
                </Button>
              </Link>
            );
          })}
        </nav>
        <Button variant="ghost" className="justify-start gap-3 text-red-500" size="sm" onClick={handleLogout}>
          <LogOut className="h-4 w-4" />
          خروج
        </Button>
      </aside>
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
