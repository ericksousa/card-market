import { Notify } from "quasar";

export class CreateNotify {
  static success(message: string): void {
    Notify.create({
      message,
      type: "positive",
      color: "positive",
      progress: true,
      actions: [{ icon: "fa-solid fa-xmark", color: "white", round: true }],
    });
  }

  static error(message: string): void {
    Notify.create({
      message,
      type: "negative",
      progress: true,
      actions: [{ icon: "fa-solid fa-xmark", color: "white", round: true }],
    });
  }
}
