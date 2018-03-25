import debug from 'debug'
import authLogin from './methods/authLogin'

export default {
  name: 'ui-login',
  data: function () {
    return {
      state: false
    }
  },
  created: function () {
    this.debug('created (internal)')
  },
  mounted: function () {
    this.debug('mounted (internal)')
    // this.$estore.setState('debug', 'wtf')
  },
  updated: function () {
    this.debug('updated (internal)')
  },
  destroyed: function () {
    this.debug('destroyed (internal)')
  },
  methods: {
    debug: debug('nova:admin:login'),
    authLogin
  }
}
