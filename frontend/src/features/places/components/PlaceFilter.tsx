import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function PlaceFilter() {
    return (
        <Select>

            <SelectTrigger className="h-12 w-56">

                <SelectValue placeholder="دسته‌بندی" />

            </SelectTrigger>

            <SelectContent>

                <SelectItem value="all">
                    همه
                </SelectItem>

                <SelectItem value="historical">
                    تاریخی
                </SelectItem>

                <SelectItem value="nature">
                    طبیعی
                </SelectItem>

                <SelectItem value="religious">
                    مذهبی
                </SelectItem>

            </SelectContent>

        </Select>
    );
}