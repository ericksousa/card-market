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
  {
    path: "/register",
    name: ENUM_ROUTER_NAME.REGISTER,
    component: () => import("@/views/pages/auth/register.vue"),
    meta: {
      title: "Cadastro",
    },
  },
];
