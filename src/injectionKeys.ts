import type { InjectionKey } from "vue";
import type { ApolloClient, NormalizedCacheObject } from "@apollo/client/core";

export const LiteralClientKey = Symbol("LiteralClient") as InjectionKey<
  ApolloClient<NormalizedCacheObject>
>;
