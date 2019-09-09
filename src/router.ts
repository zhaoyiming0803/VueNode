import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: '/fe/',
  routes: [
    {
      path: '/',
      redirect: '/home',
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
    },
    {
      path: '/home',
      name: 'Home',
      component: () => import('@/pages/home.vue')
    },
    {
      path: '/get-coupon',
      name: 'GetCoupon',
      component: () => import('@/pages/get-coupon/index.vue')
    },
    {
      path: '/personal',
      name: 'Personal',
      component: () => import('@/pages/personal/index.vue')
    },
    {
      path: '/personal-edit',
      name: 'PersonEdit',
      component: () => import('@/pages/personal/personal-edit.vue')
    },
    {
      path: '/change-user-thumb',
      name: 'ChangeUserThumb',
      component: () => import('@/pages/personal/change-headpic.vue')
    }
  ]
});
