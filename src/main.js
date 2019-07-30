// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
// 引入axios
import axios from 'axios'  
// 挂载到vue原型链上
Vue.prototype.axios = axios

Vue.use(iView);
// 按需引入iview组件
// import { Button, Layout,Header,Content,Footer } from 'iview';
// Vue.component('Button', Button);
// Vue.component('Layout', Layout);
// Vue.component('Header', Header);
// Vue.component('Content', Content);
// Vue.component('Footer', Footer);



Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
