import { createRouter, createWebHashHistory } from 'vue-router'
import IndexPage from '~/pages/index.vue'

const routes = [
  {
    path: '/',
    component: IndexPage
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
