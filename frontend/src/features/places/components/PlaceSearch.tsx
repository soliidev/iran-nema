import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function PlaceSearch({ value, onChange }: Props) {
  return (
    <div className="relative w-full md:w-80">
      <Search className="absolute right-4 inset-y-0 my-auto h-5 w-5 text-muted-foreground" />
      <Input
        placeholder="جستجوی مکان..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-12 rounded-xl pr-12"
      />
    </div>
  );
}
