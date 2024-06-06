import { RouteRecordRaw } from "vue-router";
import { ENUM_ROUTER_NAME } from "@/vue/router/enum/router-name.enum";

export const home_hooks: RouteRecordRaw = {
  path: "/",
  name: ENUM_ROUTER_NAME.HOME,
  component: () => import("@/views/pages/home/home.vue"),
  meta: {
    title: "Home",
  },
};
