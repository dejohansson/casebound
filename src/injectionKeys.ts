import type { InjectionKey } from "vue";
import type LiteralApiClient from "./literal/literalApiClient";

export const LiteralApiClientKey = Symbol("LiteralClient") as InjectionKey<LiteralApiClient>;
