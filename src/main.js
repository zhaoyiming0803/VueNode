/**
 * 项目入口
 * @author zhaoyiming
 * @since  2019/06/20
 */

import Vue from 'vue';
import router from './router';
import App from './App';
import store from './store/index.js';

Vue.config.productionTip = false;

window.vueEvent = new Vue(); // 专门用作单一事件管理而初始化的全局Vue对象

new Vue({
  el: '#app',
	store,
  router,
  render: h => h(App)
})