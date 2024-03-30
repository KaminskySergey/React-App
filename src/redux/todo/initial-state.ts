import { IInitialTodo } from "./todo.interface";

export const initialState: IInitialTodo = {
    todos: [],
    history: [],
    isLoading: false,
    isError: false,
    todo: null
}