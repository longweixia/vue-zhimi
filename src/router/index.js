import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home/Home'
import GroupChart from '@/views/GroupChart/GroupChart'
import Login from '@/views/login/Login'
import WriteBaseInfo from '@/views/resume/WriteBaseInfo'
import ResumeTemplate1 from '@/views/resume/ResumeTemplate/ResumeTemplate1'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/home',
            name: 'home',
            component: Home
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/writeBaseInfo',
            name: 'writeBaseInfo',
            component: WriteBaseInfo
        },
        {
            path: '/resumeTemplate1',
            name: 'resumeTemplate1',
            component: ResumeTemplate1
        },
        {
            path: '/groupChart',
            name: 'groupChart',
            component: GroupChart
        }
    ]
})