import { initialState } from "./initial-state";
import { createSlice } from "@reduxjs/toolkit";
import { listAll, listCreate, listDelete, listUpdate } from "./operations";
import { v4 as uuidv4 } from 'uuid';
export const listSlice = createSlice({
    name: "list",
    initialState: initialState,
    reducers: {},
    extraReducers: builder =>
      builder
      // getAll
      .addCase(listAll.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(listAll.rejected, (state) => {
        state.isLoading = false;
        state.isError = true
      })
      .addCase(listAll.fulfilled, (state, {payload}) => {
        state.isLoading = false;
        state.isError = false
        state.list = [...payload as []]
      })
      // create
      .addCase(listCreate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(listCreate.rejected, (state) => {
        state.isLoading = false;
        state.isError = true
      })
      .addCase(listCreate.fulfilled, (state, {payload}) => {
        state.isLoading = false;
        state.isError = false
        state.list = [...state.list, payload]
        state.history.push({
          id: uuidv4(),
          dateHistory: payload.createdAt,
          type: "ADD_LIST",
          oldValue: null,
          newValue: payload,
        })
      })
      // update
      .addCase(listUpdate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(listUpdate.rejected, (state) => {
        state.isLoading = false;
        state.isError = true
      })
      .addCase(listUpdate.fulfilled, (state, {payload}) => {
        const oldList = state.list.find((list) => list.id === payload.id);
        state.isLoading = false;
        state.isError = false
        state.list = state.list.map(list => {
          if (list.id === payload.id) {
            return payload;
          } else {
            return list;
          }
        });
        state.history.push({
          id: uuidv4(),
          dateHistory: payload.updatedAt,
          type: "EDIT_LIST",
          oldValue: oldList,
          newValue: payload,
        })
        
      })
      // delete 
      .addCase(listDelete.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(listDelete.rejected, (state) => {
        state.isLoading = false;
        state.isError = true
      })
      .addCase(listDelete.fulfilled, (state, {payload}) => {
        const deletedList = state.list.find((list) => list.id === payload);
        state.isLoading = false;
        state.isError = false
        state.list = state.list.filter(list => list.id !== payload)
        state.history.push({
          id: uuidv4(),
          idTodo: payload,
          dateHistory: new Date().toISOString(),
          type: "DELETE_LIST",
          oldValue: deletedList,
          newValue: null,
        });
      })
  });
  export const listReducer = listSlice.reducer;
  