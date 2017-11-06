/* eslint-disable no-new */

import Vue from 'vue'
import VueRouter from 'vue-router'

import '@/styles/main.css'

import Homepage from '@/pages/Homepage'
import Login from '@/pages/Login'
import Loader from '@/components/Loader'

Vue.use(VueRouter)
Vue.config.productionTip = false

Vue.component('ui-loader', Loader)

const routes = [
  { path: '/admin', component: Homepage },
  { path: '/admin/login', component: Login }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

new Vue({
  el: '#application',
  router,
  components: {
    Loader
  }
}).$mount('#application')
