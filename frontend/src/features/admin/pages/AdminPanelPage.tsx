import Container from "@/components/layout/Container";
import { Breadcrumb } from "@/components/common";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Helmet } from "react-helmet-async";
import { Users, MapPin, Layers, Image, BarChart3, Settings } from "lucide-react";
import { Link } from "react-router-dom";

const sections = [
  { icon: Users, label: "مدیریت کاربران", href: "/admin/users", desc: "مدیریت کاربران سیستم", color: "text-blue-500" },
  { icon: MapPin, label: "مدیریت مکان‌ها", href: "/admin/places", desc: "افزودن و ویرایش مکان‌ها", color: "text-green-500" },
  { icon: Layers, label: "دسته‌بندی‌ها", href: "/admin/categories", desc: "مدیریت دسته‌بندی‌ها", color: "text-purple-500" },
  { icon: Image, label: "گالری تصاویر", href: "/admin/gallery", desc: "مدیریت تصاویر", color: "text-pink-500" },
  { icon: BarChart3, label: "آمار", href: "/admin/statistics", desc: "گزارشات و آمار", color: "text-orange-500" },
  { icon: Settings, label: "تنظیمات", href: "/admin/settings", desc: "تنظیمات سایت", color: "text-gray-500" },
];

const AdminPanelPage = () => {
  return (
    <>
      <Helmet><title>پنل مدیریت | ایران‌نما</title></Helmet>
      <section className="py-8">
        <Container>
          <Breadcrumb />
          <div className="mt-8">
            <h1 className="text-4xl font-black">پنل مدیریت</h1>
            <p className="mt-2 text-muted-foreground">مدیریت محتوای سایت ایران‌نما</p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <Link key={section.href} to={section.href}>
                  <Card className="transition hover:-translate-y-1 hover:shadow-lg">
                    <CardHeader className="flex flex-row items-center gap-4">
                      <Icon className={`h-10 w-10 ${section.color}`} />
                      <div>
                        <CardTitle className="text-lg">{section.label}</CardTitle>
                        <p className="text-sm text-muted-foreground">{section.desc}</p>
                      </div>
                    </CardHeader>
                  </Card>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>
    </>
  );
};

export default AdminPanelPage;
