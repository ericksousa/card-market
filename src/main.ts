import App from "./App.vue";
import { createApp } from "vue";
import { createPinia } from "pinia";
import { Quasar } from "quasar";
import { quasar_options } from "./controllers/plugins/quasar";
import { router } from "./vue/router";

import "./views/styles/global.scss";

const app = createApp(App);

app.use(createPinia()).use(Quasar, quasar_options).use(router);

app.mount("#app");
