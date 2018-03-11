/* eslint-disable no-new */

import Vue from 'vue'

import VueCustomElement from 'vue-custom-element'
import WebComponent from './index.vue'

Vue.use(VueCustomElement)
Vue.use(WebComponent)
Vue.customElement('demo-vue-again', WebComponent)
