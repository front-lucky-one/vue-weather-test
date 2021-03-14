import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '@/views/Main'
import DetailAboutWeather from '@/views/DetailAboutWeather'


Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Main',
        component: Main,
        meta: { layout: 'main' }
    },
    {
        path: '/:id/:name',
        name: 'DetailAboutWeather',
        component: DetailAboutWeather,
        meta: { layout: 'main' }
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router