import { createApp, provide, h } from "vue";
import App from "./App.vue";
import { LiteralApiClientKey } from "./injectionKeys";
import LiteralApiClient from "./literal/literalApiClient";

createApp({
  setup() {
    provide(LiteralApiClientKey, new LiteralApiClient());
  },
  render: () => h(App),
}).mount("#app");
