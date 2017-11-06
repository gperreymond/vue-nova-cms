/* eslint-disable no-new */

import Vue from 'vue'
import Application from '@/components/Application'

Vue.config.productionTip = false

new Vue({
  el: '#application',
  template: '<Application/>',
  components: { Application }
})
