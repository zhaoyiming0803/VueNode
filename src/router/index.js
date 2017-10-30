/*
 * Description: Vue路由
 * User: zhaoyiming
 * Date: 2017/10/1
*/

window.localStorage.role = 'editor';

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

const serverRoutes = [
	{
		id: 1,
		pid: 0,
		meta: {autoRequire: true},
		path: '/accountIndex',
		name: 'AccountIndex',
		component: accountIndex
	},
	{
		id: 2,
		pid: 1,
		meta: {autoRequire: true},
		path: '/accountIndex/login',
		name: 'Login',
		component: login
	},
	{
		id: 3,
		pid: 1,
		meta: {autoRequire: true},
		path: '/accountIndex/regist',
		name: 'Regist',
		component: regist
	},
	
	{
		id: 4,
		pid: 0,
		meta: {autoRequire: true},
		path: '/forgetPwdFirstStep',
		name: 'ForgetPwdFirstStep',
		component: forgetPwdFirstStep
	 },
	 {
		id: 5,
		pid: 0,
		meta: {autoRequire: true},
		path: '/forgetPwdSecondStep',
		name: 'ForgetPwdSecondStep',
		component: forgetPwdSecondStep
	 },

	{
		id: 6,
		pid: 0,
		meta: {autoRequire: false},
		path: '/personal',
		name: 'Personal',
		component: personal
	},
	{
		id: 7,
		pid: 0,
		meta: {autoRequire: false},
		path: '/personalEdit',
		name: 'PersonalEdit',
		component: personalEdit
	},
	{
		id: 8,
		pid: 0,
		meta: {autoRequire: true},
		path: '/changeUserHeadpic',
		name: 'ChangeUserHeadpic',
		component: changeUserHeadpic
	},
	{
		id: 9,
		pid: 0,
		meta: {autoRequire: true},
		path: '/changeUserName',
		name: 'ChangeUserName',
		component: changeUserName
	},
	{
		id: 10,
		pid: 0,
		meta: {autoRequire: true},
		path: '/changeUserSex',
		name: 'ChangeUserSex',
		component: changeUserSex
	},

	{
		id: 11,
		pid: 0,
		meta: {autoRequire: true},
		path: '/globalCouponIndex',
		name: 'GlobalCouponIndex',
		component: globalCouponIndex
	},

	{
		id: 12,
		pid: 0,
		meta: {autoRequire: true},
		path: '/globalCouponList',
		name: 'GlobalCouponList',
		component: globalCouponList
	},

	{
		id: 13,
		pid: 0,
		meta: {autoRequire: true},
		path: '/getCoupon',
		name: 'GetCoupon',
		component: getCoupon
	}
]

const merge = (list, pid=0) => {
	const arry = [];
	list.forEach((item) => {
		if (item.pid === pid) {
			item.children = merge(list, item.id);
			arry.push(item);
		}
	});
	return arry;
};

const routes = merge(serverRoutes, 0);

const router = new Router({
	mode: 'abstract',
	routes
});

router.beforeEach((to, from, next) => {
	if (!to.meta.autoRequire) {
		if (to.meta.roles === undefined || to.meta.roles.some((item) => {return item===localStorage.role})) {
			next();
		} else {
			console.log('暂无权限');
			next({
				name: 'GlobalCouponList' // 模拟这里无权限时，返回到了自定义的提示页面
			});
		}
	} else {
		next();
	}
});


export default router;