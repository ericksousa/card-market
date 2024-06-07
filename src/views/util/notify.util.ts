import { Notify } from "quasar";

export class CreateNotify {
  static success(message: string): void {
    Notify.create({
      message,
      type: "positive",
      color: "positive",
    });
  }

  static error(message: string): void {
    Notify.create({
      message,
      type: "negative",
    });
  }
}
