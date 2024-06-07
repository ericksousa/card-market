import { RouteRecordRaw } from "vue-router";
import { ENUM_ROUTER_NAME } from "@/vue/router/enum/router-name.enum";

export const card_hooks: RouteRecordRaw[] = [
  {
    path: "/add-card",
    name: ENUM_ROUTER_NAME.ADD_CARD,
    component: () => import("@/views/pages/card/AddCard.vue"),
    meta: {
      title: "Card",
    },
  },

  {
    path: "/trade-card",
    name: ENUM_ROUTER_NAME.TRADE_CARD,
    component: () => import("@/views/pages/card/TradeCard.vue"),
    meta: {
      title: "Trade Card",
    },
  },
];
