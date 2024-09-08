import type { InjectionKey } from 'vue';
import type LiteralApiClient from './integrations/literal/literalApiClient';
import type HardcoverApiClient from './integrations/hardcover/hardcoverApiClient';

export const LiteralApiClientKey = Symbol(
  'LiteralApiClient',
) as InjectionKey<LiteralApiClient>;

export const HardcoverApiClientKey = Symbol(
  'HardcoverApiClient',
) as InjectionKey<HardcoverApiClient>;
