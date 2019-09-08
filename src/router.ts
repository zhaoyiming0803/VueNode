import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: '/fe/',
  routes: [
    {
      path: '/',
      redirect: '/account/login',
    },
    {
      path: '/account',
      name: 'AccountIndex',
      component: () => import('@/pages/account/index.vue'),
      children: [
				{
					path: 'login',
					name: 'Login',
					component: () => import('@/pages/account/login.vue')
				},
				{
					path: 'regist',
					name: 'Regist',
					component: () => import('@/pages/account/regist.vue')
        },
        {
          path: 'get-phone-code',
          name: 'GetPhoneCode',
          component: () => import('@/pages/account/get-phone-code.vue')
        },
        {
          path: 'reset-password',
          name: 'ResetPassword',
          component: () => import('@/pages/account/reset-password.vue')
        }
			]
    }
  ]
});
