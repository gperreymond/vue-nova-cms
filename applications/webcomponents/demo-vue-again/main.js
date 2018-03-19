/* eslint-disable no-new */

import Vue from 'vue'
import SuiVue from 'semantic-ui-vue'
import 'semantic-ui-css/semantic.min.css'

import VueCustomElement from 'vue-custom-element'
import WebComponent from './index.vue'

Vue.use(SuiVue)
Vue.use(VueCustomElement)
Vue.use(WebComponent)
Vue.customElement('demo-vue-again', WebComponent)
