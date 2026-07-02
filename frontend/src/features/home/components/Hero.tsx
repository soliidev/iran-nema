import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import HeroSearch from "./HeroSearch";
import { heroContent } from "../constants";
import { Link } from "react-router-dom";

const Hero = () => {
    return (
        <section className="py-24">
            <Container>

                <h1>{heroContent.title}</h1>

                <p>{heroContent.description}</p>

                <Button asChild>
                    <Link to="/places">
                        {heroContent.buttonText}
                    </Link>
                </Button>

                <HeroSearch />
            </Container>
        </section>
    );
}

export default Hero;