import axios, {CreateAxiosDefaults} from "axios";

const options: CreateAxiosDefaults = {
    baseURL: import.meta.env.VITE_SERVER_URL,
    headers: {
        'Content-Type': 'application/json'
    },
}
const axiosOptions = axios.create(options)

axiosOptions.interceptors.request.use(
    async (config) => {
      try {
        return config;
      } catch (error) {
        console.error('Error retrieving session:', error);
        return Promise.reject(error);
      }
    },
    (error) => {
      console.error('Interceptor error:', error);
      return Promise.reject(error);
    }
  );


  export {axiosOptions}