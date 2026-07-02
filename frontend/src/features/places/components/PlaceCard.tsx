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
        <div className="group overflow-hidden rounded-2xl border bg-card transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
            <img
                src={image}
                alt={title}
                className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />

            <div className="p-4">

                <h3 className="text-xl font-bold">
                    {title}
                </h3>

                <p className="mt-2 text-muted-foreground">{city}</p>

                <p className="mt-4 font-semibold text-primary">⭐ {rating}</p>

            </div>

        </div>
    );
}

export default PlaceCard;