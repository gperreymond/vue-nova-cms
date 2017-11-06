import authControl from './methods/authControl'

export default {
  name: 'application',
  data: function () {
    return {
      currentState: 'STATE_INITIALIZE',
      user: {
        connected: false
      },
      message: 'Hello, it is this easy!'
    }
  },
  mounted: function () {
    console.log('mounted')
    this.authControl()
  },
  updated: function () {
    console.log('updated')
    if (this.currentState === 'STATE_INITIALIZE') this.authControl()
  },
  destroyed: function () {
    console.log('destroyed')
  },
  methods: {
    authControl,
    showError: function (error) {
      console.log('showError')
      console.error(error)
    }
  }
}
