import { VueEventStore } from '../_libs/vue-event-store'

export default {
  name: 'demo-vue-again',
  debug: false,
  props: [],
  data: function () {
    return {
      type: '[DemoVueAgain]',
      uuid: false,
      state: {}
    }
  },
  created: function () {
    VueEventStore.$on(VueEventStore.EVENT_STORE_UPDATED, (state) => {
      this.state = state
    })
  },
  mounted: function () {
    console.log(this.type, this._uid, 'mounted')
    VueEventStore.$emit(VueEventStore.EVENT_COMPONENT_MOUNTED, this)
  },
  updated: function () {
    console.log(this.type, this._uid, 'updated')
  },
  destroyed: function () {
    console.log(this.type, this._uid, 'destroyed')
  },
  methods: {
  }
}
