import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

const HeroSearch = () => {
    return (
        <div className="relative">

            <Search
                className="
          absolute
          left-4
          top-1/2
          h-5
          w-5
          -translate-y-1/2
          text-muted-foreground
        "
            />

            <Input
                placeholder="جستجوی مکان، شهر یا استان..."
                className="
          h-14
          rounded-full
          pr-5
          pl-12
          text-base
        "
            />

        </div>
    );
}

export default HeroSearch;