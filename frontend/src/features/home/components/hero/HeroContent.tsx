import { Link } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";
import { heroData } from "../../data/hero";

const HeroContent = () => {
  return (
    <>
      <h1 className="max-w-4xl text-3xl font-black leading-tight md:text-5xl lg:text-7xl">
        {heroData.title}
      </h1>

      <p className="mt-8 max-w-2xl text-lg leading-8 text-muted-foreground">
        {heroData.description}
      </p>

      <div className="mt-10">
        <Link
          to="/places"
          className={cn(
            buttonVariants({ variant: "default", size: "default" }),
            "h-12 px-8 text-base inline-flex items-center justify-center text-white!",
          )}
        >
          {heroData.buttonText}
        </Link>
      </div>
    </>
  );
};

export default HeroContent;
