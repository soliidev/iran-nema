import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { NavLink } from "react-router-dom";
import { navigation } from "@/data/navigation";
import { useState } from "react";

const MobileMenu = () => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          {open ? <X /> : <Menu />}
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-72">
        <nav className="mt-10 flex flex-col gap-4">
          {navigation.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `rounded-xl px-4 py-3 text-lg transition ${
                  isActive ? "bg-primary/10 font-semibold text-primary" : "text-muted-foreground hover:text-primary"
                }`
              }
            >
              {item.title}
            </NavLink>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
