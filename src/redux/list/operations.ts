import CategoryService from "../../service/category.service";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ICategory, ICategoryValues } from "../../types/category.interface";
export const listAll = createAsyncThunk("list/All", async () => {
    try {
      const { data } = await CategoryService.getAll();
      return data;
    } catch (error) {
      console.log(error);
    }
  });
  
  
  export const listCreate = createAsyncThunk<ICategory, ICategoryValues>(
    "list/create",
    async (credentials, { rejectWithValue }) => {
      try {
        const { data } = await CategoryService.create(credentials.name);
        return data;
      } catch (error) {
        console.log(error);
        return rejectWithValue(error);
      }
    }
  );
  
  export const listUpdate = createAsyncThunk<ICategory, {id: string, name: string}>(
    "list/update",
    async (credentials, { rejectWithValue }) => {
      try {
        const { data } = await CategoryService.update(credentials.id, credentials.name);
        return data;
      } catch (error) {
        console.log(error);
        return rejectWithValue(error);
      }
    }
  );
  
  
  
  export const listDelete = createAsyncThunk<string, string>(
    "list/delete",
    async (credentials, { rejectWithValue }) => {
      try {
         await CategoryService.delete(credentials);
        return credentials;
      } catch (error) {
        console.log(error);
        return rejectWithValue(error);
      }
    }
  );
  