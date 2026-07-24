import Container from "@/components/layout/Container";
import CategoryCard from "./CategoryCard";
import {useCategories} from "@/features/home/hooks/useCategories";
import {Landmark, Trees, Building2, Mountain, Waves, Church} from "lucide-react";
import type {ElementType} from "react";
import {SectionTitle} from "@/components/common";

const iconMap: Record<string, ElementType> = {
    Landmark, Trees, Building2, Mountain, Waves, Church,
};

const Categories = () => {
    const {data: apiCategories = [], isLoading} = useCategories();

    if (isLoading) return null;
    if (apiCategories.length === 0) return null;

    const items = apiCategories.map((cat: { id: number; title: string; icon?: string }) => ({
        id: cat.id,
        title: cat.title,
        icon: iconMap[cat.icon as string] || Landmark,
    }));

    return (
        <section>
            <Container>
                <div className="mb-14 text-center">
                    <SectionTitle
                        title={'دسته‌بندی جاذبه‌ها'}
                        description={'مقصد مورد علاقه خود را انتخاب کنید.'}
                    />
                </div>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((item: { id: number; title: string; icon: ElementType }) => (
                        <CategoryCard key={item.id} title={item.title} icon={item.icon} />
                    ))}
                </div>
            </Container>
        </section>
    );
};

export default Categories;
