import { heroStats } from "../../data/stats";

const HeroStats = () => {
    return (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {heroStats.map((item) => {
                const Icon = item.icon;

                return (
                    <div
                        key={item.id}
                        className="rounded-2xl border bg-card/70 p-6 backdrop-blur transition-all hover:-translate-y-1 hover:border-primary hover:shadow-lg"
                    >
                        <Icon className="mb-4 h-10 w-full text-primary" />

                        <h3 className="text-3xl font-black">
                            {item.value}
                        </h3>

                        <p className="mt-2 text-muted-foreground">
                            {item.title}
                        </p>
                    </div>
                );
            })}
        </div>
    );
}

export default HeroStats;