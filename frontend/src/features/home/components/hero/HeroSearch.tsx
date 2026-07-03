import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const HeroSearch = () => {
  return (
    <div className="relative">
      <Search className="absolute right-5 inset-y-0 my-auto h-5 w-5 text-muted-foreground" />
      <Input
        placeholder="جستجوی مکان، شهر یا استان..."
        className="h-14 rounded-full pr-12 pl-5 text-base"
      />
    </div>
  );
};

export default HeroSearch;
