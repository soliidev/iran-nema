import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";

const SearchButton = () => {
    return (
        <Button
            variant="ghost"
            size="icon"
        >
            <Search />
        </Button>
    );
}

export default SearchButton;