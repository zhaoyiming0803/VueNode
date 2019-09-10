import Vue from 'vue';
import router from './router';
import store from './store/index';

import App from './App.vue';
import { Toast, Dialog, Loading  } from 'vant';

Vue.use(Toast);
Vue.use(Dialog);
Vue.use(Loading);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
