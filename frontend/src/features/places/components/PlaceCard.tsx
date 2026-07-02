import {
    Card,
    CardContent,
} from "@/components/ui/card";
import type { Place } from "../types/place";

type Props = Place;

const PlaceCard = ({
    title,
    city,
    image,
    rating,
}: Props) => {
    return (
        <Card className="group overflow-hidden rounded-2xl transition hover:-translate-y-2 hover:shadow-xl">

            <div className="overflow-hidden">

                <img
                    src={image}
                    alt={title}
                    className="h-64 w-full object-cover transition duration-500 group-hover:scale-110"
                />

            </div>

            <CardContent className="space-y-3 p-5">

                <h3 className="text-xl font-bold">
                    {title}
                </h3>

                <p className="text-muted-foreground">
                    {city}
                </p>

                <span className="text-primary">
                    ⭐ {rating}
                </span>

            </CardContent>

        </Card>
    );
}

export default PlaceCard;