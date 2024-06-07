export declare type ResponsePaginateDTO<T> = {
  list: T[];
  rpp: number;
  page: number;
  more: boolean;
};
