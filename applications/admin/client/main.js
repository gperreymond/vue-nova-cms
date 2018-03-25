/* eslint-disable no-new */

import Vue from 'vue'
import VueRouter from 'vue-router'

import '@/main.css'

import Homepage from '@/pages/Homepage'
import Login from '@/pages/Login'
import Loader from '@/components/Loader'
import EventsStore from '@libs/vue-events-store'

if (process.env.DEBUG === true) window.localStorage.debug = 'nova:*'

Vue.use(EventsStore)
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
  router,
  components: {
    Loader
  }
}).$mount('#root')
