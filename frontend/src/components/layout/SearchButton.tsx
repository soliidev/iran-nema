import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const SearchButton = () => {
  const navigate = useNavigate();

  return (
    <Button variant="ghost" size="icon" className="cursor-pointer" onClick={() => navigate("/places")}>
      <Search className="h-5 w-5" />
    </Button>
  );
};

export default SearchButton;
