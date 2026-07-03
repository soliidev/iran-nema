import Container from "@/components/layout/Container";
import { Breadcrumb } from "@/components/common";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Helmet } from "react-helmet-async";
import { Heart, MapPin, Clock, Settings } from "lucide-react";
import { Link } from "react-router-dom";

const links = [
  { icon: Heart, label: "علاقه‌مندی‌ها", href: "/dashboard/favorites", color: "text-red-500" },
  { icon: Clock, label: "بازدیدهای اخیر", href: "/dashboard/history", color: "text-blue-500" },
  { icon: MapPin, label: "مکان‌های من", href: "/dashboard/my-places", color: "text-green-500" },
  { icon: Settings, label: "تنظیمات", href: "/dashboard/settings", color: "text-orange-500" },
];

const DashboardPage = () => {
  return (
    <>
      <Helmet><title>داشبورد | ایران‌نما</title></Helmet>
      <section className="py-8">
        <Container>
          <Breadcrumb />
          <div className="mt-8">
            <h1 className="text-4xl font-black">داشبورد</h1>
            <p className="mt-2 text-muted-foreground">به پنل کاربری خود خوش آمدید</p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <Link key={link.href} to={link.href}>
                  <Card className="transition hover:-translate-y-1 hover:shadow-lg">
                    <CardHeader>
                      <Icon className={`h-10 w-10 ${link.color}`} />
                    </CardHeader>
                    <CardContent>
                      <CardTitle className="text-lg">{link.label}</CardTitle>
                    </CardContent>
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

export default DashboardPage;
