// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import App from './App'
import $ from 'jquery'
import 'babel-polyfill'
import './assets/css/bootstrap.min.css'  
import './assets/js/bootstrap' 
import Vuex from 'vuex'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

Vue.use(ElementUI)

Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(Vuex)
Vue.config.productionTip = false

import routes from './config/router'  
// 使用配置文件规则  
const router = new VueRouter({  
  mode: 'history',  
  base: __dirname,  
  routes: routes })  
/* eslint-disable no-new */

const store = new Vuex.Store({
  state: {
    placeId: "1101001",
    tableallCode:[],   //当前页的所有code  12个
		tableselectCode:[],
  },
  mutations: {
    changePlace (state , c) {
      state.placeId = c.placeId;
    }
  }
})
const app = new Vue({  
      router: router,  
      store:store,
      render: h => h(App)  
}).$mount('#app')  



