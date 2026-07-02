import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import HeroSearch from "./HeroSearch";

const Hero = () => {
    return (
        <section className="py-24">
            <Container>

                <h1 className="text-5xl font-bold">
                    ایران را از زاویه‌ای جدید کشف کنید
                </h1>

                <p className="mt-6 max-w-2xl text-muted-foreground">
                    گردش مجازی، تصاویر ۳۶۰ درجه، اطلاعات تاریخی و بازدید آنلاین از مکان‌های دیدنی ایران.
                </p>

                <Button className="mt-8">
                    شروع بازدید
                </Button>

                <HeroSearch />
            </Container>
        </section>
    );
}

export default Hero;