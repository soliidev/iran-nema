import { usePlaceStatistics } from "@/features/places/hooks/usePlacesQuery";
import { Landmark, Users, Award, Target } from "lucide-react";

const items = [
  { icon: Landmark, label: "جاذبه گردشگری", key: "total_places" as const },
  { icon: Users, value: "۱۰K+", label: "بازدیدکنندگان", key: null as const },
  { icon: Award, label: "استان تحت پوشش", key: "provinces_count" as const },
  { icon: Target, label: "دسته‌بندی", key: "categories_count" as const },
];

const HeroStats = () => {
  const { data: apiStats } = usePlaceStatistics();

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => {
        const Icon = item.icon;
        const val = item.key
          ? `${apiStats?.[item.key] ?? 0}`
          : item.value;
        return (
          <div
            key={item.label}
            className="rounded-2xl border bg-card/70 p-6 backdrop-blur transition-all hover:-translate-y-1 hover:border-primary hover:shadow-lg"
          >
            <Icon className="mb-4 h-10 w-full text-primary" />
            <h3 className="text-3xl font-black">{val}</h3>
            <p className="mt-2 text-muted-foreground">{item.label}</p>
          </div>
        );
      })}
    </div>
  );
};

export default HeroStats;
