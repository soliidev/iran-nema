import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";

const MobileMenu = () => {
    return (
        <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
        >
            <Menu />
        </Button>
    );
}

export default MobileMenu;