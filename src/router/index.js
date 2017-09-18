import Vue from 'vue';
import Router from 'vue-router';
import Resource from 'vue-resource';

import accountIndex from '@/components/account/index.vue';
import login from '@/components/account/login.vue';
import regist from '@/components/account/regist.vue';
import forgetPwdFirstStep from '@/components/account/forgetpwd-firststep.vue';
import forgetPwdSecondStep from '@/components/account/forgetpwd-secondstep.vue';

import personal from '@/components/personal/index.vue';

import globalCouponIndex from '@/components/global-coupon/index.vue';

Vue.use(Router);
Vue.use(Resource);

export default new Router({
	routes: [
		{
			path: '/',
			redirect: '/personal'
		},

		{
			path: '/accountIndex',
			name: 'AccountIndex',
			component: accountIndex,
			children: [
				{
					path: '/login',
					name: 'Login',
					component: login
				},
				{
					path: '/regist',
					name: 'Regist',
					component: regist
				}
			]
		},
		
		{
			path: '/forgetPwdFirstStep',
			name: 'ForgetPwdFirstStep',
			component: forgetPwdFirstStep
		 },
		 {
			path: '/forgetPwdSecondStep',
			name: 'ForgetPwdSecondStep',
			component: forgetPwdSecondStep
		 },

		{
			path: '/personal',
			name: 'Personal',
			component: personal
		},
		
		{
			path: '/globalCouponIndex',
			name: 'GlobalCouponIndex',
			component: globalCouponIndex
		}
	]
})
