import Container from "@/components/layout/Container";

import CategoryCard from "./CategoryCard";

import { categories } from "../../data/categories";

const Categories = () => {
    return (
        <section className="py-24">

            <Container>

                <div className="mb-14 text-center">

                    <h2 className="text-4xl font-black">
                        دسته‌بندی جاذبه‌ها
                    </h2>

                    <p className="mt-3 text-muted-foreground">
                        مقصد مورد علاقه خود را انتخاب کنید.
                    </p>

                </div>

                <div
                    className="
                        grid
                        gap-8
                        sm:grid-cols-2
                        lg:grid-cols-3
                    "
                >
                    {categories.map((item) => (
                        <CategoryCard
                            key={item.id}
                            title={item.title}
                            icon={item.icon}
                        />
                    ))}
                </div>

            </Container>

        </section>
    );
}

export default Categories;