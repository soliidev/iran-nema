import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { usePlaces } from "@/features/places/hooks/usePlace";
import { useCategories } from "@/features/home/hooks/useCategories";

const SearchButton = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { data: places = [] } = usePlaces();
  const { data: categories = [] } = useCategories() as { data: { id: number; title: string; code: string; icon?: string }[] };

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

  const filteredPlaces = places.filter(
    (p) =>
      p.title.includes(query) ||
      p.city.includes(query) ||
      p.province.includes(query) ||
      p.category.includes(query),
  );

  const filteredCategories = categories.filter(
    (cat) => cat.title.includes(query),
  );

  const handleSelectPlace = (id: number) => {
    setOpen(false);
    navigate(`/places/${id}`);
  };

  const handleSelectCategory = (title: string) => {
    setOpen(false);
    navigate(`/places?category=${encodeURIComponent(title)}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && query.trim()) {
      setOpen(false);
      navigate(`/places?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <>
      <Button variant="ghost" size="icon" className="cursor-pointer" onClick={() => setOpen(true)}>
        <Search className="h-5 w-5" />
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="جستجوی مکان، دسته‌بندی..."
          value={query}
          onValueChange={setQuery}
          onKeyDown={handleKeyDown}
        />
        <CommandList>
          <CommandEmpty>نتیجه‌ای یافت نشد</CommandEmpty>
          {filteredCategories.length > 0 && (
            <CommandGroup heading="دسته‌بندی‌ها">
              {filteredCategories.map((cat) => (
                <CommandItem key={cat.id} onSelect={() => handleSelectCategory(cat.title)}>
                  {cat.title}
                </CommandItem>
              ))}
            </CommandGroup>
          )}
          {filteredPlaces.length > 0 && (
            <CommandGroup heading="مکان‌ها">
              {filteredPlaces.map((place) => (
                <CommandItem key={place.id} onSelect={() => handleSelectPlace(place.id)} className="flex items-center gap-3">
                  <img src={place.image} alt="" className="h-10 w-10 rounded-lg object-cover" />
                  <div>
                    <p className="font-medium">{place.title}</p>
                    <p className="text-sm text-muted-foreground">{place.city}</p>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default SearchButton;
