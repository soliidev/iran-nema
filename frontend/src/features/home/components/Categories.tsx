import Container from "@/components/layout/Container";
import SectionTitle from "@/components/common/SectionTitle";
import CategoryCard from "./CategoryCard";
import {
    Landmark,
    Trees,
    Building2,
    Mountain,
    Church,
    Map,
} from "lucide-react";

const categories = [
    {
        title: "آثار تاریخی",
        icon: Landmark,
    },
    {
        title: "طبیعت",
        icon: Trees,
    },
    {
        title: "موزه‌ها",
        icon: Building2,
    },
    {
        title: "کوهستان",
        icon: Mountain,
    },
    {
        title: "اماکن مذهبی",
        icon: Church,
    },
    {
        title: "شهرها",
        icon: Map,
    },
];

const Categories = () => {
    return (
        <section className="py-20">
            <Container>

                <SectionTitle
                    title="دسته بندی مکان‌ها"
                    description="مکان مورد نظر خود را راحت‌تر پیدا کنید."
                />

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

                    {categories.map((category) => (
                        <CategoryCard
                            key={category.title}
                            title={category.title}
                            icon={category.icon}
                        />
                    ))}

                </div>

            </Container>
        </section>
    );
}

export default Categories;