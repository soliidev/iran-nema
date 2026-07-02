import { Button } from "@/components/ui/button";

const NotFoundPage = () => {
    return (
        <div className="flex min-h-[70vh] flex-col items-center justify-center">

            <h1 className="text-8xl font-bold">
                404
            </h1>

            <p className="mt-4 text-muted-foreground">
                صفحه مورد نظر پیدا نشد.
            </p>

            <Button className="mt-8">
                بازگشت به خانه
            </Button>

        </div>
    );
}

export default NotFoundPage;