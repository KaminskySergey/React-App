import { RootState } from "../store";

export const selectIsTask = (state: RootState) => state.todo.todos
export const selectIsTaskById = (state: RootState) => state.todo.todo
export const selectIsTaskHistory = (state: RootState) => state.todo.history