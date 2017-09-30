import Vue from 'vue';
import Router from 'vue-router';
import Resource from 'vue-resource';

// 登录、注册、找回密码等
const accountIndex = () => import('@/components/account/index.vue');
const login = () => import('@/components/account/login.vue');
const regist = () => import('@/components/account/regist.vue');
const forgetPwdFirstStep = () => import('@/components/account/forgetpwd-firststep.vue');
const forgetPwdSecondStep = () => import('@/components/account/forgetpwd-secondstep.vue');

// 个人中心
const personal = () => import('@/components/personal/index.vue');

// 首页
const globalCouponIndex = () => import('@/components/global-coupon/index.vue');

//全球优惠券列表页
const globalCouponList = () => import('@/components/global-coupon-list/index.vue');

// 领取优惠券
const getCoupon = () => import('@/components/get-coupon/index.vue');

Vue.use(Router);
Vue.use(Resource);

export default new Router({
	routes: [
		{
			path: '/',
			redirect: '/globalCouponIndex'
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
		},

		{
			path: '/globalCouponList',
			name: 'GlobalCouponList',
			component: globalCouponList
		},

		{
			path: '/getCoupon/:couponId/:showType',
			name: 'GetCoupon',
			component: getCoupon
		}
	]
})
