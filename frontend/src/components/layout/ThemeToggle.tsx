import { Moon } from "lucide-react";

import { Button } from "@/components/ui/button";

const ThemeToggle = () => {
    return (
        <Button
            variant="ghost"
            size="icon"
        >
            <Moon />
        </Button>
    );
}

export default ThemeToggle;