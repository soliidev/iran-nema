import Container from "@/components/layout/Container";
import SectionTitle from "@/components/common/SectionTitle";
import { usePlaceStatistics } from "@/features/places/hooks/usePlacesQuery";
import { Landmark, Users, Award, Target } from "lucide-react";
import { useMemo } from "react";

const labels = [
  "جاذبه گردشگری",
  "بازدیدکنندگان",
  "استان تحت پوشش",
  "دسته‌بندی",
];

const Statistics = () => {
  const { data: apiStats, isLoading } = usePlaceStatistics();

  const items = useMemo(() => {
    if (!apiStats) return null;
    return [
      { icon: Landmark, value: `${apiStats.total_places ?? 0}+`, label: labels[0] },
      { icon: Users, value: "۱۰K+", label: labels[1] },
      { icon: Award, value: `${apiStats.provinces_count ?? 0}`, label: labels[2] },
      { icon: Target, value: `${apiStats.categories_count ?? 0}`, label: labels[3] },
    ];
  }, [apiStats]);

  if (isLoading) return null;
  if (!items) return null;

  return (
    <section>
      <Container>
        <SectionTitle
          title="ایران‌نما در یک نگاه"
          description="آمار پروژه و تعداد مکان‌های موجود"
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="flex flex-col items-center rounded-xl border p-6 text-center">
                <Icon className="h-8 w-8 text-primary" />
                <h3 className="mt-3 text-2xl font-bold">{item.value}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.label}</p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export default Statistics;
