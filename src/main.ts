import Vue from 'vue';
import router from './router';
import store from './store/index';

import App from './App.vue';
import { Toast, Dialog  } from 'vant';

Vue.use(Toast);
Vue.use(Dialog);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
