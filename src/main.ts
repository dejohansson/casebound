import { createApp, h, reactive } from 'vue';
import App from './App.vue';
import { LivelyMode } from './constants';
import { LiteralApiClientKey } from './injectionKeys';
import LiteralApiClient from './literal/literalApiClient';

declare global {
  interface Window {
    livelyPropertyListener: (x: string, y: string) => void;
  }
}

if (import.meta.env.MODE === LivelyMode) {
  window.livelyPropertyListener = (name: string, val: string) => {
    if (name == 'literalUserId') props.literalUserId = val;
  };
}

const props = reactive({
  literalUserId: '',
});

createApp({ render: () => h(App, props) })
  .provide(LiteralApiClientKey, new LiteralApiClient())
  .mount('#app');
