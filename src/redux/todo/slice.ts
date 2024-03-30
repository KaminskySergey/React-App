import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./initial-state";
import {
  taskAll,
  taskById,
  taskCreate,
  taskDelete,
  taskUpdate,
} from "./operations";
import { v4 as uuidv4 } from 'uuid';
import { formatDateDMY, formatDateDetails } from "../../utils/format-date";
export const todoSlice = createSlice({
  name: "task",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      // getAll
      .addCase(taskAll.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(taskAll.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(taskAll.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isError = false;
        state.todos = [...(payload as [])];
      })
      // getById
      .addCase(taskById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(taskById.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(taskById.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isError = false;
        state.todo = payload;
      })
      // create
      .addCase(taskCreate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(taskCreate.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(taskCreate.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isError = false;
        state.todos = [...state.todos, payload];
        state.history.push({
          id: uuidv4(),
          idTodo: payload.id,
          dateHistory: payload.createdAt,
          type: "ADD_TODO",
          oldValue: null,
          newValue: payload,
        });
      })
      // update
      .addCase(taskUpdate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(taskUpdate.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(taskUpdate.fulfilled, (state, { payload }) => {
        const {
          id,
          name,
          // description,
          category,
          updatedAt,
          priority,
          date,
        } = payload;
        const oldTodo = state.todos.find((todo) => todo.id === id);
        const oldTodoWithoutField = { ...oldTodo };
        delete oldTodoWithoutField['updatedAt'];
        delete oldTodoWithoutField['description'];
        if (oldTodo) {
          const newTodo = {
            ...oldTodo,
            name,
            // description,
            category,
            
            priority,
            date,
          };
          state.isLoading = false;
          state.isError = false;
          state.todos = state.todos.map((task) =>
            task.id === id ? newTodo : task
          );
          state.history.push({
            id: uuidv4(),
            idTodo: id,
            dateHistory: updatedAt,
            updatedAt: formatDateDetails(updatedAt),
            type: "EDIT_TODO",
            oldValue: {
              name: oldTodo.name,
              priority: oldTodo.priority,
              date: formatDateDMY(oldTodo.date),
              category: oldTodo.category,
            },
            newValue: {
              name: newTodo.name,
              priority: newTodo.priority,
              date: formatDateDMY(newTodo.date),
              category: newTodo.category,
            },
          });
        }
      })
      // delete
      .addCase(taskDelete.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(taskDelete.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(taskDelete.fulfilled, (state, { payload }) => {
        const deletedTodo = state.todos.find((todo) => todo.id === payload);
        
        state.isLoading = false;
        state.isError = false;
        state.todos = state.todos.filter((todo) => todo.id !== payload);
        state.history.push({
          id: uuidv4(),
          idTodo: payload,
          dateHistory: new Date().toISOString(),
          type: "DELETE_TODO",
          oldValue: deletedTodo,
          newValue: [],
        });
      }),
});
export const todoReducer = todoSlice.reducer;
