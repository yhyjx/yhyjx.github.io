import { h, version } from "vue";
import { ReplStore, Repl } from "@vue/repl";

import "@vue/repl/style.css";

export default (replFile: string) => {
  return {
    setup() {
      const store = new ReplStore({
        defaultVueRuntimeURL: `https://unpkg.com/vue@${version}/dist/vue.esm-browser.js`,
      });
      const sfcOptions = { script: { reactivityTransform: true } };
      return () => {
        store.setFiles({ "App.vue": replFile });
        return h(Repl, {
          store: store,
          showCompileOutput: true,
          autoResize: true,
          sfcOptions: sfcOptions,
          clearConsole: false,
        });
      };
    },
  };
};
