import Container from "@/components/layout/Container";
import HeroBackground from "./HeroBackground";
import HeroSearch from "./HeroSearch";
import HeroContent from "./HeroContent";

const Hero = () => {
    return (
        <section className="relative overflow-hidden py-16 md:py-32">
            <HeroBackground />

            <Container>

                <div className="mx-auto flex max-w-5xl flex-col items-center text-center">

                    <HeroContent />

                    <div className="mt-10 w-full max-w-xl">
                        <HeroSearch />
                    </div>

                </div>
            </Container>
        </section>
    );
}

export default Hero;