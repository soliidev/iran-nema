import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

const HeroSearch = () => {
    return (
        <div className="relative w-full max-w-xl">

            <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />

            <Input
                placeholder="جستجوی مکان..."
                className="h-14 pl-12"
            />

        </div>
    );
}

export default HeroSearch;