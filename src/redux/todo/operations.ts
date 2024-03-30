import { createAsyncThunk } from "@reduxjs/toolkit";
import TaskService from "../../service/task.service";
import { ITask, ITaskValues, ITaskValuesUpdate } from "../../types/task.interface";

export const taskAll = createAsyncThunk("task/All", async () => {
  try {
    const { data } = await TaskService.getAll();
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const taskById = createAsyncThunk<ITask, string>(
  "task/byId", async (credentials, { rejectWithValue }) => {
  try {
    const { data } = await TaskService.getById(credentials);
    return data;
  } catch (error) {
    console.log(error);
    return rejectWithValue(error);
  }
});

export const taskCreate = createAsyncThunk<ITask, ITaskValues>(
  "task/create",
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await TaskService.create(credentials);
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const taskUpdate = createAsyncThunk<ITask, ITaskValuesUpdate>(
  "task/update",
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await TaskService.update(credentials);
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);



export const taskDelete = createAsyncThunk<string, string>(
  "task/delete",
  async (credentials, { rejectWithValue }) => {
    try {
       await TaskService.delete(credentials);
      return credentials;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);
