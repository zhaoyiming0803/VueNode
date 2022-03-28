import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'

const router = createRouter({
  history: createWebHistory('/tour/'),
  routes
})

router.afterEach((to, from) => {
  document.title = '锦囊团'
})

export default router
