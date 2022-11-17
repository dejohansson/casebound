import { createApp, h, reactive } from 'vue';
import App from './App.vue';
import { LiteralApiClientKey } from './injectionKeys';
import LiteralApiClient from './literal/literalApiClient';

declare global {
  interface Window {
    livelyPropertyListener: (x: string, y: string) => void;
  }
}

const props = reactive({
  literalUserId: import.meta.env.VITE_LITERAL_PROFILE_ID as string,
});

function livelyPropertyListener(name: string, val: string) {
  console.log(val);
  switch (name) {
    case 'literalUserId':
      props.literalUserId = val;
      console.log(props.literalUserId);
  }
}

window.livelyPropertyListener = livelyPropertyListener;

createApp({ render: () => h(App, props) })
  .provide(LiteralApiClientKey, new LiteralApiClient())
  .mount('#app');
