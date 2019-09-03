import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: '/vue-cli3-typescript/',
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      name: 'Home',
      component: () => import('./pages/Home.vue'),
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('./pages/About.vue'),
    },
  ],
});
