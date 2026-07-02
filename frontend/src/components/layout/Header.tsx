import Logo from "./Logo";
import DesktopMenu from "./DesktopMenu";
import SearchButton from "./SearchButton";
import ThemeToggle from "./ThemeToggle";
import UserMenu from "./UserMenu";
import MobileMenu from "./MobileMenu";
import Container from "./Container";

const Header = () => {

    return (

        <header
            className="
                sticky
                top-0
                z-50
                border-b
                bg-background/80
                backdrop-blur-md
            "
        >

            <Container>

                <div
                    className="
                        flex
                        h-20
                        items-center
                        justify-between
                    "
                >

                    <Logo />

                    <DesktopMenu />

                    <div className="flex items-center gap-2">

                        <SearchButton />

                        <ThemeToggle />

                        <UserMenu />

                        <MobileMenu />

                    </div>

                </div>

            </Container>

        </header>

    );

}

export default Header;