import { Play } from "lucide-react";
import { Link } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

type Props = {
  id: number;
  title: string;
  location: string;
  image: string;
};

const TourCard = ({ id, title, location, image }: Props) => {
  return (
    <div className="group relative overflow-hidden rounded-2xl">
      <img
        src={image}
        alt={title}
        className="h-72 w-full object-cover transition duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      <div className="absolute bottom-0 right-0 left-0 p-6 text-white">
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="mt-1 text-sm text-white/80">{location}</p>
        <Link
          to={`/virtual-tour?place=${id}`}
          className={cn(buttonVariants({ variant: "secondary", size: "sm" }), "mt-4 gap-2")}
        >
          <Play className="h-4 w-4" />
          تماشای تور مجازی
        </Link>
      </div>
    </div>
  );
};

export default TourCard;
