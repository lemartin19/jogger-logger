import '@mdi/font/css/materialdesignicons.css';

import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import VueCookies from 'vue-cookies';

import App from './App.vue';
import router from './router';
import { themes } from './themes';

const vuetify = createVuetify({
  theme: {
    defaultTheme: 'dark',
    themes,
  },
  components,
  directives,
});
const pinia = createPinia();

createApp(App).use(vuetify).use(pinia).use(router).use(VueCookies).mount('#app');
