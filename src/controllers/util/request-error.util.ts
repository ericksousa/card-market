import { AxiosError } from "axios";
import { Notify } from "quasar";

export declare type TNodeError = {
  error?: string;
  message: string;
  statusCode?: number;
};

function throw_error(type: string, message: string): never {
  Notify.create({
    type,
    message,
    progress: true,
    actions: [{ icon: "fa-solid fa-xmark", color: "white", round: true }],
  });

  throw new Error(message);
}

export function err(err: AxiosError): never {
  let type = "negative";

  if (err.response?.status === 406) type = "warning";

  const message =
    (err.response?.data as TNodeError)?.message ??
    "Ocorreu um erro ao realizar a requisição";

  throw_error(type, message);
}
