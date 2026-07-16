import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Container from "@/components/layout/Container";
import PlaceGrid from "../components/PlaceGrid";
import PlaceSearch from "../components/PlaceSearch";
import PlaceFilter from "../components/PlaceFilter";
import PlacePagination from "../components/PlacePagination";
import { Breadcrumb } from "@/components/common";
import { Helmet } from "react-helmet-async";
import { usePlaces } from "../hooks/usePlace";
import { Loader2, MapIcon } from "lucide-react";

const ITEMS_PER_PAGE = 6;

export default function PlacesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("q") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "all");
  const [page, setPage] = useState(1);
  const { data: places = [], isLoading } = usePlaces();

  useEffect(() => {
    setSearch(searchParams.get("q") || "");
    setCategory(searchParams.get("category") || "all");
    setPage(1);
  }, [searchParams]);

  const filtered = useMemo(() => {
    return places.filter((p) => {
      const matchesSearch =
        !search ||
        p.title.includes(search) ||
        p.city.includes(search) ||
        p.province.includes(search);
      const matchesCategory = category === "all" || p.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [search, category, places]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const categories = useMemo(() => {
    const cats = [...new Set(places.map((p) => p.category))];
    return ["all", ...cats];
  }, [places]);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
    const params = new URLSearchParams(searchParams);
    if (value) params.set("q", value); else params.delete("q");
    setSearchParams(params, { replace: true });
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    setPage(1);
    const params = new URLSearchParams(searchParams);
    if (value && value !== "all") params.set("category", value); else params.delete("category");
    setSearchParams(params, { replace: true });
  };

  return (
    <>
      <Helmet>
        <title>مکان‌ها | ایران‌نما</title>
        <meta name="description" content="لیست جاذبه‌های گردشگری ایران" />
      </Helmet>

      <section className="py-8">
        <Container>
          <Breadcrumb />

          <div className="mb-10 mt-4">
            <h1 className="text-4xl font-black">همه مکان‌ها</h1>
            <p className="mt-3 text-muted-foreground">
              جاذبه‌های تاریخی، طبیعی و فرهنگی ایران
            </p>
          </div>

          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <PlaceSearch value={search} onChange={handleSearchChange} />
            <PlaceFilter value={category} onChange={handleCategoryChange} categories={categories} />
          </div>

          {isLoading ? (
            <div className="flex min-h-[40vh] items-center justify-center">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
          ) : paginated.length === 0 ? (
            <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4 text-center">
              <MapIcon className="h-16 w-16 text-muted-foreground/40" />
              <h3 className="text-xl font-bold">هیچ مکانی یافت نشد</h3>
              <p className="text-muted-foreground">
                {search || category !== "all"
                  ? "مکان مورد نظر با فیلترهای انتخاب شده وجود ندارد"
                  : "هنوز هیچ مکانی به سامانه اضافه نشده است"}
              </p>
            </div>
          ) : (
            <PlaceGrid places={paginated} />
          )}

          {paginated.length > 0 && (
            <PlacePagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
          )}
        </Container>
      </section>
    </>
  );
}
