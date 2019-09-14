import Vue from 'vue';
import Router from 'vue-router';
import routes from './routes';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: '/tour/',
  routes
});

router.afterEach((to, from) => {
  document.title = '锦囊团';
});

export default router;