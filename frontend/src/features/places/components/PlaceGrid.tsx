import type { Place } from "../types/place";
import PlaceCard from "./PlaceCard";

type Props = {
    places: Place[];
};

const PlaceGrid = ({
    places,
}: Props) => {
    return (
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

            {places.map((place) => (

                <PlaceCard
                    key={place.id}
                    {...place}
                />

            ))}

        </div>
    );
}

export default PlaceGrid;