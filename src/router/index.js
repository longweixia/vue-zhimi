import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home/Home'
import GroupChart from '@/views/GroupChart/GroupChart'
import Login from '@/views/login/Login'
import WriteBaseInfo from '@/views/resume1/WriteBaseInfo'
import CompletionResume from '@/views/resume1/CompletionResume'

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
    },
    {
      path: '/completionResume',
      name: 'completionResume',
      component: CompletionResume
    },
    {
      path: '/groupChart',
      name: 'groupChart',
      component: GroupChart
    }
  ]
})
