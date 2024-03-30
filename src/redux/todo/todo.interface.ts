import { IHistory } from "../../types/history.interface";
import { ITask } from "../../types/task.interface";

export interface IInitialTodo {
  todos: ITask[];
  history: IHistory[] ,
  isLoading: boolean;
  isError: boolean;
  todo: ITask | null
}

