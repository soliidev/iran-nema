type Props = {
    title: string;
    description?: string;
};

const SectionTitle = ({
    title,
    description,
}: Props) => {
    return (
        <div className="my-10 text-center">

            <h2 className="text-3xl font-bold">
                {title}
            </h2>

            {description && (
                <p className="mt-3 text-muted-foreground">
                    {description}
                </p>
            )}

        </div>
    );
}

export default SectionTitle;