import axios, { AxiosInstance } from "axios";

class AxiosConnection {
  get AXIOS_INSTANCE(): AxiosInstance {
    const baseURL: string = import.meta.env.VITE_API_BASE_URL;
    return axios.create({
      baseURL,
    });
  }
}

export default new AxiosConnection().AXIOS_INSTANCE;
