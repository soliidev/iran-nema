import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CTA = () => {
    return (
        <section className="py-24">

            <Container>

                <div className="rounded-2xl bg-primary p-12 text-center text-primary-foreground">

                    <h2 className="text-4xl font-bold">
                        آماده سفر مجازی هستید؟
                    </h2>

                    <p className="mt-4">
                        همین حالا اولین مکان تاریخی ایران را بازدید کنید.
                    </p>

                    <Button asChild>
                        <Link to="/places">
                            شروع بازدید
                        </Link>
                    </Button>

                </div>

            </Container>

        </section>
    );
}

export default CTA;