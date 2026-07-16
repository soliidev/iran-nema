import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { placeService } from "@/services/place.service";
import { useQuery } from "@tanstack/react-query";
import { useCategories } from "@/features/home/hooks/useCategories";

const SearchButton = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { data: allPlaces = [] } = useQuery({
    queryKey: ["places", "search-all"],
    queryFn: async () => {
      const { data: res } = await placeService.getAll({ per_page: 100 });
      return (res.data?.data ?? res.data ?? []) as { id: number; title: string; city?: string; image?: string; category?: string }[];
    },
    enabled: open,
    staleTime: 5 * 60 * 1000,
  });

  const { data: categories = [] } = useCategories();

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredPlaces = (allPlaces as any[]).filter(
    (p) => (p.title || "").includes(query) || (p.city || "").includes(query),
  );

  const filteredCategories = (categories as any[]).filter(
    (cat) => (cat.title || "").includes(query),
  );

  const handleSelect = (id: number) => {
    setOpen(false);
    setQuery("");
    navigate(`/places/${id}`);
  };

  const handleCategorySelect = (title: string) => {
    setOpen(false);
    setQuery("");
    navigate(`/places?category=${encodeURIComponent(title)}`);
  };

  return (
    <div ref={containerRef} className="relative">
      <Button variant="ghost" size="icon" className="cursor-pointer" onClick={() => setOpen((p) => !p)}>
        <Search className="h-5 w-5" />
      </Button>

      {open && (
        <div className="absolute left-0 top-full mt-2 w-80 sm:w-96 rounded-xl border bg-card p-3 shadow-2xl z-50">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              ref={inputRef}
              placeholder="جستجوی مکان..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="h-10 rounded-lg pr-9"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="mt-2 max-h-72 overflow-y-auto">
            {filteredCategories.length > 0 && (
              <div className="mb-2">
                <p className="px-2 py-1 text-xs font-medium text-muted-foreground">دسته‌بندی‌ها</p>
                {filteredCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategorySelect(cat.title)}
                    className="w-full rounded-lg px-2 py-1.5 text-right text-sm transition hover:bg-muted"
                  >
                    {cat.title}
                  </button>
                ))}
              </div>
            )}

            {filteredPlaces.length > 0 && (
              <div>
                <p className="px-2 py-1 text-xs font-medium text-muted-foreground">مکان‌ها</p>
                {filteredPlaces.map((place) => (
                  <button
                    key={place.id}
                    onClick={() => handleSelect(place.id)}
                    className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-right text-sm transition hover:bg-muted"
                  >
                    <div className="h-8 w-8 shrink-0 rounded-md bg-muted overflow-hidden">
                      {place.image && (
                        <img src={place.image} alt="" className="h-full w-full object-cover" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate font-medium">{place.title}</p>
                      {place.city && (
                        <p className="truncate text-xs text-muted-foreground">{place.city}</p>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}

            {!query && filteredPlaces.length === 0 && (
              <p className="py-6 text-center text-sm text-muted-foreground">برای جستجو تایپ کنید...</p>
            )}
            {query && filteredPlaces.length === 0 && filteredCategories.length === 0 && (
              <p className="py-6 text-center text-sm text-muted-foreground">نتیجه‌ای یافت نشد</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchButton;
