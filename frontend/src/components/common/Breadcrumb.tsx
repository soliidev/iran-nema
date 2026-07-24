import { Link, useLocation } from "react-router-dom";
import { ChevronLeft, Home } from "lucide-react";

type BreadcrumbItem = {
  label: string;
  path: string;
};

const routeLabels: Record<string, string> = {
  places: "مکان‌ها",
  "virtual-tour": "تور مجازی",
  about: "درباره ما",
  contact: "تماس با ما",
  terms: "قوانین و مقررات",
  dashboard: "داشبورد",
  admin: "مدیریت",
  login: "ورود",
  register: "ثبت نام",
  favorites: "علاقه‌مندی‌ها",
};

type Props = {
  lastLabel?: string;
};

const Breadcrumb = ({ lastLabel }: Props) => {
  const { pathname } = useLocation();
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) return null;

  const items: BreadcrumbItem[] = [{ label: "خانه", path: "/" }];

  let currentPath = "";
  for (const segment of segments) {
    currentPath += `/${segment}`;
    const label = routeLabels[segment] || segment;
    items.push({ label, path: currentPath });
  }

  if (lastLabel) {
    items[items.length - 1] = { ...items[items.length - 1], label: lastLabel };
  }

  return (
    <nav aria-label="Breadcrumb" className="py-4">
      <ol className="flex items-center gap-2 text-sm text-muted-foreground">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-2">
              {idx > 0 && <ChevronLeft className="h-4 w-4" />}
              {isLast ? (
                <span className="font-medium text-foreground">{item.label}</span>
              ) : (
                <Link to={item.path} className="transition hover:text-primary">
                  {idx === 0 ? <Home className="h-4 w-4" /> : item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
