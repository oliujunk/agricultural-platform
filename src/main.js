import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import axios from 'axios';
import Viewer from 'v-viewer';

import App from '@/App.vue';
import router from '@/router/index';
import i18n from '@/i18n/i18n';
import store from '@/store/index';
import '@/assets/icon/iconfont.css';
import 'viewerjs/dist/viewer.css';

Vue.config.productionTip = false;

let SERVER_API_URL = '';
let SERVER_SOCKET_URL = '';
let API_BASE_URL = '';

if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = 'http://47.105.215.208:8005';
  SERVER_API_URL = 'http://47.105.215.208:9000';
  API_BASE_URL = 'http://47.105.215.208:8005';
  SERVER_SOCKET_URL = 'ws://47.105.215.208:9000';
} else {
  axios.defaults.baseURL = 'http://127.0.0.1:8005';
  API_BASE_URL = 'http://127.0.0.1:8005';
  SERVER_API_URL = 'http://127.0.0.1:9001';
  SERVER_SOCKET_URL = 'ws://127.0.0.1:9001';
  // axios.defaults.baseURL = 'http://47.105.215.208:8005';
  // SERVER_API_URL = 'http://47.105.215.208:9000';
  // API_BASE_URL = 'http://47.105.215.208:8005';
  // SERVER_SOCKET_URL = 'ws://47.105.215.208:9000';
}

Vue.http = Vue.prototype.$http = axios;

Vue.prototype.$SERVER_API_URL = SERVER_API_URL;
Vue.prototype.$SERVER_SOCKET_URL = SERVER_SOCKET_URL;
Vue.prototype.$API_BASE_URL = API_BASE_URL;

Vue.use(ElementUI);

Vue.use(Viewer, {
  defaultOptions: {
    navbar: false,
    toolbar: {
      zoomIn: true,
      zoomOut: true,
      oneToOne: true,
      reset: true,
      prev: false,
      play: true,
      next: false,
      rotateLeft: true,
      rotateRight: true,
      flipHorizontal: true,
      flipVertical: true,
    },
  },
});

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app');
