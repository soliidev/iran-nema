type Props = {
    title: string;
    value: string;
};

const StatisticCard = ({
    title,
    value,
}: Props) => {
    return (
        <div className="rounded-xl border p-6 text-center">

            <h3 className="text-4xl font-bold text-primary">
                {value}
            </h3>

            <p className="mt-2 text-muted-foreground">
                {title}
            </p>

        </div>
    );
}

export default StatisticCard;