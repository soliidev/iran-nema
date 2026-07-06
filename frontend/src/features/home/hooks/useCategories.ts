import { useQuery } from "@tanstack/react-query";
import { categoryService } from "@/services/category.service";

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data } = await categoryService.getAll();
      return data.data ?? data;
    },
    staleTime: 10 * 60 * 1000,
  });
}
