import debug from 'debug'
import authLogin from './methods/authLogin'

export default {
  name: 'ui-login',
  data: function () {
    return {
    }
  },
  mounted: function () {
    this.debug('mounted')
  },
  updated: function () {
    this.debug('updated')
  },
  destroyed: function () {
    this.debug('destroyed')
  },
  methods: {
    debug: debug('nova:admin:ui-login'),
    authLogin
  }
}
