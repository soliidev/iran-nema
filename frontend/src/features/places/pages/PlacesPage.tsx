import Container from "@/components/layout/Container";
import PlaceGrid from "../components/PlaceGrid";
import PlaceSearch from "../components/PlaceSearch";
import PlaceFilter from "../components/PlaceFilter";
import PlacePagination from "../components/PlacePagination";
import { Breadcrumb } from "@/components/common";
import { places } from "../data/places";
import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";

const ITEMS_PER_PAGE = 6;

export default function PlacesPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [page, setPage] = useState(1);

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
  }, [search, category]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const categories = useMemo(() => {
    const cats = [...new Set(places.map((p) => p.category))];
    return ["all", ...cats];
  }, []);

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
            <PlaceSearch value={search} onChange={setSearch} />
            <PlaceFilter value={category} onChange={setCategory} categories={categories} />
          </div>

          <PlaceGrid places={paginated} />

          <PlacePagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
        </Container>
      </section>
    </>
  );
}
