import App from "./App.vue";
import { createApp } from "vue";
import { createPinia } from "pinia";
import { Quasar } from "quasar";
import { quasar_options } from "./controllers/plugins/quasar";
import { router } from "./vue/router";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

import "./views/styles/global.scss";

const app = createApp(App);

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(pinia).use(Quasar, quasar_options).use(router);

app.mount("#app");
