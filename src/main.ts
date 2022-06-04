import { createApp, provide, h } from "vue";
import App from "./App.vue";
import { LiteralClientKey } from "./injectionKeys";
import { ApolloClient, InMemoryCache } from "@apollo/client/core";

const apolloClient = new ApolloClient({
  uri: "https://literal.club/graphql",
  cache: new InMemoryCache(),
});

createApp({
  setup() {
    provide(LiteralClientKey, apolloClient);
  },
  render: () => h(App),
}).mount("#app");
