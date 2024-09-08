import { createApp, h, reactive } from 'vue';
import App from './App.vue';
import type { AppProps } from './app-props';
import { LivelyMode } from './constants';
import { LiteralApiClientKey, HardcoverApiClientKey } from './injectionKeys';
import LiteralApiClient from './integrations/literal/literalApiClient';
import HardcoverApiClient from './integrations/hardcover/hardcoverApiClient';

declare global {
  interface Window {
    livelyPropertyListener: (x: string, y: string) => void;
  }
}

const props = reactive<AppProps>({
  librarySource: 'hardcover',
  literalHandle: '',
  hardcoverToken: '',
});

if (import.meta.env.MODE === LivelyMode) {
  window.livelyPropertyListener = (name: string, val: string) => {
    switch (name) {
      case 'librarySource':
        props.librarySource = val as AppProps['librarySource'];
        break;
      case 'literalHandle':
        props.literalHandle = val;
        break;
      case 'hardcoverToken':
        props.hardcoverToken = val;
        break;
    }
  };
}

createApp({ render: () => h(App, props) })
  .provide(LiteralApiClientKey, new LiteralApiClient())
  .provide(HardcoverApiClientKey, new HardcoverApiClient())
  .mount('#app');
