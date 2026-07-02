import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import HeroSearch from "./HeroSearch";
import { heroContent } from "../constants";
import { Link } from "react-router-dom";

const Hero = () => {
    return (
        <section className="relative overflow-hidden py-32">
            <Container>

                <h1 className="mx-auto text-center text-5xl font-black leading-tight lg:text-7xl">
                    {heroContent.title}
                </h1>

                <p className="mx-auto mt-8 text-center text-lg leading-8 text-muted-foreground">
                    {heroContent.description}
                </p>

                <div className="mt-8 flex justify-center">
                    <Button asChild>
                        <Link to="/places">
                            {heroContent.buttonText}
                        </Link>
                    </Button>

                </div>

                <div className="mt-10 flex justify-center">
                    <HeroSearch />
                </div>
            </Container>
        </section>
    );
}

export default Hero;