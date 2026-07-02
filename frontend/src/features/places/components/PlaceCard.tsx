type Props = {
    title: string;
    city: string;
    image: string;
    rating: number;
};

const PlaceCard = ({
    title,
    city,
    image,
    rating,
}: Props) => {
    return (
        <div className="rounded-xl border overflow-hidden">

            <img
                src={image}
                alt={title}
                className="h-56 w-full object-cover"
            />

            <div className="p-4">

                <h3 className="font-bold">
                    {title}
                </h3>

                <p>{city}</p>

                <p>⭐ {rating}</p>

            </div>

        </div>
    );
}

export default PlaceCard;