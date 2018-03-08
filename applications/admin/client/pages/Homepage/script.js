import Debug from 'debug'

import authControl from './methods/authControl'
import authLogout from './methods/authLogout'
import getUsersStatistics from './methods/getUsersStatistics'
import getAnswersStatistics from './methods/getAnswersStatistics'

export default {
  name: 'ui-application',
  data: function () {
    return {
      currentState: 'STATE_INITIALIZE',
      user: {
        connected: false
      },
      statsUsers: {
        total: 0,
        lasts: 0
      },
      statsAnswers: {
        total: 0,
        lasts: 0
      }
    }
  },
  beforeMount: function () {
    this.debug('beforeMount')
    // this.authControl()
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
    debug: Debug('nova:admin:ui-application'),
    authControl,
    authLogout,
    getUsersStatistics,
    getAnswersStatistics,
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
      this.getUsersStatistics()
      this.getAnswersStatistics()
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
