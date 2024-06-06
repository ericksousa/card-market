import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { home_hooks } from "./hooks/home.hook";
import { auth_hooks } from "./hooks/auth.hooks";

const routes: RouteRecordRaw[] = [home_hooks, ...auth_hooks];

export const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes,
});
