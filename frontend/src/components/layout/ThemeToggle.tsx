import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleTheme } from "@/store/slices/themeSlice";
import { useEffect } from "react";

const ThemeToggle = () => {
  const dispatch = useAppDispatch();
  const mode = useAppSelector((state) => state.theme.mode);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", mode === "dark");
  }, [mode]);

  return (
    <Button variant="ghost" size="icon" className="cursor-pointer" onClick={() => dispatch(toggleTheme())}>
      {mode === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>
  );
};

export default ThemeToggle;
