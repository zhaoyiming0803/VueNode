import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './routes'

const router = createRouter({
  history: createWebHashHistory(),
  // base: '/tour/',
  routes
})

router.afterEach((to, from) => {
  document.title = '锦囊团'
});

export default router
