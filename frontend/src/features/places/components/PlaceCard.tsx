import {
    Card,
    CardContent,
} from "@/components/ui/card";
import type { Place } from "../types/place";
import { Link } from "react-router-dom";
import { useState } from "react";

type Props = Place;

const PlaceCard = ({
    title,
    city,
    image,
    rating,
    id
}: Props) => {
    const [imgError, setImgError] = useState(false);

    return (
        <Link to={`/places/${id}`}>
            <Card className="group overflow-hidden rounded-2xl transition hover:-translate-y-2 hover:shadow-xl">

                <div className="overflow-hidden">
                    {imgError ? (
                        <div className="flex h-64 w-full items-center justify-center bg-muted">
                            <span className="text-muted-foreground">تصویر موجود نیست</span>
                        </div>
                    ) : (
                        <img
                            src={image}
                            alt={title}
                            className="h-48 w-full object-cover transition duration-500 group-hover:scale-110 md:h-64"
                            onError={() => setImgError(true)}
                        />
                    )}
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
        </Link>
    );
}

export default PlaceCard;
