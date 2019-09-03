import Vue from 'vue';
import router from './router';
import store from './store/index';

import App from './App.vue';
import { Toast } from 'vant';

Vue.use(Toast);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
