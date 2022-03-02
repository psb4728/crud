import { createRouter, createWebHistory } from 'vue-router'
import FreeboardList from '../views/FreeboardList.vue'
import FreeboardWrite from '../views/FreeboardWrite.vue'
import FreeboardDetail from '../views/FreeboardDetail.vue'
import FreeboardRetouch from '../views/FreeboardRetouch.vue'

const routes = [
  {
    path: '/',
    name: 'freeboard',
    component: FreeboardList
  },
  {
    path: '/write',
    name: 'write',
    component: FreeboardWrite
  },
  {
    path: '/detail',
    name: 'detail',
    component: FreeboardDetail
  },
  {
    path: '/retouch',
    name: 'retouch',
    component: FreeboardRetouch
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
