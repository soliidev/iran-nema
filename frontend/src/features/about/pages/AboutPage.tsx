import Container from "@/components/layout/Container";
import { Breadcrumb } from "@/components/common";
import { Helmet } from "react-helmet-async";
import { usePlaceStatistics } from "@/features/places/hooks/usePlacesQuery";
import { Landmark, Users, Award, Target } from "lucide-react";

const statItems = [
  { icon: Landmark, label: "جاذبه گردشگری", key: "total_places" as const },
  { icon: Users, value: "۱۰K+", label: "بازدیدکنندگان", key: null as const },
  { icon: Award, label: "استان تحت پوشش", key: "provinces_count" as const },
  { icon: Target, label: "دسته‌بندی", key: "categories_count" as const },
];

const AboutPage = () => {
  const { data: apiStats } = usePlaceStatistics();

  return (
    <>
      <Helmet>
        <title>درباره ما | ایران‌نما</title>
      </Helmet>
      <section className="py-8">
        <Container>
          <Breadcrumb />
          <div className="mt-8 grid gap-16 lg:grid-cols-2">
            <div>
              <h1 className="text-5xl font-black leading-tight">
                درباره <span className="text-primary">ایران‌نما</span>
              </h1>
              <p className="mt-6 leading-8 text-muted-foreground">
                ایران‌نما یک پلتفرم گردشگری مجازی است که با هدف معرفی جاذبه‌های تاریخی، طبیعی و فرهنگی ایران
                طراحی شده است. ما با استفاده از فناوری تصاویر ۳۶۰ درجه و تور مجازی، تجربه‌ای متفاوت از
                بازدید اماکن گردشگری را برای شما فراهم می‌کنیم.
              </p>
              <p className="mt-4 leading-8 text-muted-foreground">
                هدف ما این است که هر فردی در هر نقطه از جهان بتواند از زیبایی‌های ایران بازدید کند و با
                فرهنگ و تاریخ غنی این سرزمین آشنا شود.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {statItems.map((stat) => {
                const Icon = stat.icon;
                const val = stat.key ? `${apiStats?.[stat.key] ?? 0}` : stat.value;
                return (
                  <div key={stat.label} className="flex flex-col items-center rounded-2xl border bg-card p-8 text-center transition hover:border-primary">
                    <div className="flex items-center justify-center">
                      <Icon className="h-10 w-10 text-primary" />
                    </div>
                    <h3 className="mt-4 text-3xl font-black">{val}</h3>
                    <p className="mt-1 text-muted-foreground">{stat.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default AboutPage;
