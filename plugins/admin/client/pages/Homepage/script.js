import Debug from 'debug'

import authControl from './methods/authControl'
import authLogout from './methods/authLogout'
import getUsersStatistics from './methods/getUsersStatistics'

export default {
  name: 'ui-application',
  data: function () {
    return {
      currentState: 'STATE_INITIALIZE',
      user: {
        connected: false
      },
      stats: {
        users: 0,
        lasts: 0
      }
    }
  },
  mounted: function () {
    this.debug('mounted')
    this.authControl()
    this.getUsersStatistics()
  },
  updated: function () {
    this.debug('updated')
    if (this.currentState === 'STATE_INITIALIZE') this.authControl()
  },
  destroyed: function () {
    this.debug('destroyed')
  },
  methods: {
    debug: Debug('nova:admin:ui-application'),
    authControl,
    authLogout,
    getUsersStatistics,
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
