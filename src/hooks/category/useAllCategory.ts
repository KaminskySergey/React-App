import { useQuery } from "@tanstack/react-query";
import CategoryService from "../../service/category.service";

export const useAllCategory = () => {
    const {data: categories, isLoading, error} = useQuery({
      queryKey: ['categories'],
      queryFn: async () => {
          const {data} = await CategoryService.getAll()
          return data
      },
      
  });
  
    return {
      categories,
      isLoading,
      error
    };
  };