import Container from "@/components/layout/Container";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="rounded-2xl bg-primary p-6 md:p-12 text-center text-primary-foreground">
          <h2 className="text-2xl font-bold md:text-4xl">آماده سفر مجازی هستید؟</h2>
          <p className="mt-4">همین حالا اولین مکان تاریخی ایران را بازدید کنید.</p>
          <Link
            to="/places"
            className={cn(
              buttonVariants({ variant: "secondary" }),
              "mt-6 inline-flex",
            )}
          >
            شروع بازدید
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default CTA;
