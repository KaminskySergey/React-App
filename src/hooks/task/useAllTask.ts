import { useQuery } from "@tanstack/react-query";
import TaskService from "../../service/task.service";

export const useAllTask = () => {
    const {data: tasks, isLoading, error} = useQuery({
      queryKey: ['tasks'],
      queryFn: async () => {
          const {data} = await TaskService.getAll()
          return data
      },
      
  });
  
    return {
        tasks,
      isLoading,
      error
    };
  };