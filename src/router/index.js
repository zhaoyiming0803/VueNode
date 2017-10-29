/*
 * Description: Vue路由
 * User: zhaoyiming
 * Date: 2017/10/1
*/

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

// 编辑个人信息
const personalEdit = () => import('@/components/personal/personal-edit.vue');
const changeUserHeadpic = () => import('@/components/personal/change-headpic.vue');
const changeUserName = () => import('@/components/personal/change-username.vue');
const changeUserSex = () => import('@/components/personal/change-usersex.vue');

// 首页
const globalCouponIndex = () => import('@/components/global-coupon/index.vue');

//全球优惠券列表页
const globalCouponList = () => import('@/components/global-coupon-list/index.vue');

// 领取优惠券
const getCoupon = () => import('@/components/get-coupon/index.vue');

Vue.use(Router);
Vue.use(Resource);

export default new Router({
	mode: 'abstract',
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
			path: '/personalEdit',
			name: 'PersonalEdit',
			component: personalEdit
		},
		{
			path: '/changeUserHeadpic',
			name: 'ChangeUserHeadpic',
			component: changeUserHeadpic
		},
		{
			path: '/changeUserName',
			name: 'ChangeUserName',
			component: changeUserName
		},
		{
			path: '/changeUserSex',
			name: 'ChangeUserSex',
			component: changeUserSex
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
			path: '/getCoupon',
			name: 'GetCoupon',
			component: getCoupon
		}
	]
})
