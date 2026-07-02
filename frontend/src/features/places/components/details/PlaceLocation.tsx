import { MapPin } from "lucide-react";

export default function PlaceLocation() {
    return (
        <div className="flex items-center gap-3">

            <MapPin className="text-primary" />

            <span>شیراز، استان فارس</span>

        </div>
    );
}