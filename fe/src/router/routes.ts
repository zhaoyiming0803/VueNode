import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home'
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
  },
  {
    path: '/change-user-name',
    name: 'ChangeUserName',
    component: () => import('@/pages/personal/change-user-name.vue')
  },
  {
    path: '/change-user-sex',
    name: 'ChangeUserSex',
    component: () => import('@/pages/personal/change-user-sex.vue')
  },
  {
    path: '/wechat',
    name: 'Wechat',
    component: () => import('@/pages/wechat/index.vue')
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('@/pages/wechat/auth.vue')
  }
]

export default routes
