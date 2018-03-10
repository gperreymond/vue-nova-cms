import debug from 'debug'

import authControl from './methods/authControl'
import authLogout from './methods/authLogout'

export default {
  name: 'ui-application',
  data: function () {
    return {
      currentState: 'STATE_INITIALIZE',
      user: {
        connected: false
      }
    }
  },
  beforeMount: function () {
    this.debug('beforeMount')
  },
  mounted: function () {
    this.debug('mounted')
    if (this.currentState === 'STATE_INITIALIZE') this.authControl()
  },
  updated: function () {
    this.debug('updated')
  },
  destroyed: function () {
    this.debug('destroyed')
  },
  methods: {
    debug: debug('nova:admin:ui-application'),
    authControl,
    authLogout,
    connected: function (data) {
      this.user = {
        connected: true,
        token: data.token,
        account: {
          id: data.account.item.id,
          email: data.account.item.email,
          provider: data.account.item.provider
        }
      }
      this.debug('user connected %o', this.user)
    },
    disconnected: function () {
      this.debug('user disconnected')
      this.user = { connected: false }
    },
    catchError: function (error) {
      this.debug('catchError %o', error)
      if (error.status === 401) this.$router.push('/admin/login')
    }
  }
}
