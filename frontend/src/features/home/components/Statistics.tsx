import Container from "@/components/layout/Container";
import SectionTitle from "@/components/common/SectionTitle";
import { stats } from "@/data/stats";

const Statistics = () => {
    return (
        <section className="py-20">
            <Container>
                <SectionTitle
                    title="ایران‌نما در یک نگاه"
                    description="آمار پروژه و تعداد مکان‌های موجود"
                />

                <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
                    {stats.map((item) => {
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