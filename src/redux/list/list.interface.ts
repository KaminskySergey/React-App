import { ICategory } from "../../types/category.interface";
import { IHistory } from "../../types/history.interface";

export interface IInitialList {
    list: ICategory[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    history: IHistory[] | any, 
  isLoading: boolean;
  isError: boolean;
}