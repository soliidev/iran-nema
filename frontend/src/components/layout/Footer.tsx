import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Container from "./Container";
import { categoryService } from "@/services/category.service";

const Footer = () => {
  const [categories, setCategories] = useState<{ id: number; code: string; title: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data: res } = await categoryService.getAll();
        setCategories(res.data.data ?? res.data);
      } catch {
        console.error("Failed to fetch categories for footer");
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <footer className="mt-20 border-t bg-muted/30 py-16">
      <Container>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-2xl font-bold text-primary">ایران نما</h3>
            <p className="mt-3 leading-7 text-muted-foreground">
              تجربه بازدید مجازی از جاذبه‌های گردشگری ایران با تصاویر ۳۶۰ درجه و اطلاعات کامل.
            </p>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">صفحات</h4>
            <div className="flex flex-col gap-3 text-muted-foreground">
              <Link to="/" className="transition hover:text-primary">خانه</Link>
              <Link to="/places" className="transition hover:text-primary">مکان‌ها</Link>
              <Link to="/virtual-tour" className="transition hover:text-primary">تور مجازی</Link>
              <Link to="/about" className="transition hover:text-primary">درباره ما</Link>
              <Link to="/contact" className="transition hover:text-primary">تماس با ما</Link>
            </div>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">دسته‌بندی</h4>
            <div className="flex flex-col gap-3 text-muted-foreground">
              {loading ? (
                <div className="h-4 bg-muted animate-pulse rounded w-3/4" />
              ) : (
                categories.map((cat) => (
                  <Link key={cat.id} to={`/places?category=${cat.code}`} className="transition hover:text-primary">
                    {cat.title}
                  </Link>
                ))
              )}
            </div>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">ارتباط با ما</h4>
            <div className="flex flex-col gap-3 text-muted-foreground">
              <span>ایمیل: info@irannema.ir</span>
              <span>تلفن: ۰۲۱-۱۲۳۴۵۶۷۸</span>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} ایران‌نما. تمامی حقوق محفوظ است.</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;