import { Search, Moon, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import Container from "./Container";

export default function Header() {
    return (
        <header className="border-b">
            <Container>
                <div className="flex h-16 items-center justify-between">

                    <h1 className="text-xl font-bold">
                        ایران‌نما
                    </h1>

                    <nav className="hidden md:flex gap-8">
                        <a href="/">خانه</a>
                        <a href="/">مکان‌ها</a>
                        <a href="/">تور مجازی</a>
                        <a href="/">درباره ما</a>
                        <a href="/">تماس با ما</a>
                    </nav>

                    <div className="flex items-center gap-2">

                        <Button variant="ghost" size="icon">
                            <Search />
                        </Button>

                        <Button variant="ghost" size="icon">
                            <Moon />
                        </Button>

                        <Button className="hidden md:flex">
                            ورود
                        </Button>

                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden"
                        >
                            <Menu />
                        </Button>

                    </div>

                </div>
            </Container>
        </header>
    );
}