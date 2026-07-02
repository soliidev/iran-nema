import { NavLink } from "react-router-dom";

import { navigation } from "@/data/navigation";

const DesktopMenu = () => {
    return (
        <nav className="hidden lg:flex items-center gap-8">

            {navigation.map((item) => (

                <NavLink
                    key={item.href}
                    to={item.href}
                    className={({ isActive }) =>

                        isActive
                            ? "font-semibold text-primary"
                            : "text-muted-foreground transition hover:text-primary"

                    }
                >

                    {item.title}

                </NavLink>

            ))}

        </nav>
    );
}

export default DesktopMenu;