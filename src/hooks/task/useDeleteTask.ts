import { useQuery } from "@tanstack/react-query";
import TaskService from "../../service/task.service";

export const useDeleteTask = (id: string) => {
    const {data, isLoading, error} = useQuery({
        queryKey: ['tasks'],
        queryFn: async () => {
            const {data} = await TaskService.delete(id)
            return data
        },
        
    });
    
      return {
          data,
        isLoading,
        error
      };
}