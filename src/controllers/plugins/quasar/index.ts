import quasarLang from "quasar/lang/pt-BR";
import quasarIconSet from "quasar/icon-set/fontawesome-v6";
import { Dialog, Loading, Notify } from "quasar";

import "@quasar/extras/roboto-font/roboto-font.css";
import "@quasar/extras/fontawesome-v6/fontawesome-v6.css";
import "quasar/src/css/index.sass";

export const quasar_options = {
  plugins: {
    Notify,
    Dialog,
    Loading,
  },
  lang: quasarLang,
  iconSet: quasarIconSet,
};
