import Container from "@/components/layout/Container";
import StatisticCard from "./StatisticCard";
import SectionTitle from "@/components/common/SectionTitle";

const statistics = [
    {
        title: "مکان تاریخی",
        value: "150+",
    },
    {
        title: "تور مجازی",
        value: "50+",
    },
    {
        title: "شهر تحت پوشش",
        value: "31",
    },
    {
        title: "بازدید ماهانه",
        value: "10K+",
    },
];

const Statistics = () => {
    return (
        <section className="py-20">
            <Container>
                <SectionTitle
                    title="ایران‌نما در یک نگاه"
                    description="آمار پروژه و تعداد مکان‌های موجود"
                />

                <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
                    {statistics.map((item) => (
                        <StatisticCard
                            key={item.title}
                            title={item.title}
                            value={item.value}
                        />
                    ))}
                </div>
            </Container>
        </section>
    );
}

export default Statistics;