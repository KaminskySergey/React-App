import { axiosOptions } from "../api/interceptor";
import { ICategory } from "../types/category.interface";

const CATEGORIES = 'categories'

const CategoryService = {
    async getAll() {
        return axiosOptions<ICategory[]>({
          url: CATEGORIES,
          method: "GET",
        });
      },
    
      async getById(id: string) {
        return axiosOptions<ICategory>({
          url: `${CATEGORIES}/${id}`,
          method: "GET",
        });
      },
    
      async create( data: string){
        return axiosOptions<ICategory>({
            url: CATEGORIES,
            method: 'POST',
            data: {
              name: data
            }
        })
      },
    
      async update(id: string, data: string) {
        return axiosOptions<ICategory>({
          url: `${CATEGORIES}/${id}`,
          method: "PUT",
          data: {
            name: data
          }
        });
      },
    
      async delete(id: string) {
        return axiosOptions<ICategory>({
          url: `${CATEGORIES}/${id}`,
          method: "DELETE",
        });
      },
}


export default CategoryService;