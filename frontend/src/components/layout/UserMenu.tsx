import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";
import { LayoutDashboard, LogOut } from "lucide-react";
import type { RootState } from "@/store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const UserMenu = () => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  if (!isAuthenticated) {
    return (
      <Link
        to="/login"
        className={`${cn(buttonVariants({ variant: "default", size: "default" }))} text-white!`}
      >
        ورود
      </Link>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="cursor-pointer rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary text-primary-foreground text-sm">
              {user?.name?.charAt(0) || "U"}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem asChild>
          <Link to="/dashboard" className="flex items-center justify-end gap-2 cursor-pointer">
            <span>داشبورد</span>
            <LayoutDashboard className="h-4 w-4" />
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center justify-end gap-2 text-destructive cursor-pointer">
          <span>خروج</span>
          <LogOut className="h-4 w-4" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
