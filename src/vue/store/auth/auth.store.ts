import { defineStore } from "pinia";
import { IAuth } from "@/models/interfaces/auth.interface";

export const auth_store = defineStore("auth", {
  state: (): IAuth => ({
    user: null,
    token: null,
  }),

  actions: {
    logout() {
      this.$reset();
    },
  },
});
