import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
import { useState, useEffect } from "react";
import { places } from "@/features/places/data/places";
import { useNavigate } from "react-router-dom";

const SearchButton = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const filtered = places.filter(
    (p) =>
      p.title.includes(query) ||
      p.city.includes(query) ||
      p.province.includes(query) ||
      p.category.includes(query),
  );

  const handleSelect = (id: number) => {
    setOpen(false);
    navigate(`/places/${id}`);
  };

  return (
    <>
      <Button variant="ghost" size="icon" className="cursor-pointer" onClick={() => setOpen(true)}>
        <Search className="h-5 w-5" />
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="جستجوی مکان، شهر یا استان..." value={query} onValueChange={setQuery} />
        <CommandList>
          <CommandEmpty>نتیجه‌ای یافت نشد</CommandEmpty>
          <CommandGroup heading="مکان‌ها">
            {filtered.map((place) => (
              <CommandItem key={place.id} onSelect={() => handleSelect(place.id)} className="flex items-center gap-3">
                <img src={place.image} alt="" className="h-10 w-10 rounded-lg object-cover" />
                <div>
                  <p className="font-medium">{place.title}</p>
                  <p className="text-sm text-muted-foreground">{place.city}</p>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default SearchButton;
