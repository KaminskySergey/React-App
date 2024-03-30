import { axiosOptions } from "../api/interceptor";
import { ITask , ITaskValues, ITaskValuesUpdate} from "../types/task.interface";

const TASKS = "tasks";

const TaskService = {
  async getAll() {
    return axiosOptions<ITask[]>({
      url: TASKS,
      method: "GET",
    });
  },

  async getById(id: string) {
    return axiosOptions<ITask>({
      url: `${TASKS}/${id}`,
      method: "GET",
    });
  },

  async create(data: ITaskValues){
    return axiosOptions<ITask>({
        url: TASKS,
        method: 'POST',
        data
    })
  },

  async update(data: ITaskValuesUpdate) {
    return axiosOptions<ITask>({
      url: `${TASKS}/${data.id}`,
      method: "PUT",
      data
    });
  },

  async delete(id: string) {
    return axiosOptions<ITask>({
      url: `${TASKS}/${id}`,
      method: "DELETE",
    });
  },
};

export default TaskService;
