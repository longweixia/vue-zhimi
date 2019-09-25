import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home/Home'
import GroupChart from '@/views/GroupChart/GroupChart'
import Login from '@/views/login/Login'
import WriteBaseInfo from '@/views/resume/WriteBaseInfo'
import ResumeTemplate1 from '@/views/resume/ResumeTemplate/ResumeTemplate1'
import TemplateMall from '@/views/templateMall/TemplateMall'   
import WriteResumeIde from '@/views/resume/WriteResumeIde'   
import WriteIdeHeader from '@/views/resume/ResumeTemplateCommon/WriteIdeHeader'   
import WriteIdeSiderLeft from '@/views/resume/ResumeTemplateCommon/WriteIdeSiderLeft'   
import WriteResumeTemplate1 from '@/views/resume/WriteResumeTemplate/WriteResumeTemplate1'
import WriteResumeTemplate2 from '@/views/resume/WriteResumeTemplate/WriteResumeTemplate2'


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
        },
        {
            path: '/templateMall',
            name: 'templateMall',
            component: TemplateMall
        },
        {
            path: '/writeResumeIde',
            name: 'writeResumeIde',
            component: WriteResumeIde
        },
        {
            path: '/writeIdeHeader',
            name: 'writeIdeHeader',
            component: WriteIdeHeader
        },
        {
            path: '/writeIdeSiderLeft',
            name: 'writeIdeSiderLeft',
            component: WriteIdeSiderLeft
        },
        {
            path: '/writeIdeSiderLeft',
            name: 'writeIdeSiderLeft',
            component: WriteIdeSiderLeft
        },
        {
            path: '/writeResumeTemplate1',
            name: 'writeResumeTemplate1',
            component: WriteResumeTemplate1
        },
        {
            path: '/writeResumeTemplate2',
            name: 'writeResumeTemplate2',
            component: WriteResumeTemplate2
        }
    ]
})