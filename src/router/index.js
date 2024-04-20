import {createRouter,createWebHistory} from 'vue-router'

const routes = [
    {
        path:'/',
        component:() => import('@/views/Preview/index.vue')
    },
    {
        path:'/result',
        component:() => import ('../views/Result/index.vue')
    }
]

const router = createRouter({
    history:createWebHistory(),
    routes
})
export default router