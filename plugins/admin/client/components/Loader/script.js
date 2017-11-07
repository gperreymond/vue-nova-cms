import Debug from 'debug'

export default {
  name: 'ui-loader',
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
    debug: Debug('nova:admin:ui-loader')
  }
}