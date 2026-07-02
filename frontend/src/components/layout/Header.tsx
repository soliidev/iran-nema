import { Search, Moon, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import Container from "./Container";
import { navigation } from "@/data/navigation";
import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header className="border-b">
            <Container>
                <div className="flex h-16 items-center justify-between">

                    <Link
                        to="/"
                        className="text-xl font-bold"
                    >
                        ایران‌نما
                    </Link>

                    <nav className="hidden items-center gap-8 md:flex">
                        {navigation.map((item) => (
                            <Link
                                key={item.href}
                                to={item.href}
                                className="transition hover:text-primary"
                            >
                                {item.title}
                            </Link>
                        ))}
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