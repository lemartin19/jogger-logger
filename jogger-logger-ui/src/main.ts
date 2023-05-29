import '@mdi/font/css/materialdesignicons.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import VueCookies from 'vue-cookies';

import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const vuetify = createVuetify({
  theme: {
    defaultTheme: 'dark',
  },
  components,
  directives,
});

createApp(App).use(vuetify).use(createPinia()).use(router).use(VueCookies).mount('#app');
