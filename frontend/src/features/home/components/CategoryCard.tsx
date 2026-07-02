import type { LucideIcon } from "lucide-react";

type Props = {
    title: string;
    icon: LucideIcon;
};

const CategoryCard = ({
    title,
    icon: Icon,
}: Props) => {
    return (
        <div className="rounded-xl border p-8 transition hover:shadow-lg cursor-pointer">

            <Icon className="mb-4 size-8 text-primary" />

            <h3 className="font-semibold">
                {title}
            </h3>

        </div>
    );
}

export default CategoryCard;