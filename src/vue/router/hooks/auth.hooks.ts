import { RouteRecordRaw } from "vue-router";
import { ENUM_ROUTER_NAME } from "@/vue/router/enum/router-name.enum";

export const auth_hooks: RouteRecordRaw[] = [
  {
    path: "/login",
    name: ENUM_ROUTER_NAME.LOGIN,
    component: () => import("@/views/pages/auth/login.vue"),
    meta: {
      title: "Login",
    },
  },
];
