import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home/Home'
import Login from '@/views/login/Login'
import WriteBaseInfo from '@/views/resume1/WriteBaseInfo'

Vue.use(Router)

export default new Router({
  routes: [
    {
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
    }
  ]
})
