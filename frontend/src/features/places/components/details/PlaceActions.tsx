import { Button } from "@/components/ui/button";

export default function PlaceActions() {
    return (
        <div className="flex gap-4">

            <Button size="lg">
                شروع تور مجازی
            </Button>

            <Button
                variant="outline"
                size="lg"
            >
                مشاهده روی نقشه
            </Button>

        </div>
    );
}