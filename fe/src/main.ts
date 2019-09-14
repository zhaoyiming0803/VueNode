import Vue from 'vue';
import router from './router/index';
import store from './store/index';

import App from './App.vue';
import { Toast, Dialog, Loading  } from 'vant';

Vue.use(Toast);
Vue.use(Dialog);
Vue.use(Loading);

Vue.prototype.uploadFile = process.env.NODE_ENV === 'development'
  ? 'http://localhost:8091/tour/user/changeUserHeadpic'
  : 'https://api.0351zhuangxiu.com/tour/user/changeUserHeadpic'

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
