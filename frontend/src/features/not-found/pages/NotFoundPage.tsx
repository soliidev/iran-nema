import { Link } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Helmet } from "react-helmet-async";

const NotFoundPage = () => {
  return (
    <>
      <Helmet>
        <title>صفحه پیدا نشد | ایران‌نما</title>
      </Helmet>
      <div className="flex min-h-[70vh] flex-col items-center justify-center">
        <h1 className="text-8xl font-black text-primary">404</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          صفحه مورد نظر پیدا نشد.
        </p>
        <Link
          to="/"
          className={cn(buttonVariants({ variant: "default" }), "mt-8")}
        >
          بازگشت به خانه
        </Link>
      </div>
    </>
  );
};

export default NotFoundPage;
