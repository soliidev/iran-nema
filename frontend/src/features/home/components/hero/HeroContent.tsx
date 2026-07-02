import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

import { heroData } from "../../data/hero";

const HeroContent = () => {
    return (
        <>
            <h1
                className="
          max-w-4xl
          text-5xl
          font-black
          leading-tight
          lg:text-7xl
        "
            >
                {heroData.title}
            </h1>

            <p
                className="
          mt-8
          max-w-2xl
          text-lg
          leading-8
          text-muted-foreground
        "
            >
                {heroData.description}
            </p>

            <div className="mt-10">
                <Button size="lg" asChild>
                    <Link to="/places">
                        {heroData.buttonText}
                    </Link>
                </Button>
            </div>
        </>
    );
}

export default HeroContent;