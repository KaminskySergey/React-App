import { RootState } from "../store";

export const selectIsList = (state: RootState) => state.list.list
export const selectIsListHistory = (state: RootState) => state.list.history