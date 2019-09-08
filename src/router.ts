import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: '/fe/',
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/account-index',
      name: 'AccountIndex',
      component: () => import('@/pages/account/index.vue'),
      children: [
				{
					path: '/login',
					name: 'Login',
					component: () => import('@/pages/account/login.vue')
				},
				{
					path: '/regist',
					name: 'Regist',
					component: () => import('@/pages/account/regist.vue')
				}
			]
    }
  ]
});
