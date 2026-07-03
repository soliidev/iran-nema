import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  value: string;
  onChange: (value: string) => void;
  categories: string[];
};

export default function PlaceFilter({ value, onChange, categories }: Props) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="h-12 w-44">
        <SelectValue placeholder="دسته‌بندی" />
      </SelectTrigger>
      <SelectContent>
        {categories.map((cat) => (
          <SelectItem key={cat} value={cat}>
            {cat === "all" ? "همه" : cat}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
