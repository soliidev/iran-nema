import { Link } from "react-router-dom";

type Props = {
    title: string;
    icon: React.ElementType;
};

const CategoryCard = ({
    title,
    icon: Icon,
}: Props) => {
    return (
        <Link
            to={`/places?category=${encodeURIComponent(title)}`}
            className="
                group
                block
                rounded-2xl
                border
                bg-card
                p-8
                text-center
                transition-all
                duration-300
                hover:-translate-y-2
                hover:border-primary
                hover:shadow-xl
            "
        >
            <Icon
                className="
                    mx-auto
                    h-12
                    w-12
                    text-primary
                    transition-transform
                    duration-300
                    group-hover:scale-110
                "
            />

            <h3 className="mt-5 text-lg font-bold">
                {title}
            </h3>
        </Link>
    );
}

export default CategoryCard;
