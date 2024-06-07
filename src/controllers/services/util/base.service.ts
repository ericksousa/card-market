import { AxiosInstance, AxiosRequestConfig } from "axios";
import { make_url } from "@/controllers/util/make-url.util";
import { err } from "@/controllers/util/request-error.util";

export abstract class BaseService {
  protected axios: AxiosInstance;
  protected url: string;

  constructor(axios: AxiosInstance, url: string) {
    this.axios = axios;
    this.url = url;
  }

  async getAll<S>(config?: AxiosRequestConfig): Promise<S> {
    return this.axios
      .get(this.url, config)
      .catch(err)
      .then((r) => r.data);
  }

  async getOne<S>(id: number | string): Promise<S> {
    return this.axios
      .get(make_url(this.url, id))
      .catch(err)
      .then((r) => r.data);
  }
}
