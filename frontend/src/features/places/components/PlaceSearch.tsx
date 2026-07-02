import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

export default function PlaceSearch() {
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
                placeholder="جستجوی مکان..."
                className="h-12 rounded-xl pl-12"
            />

        </div>
    );
}