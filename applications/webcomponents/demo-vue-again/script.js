import { EventStore } from '../_libs/vue-event-store.js'

export default {
  name: 'demo-vue-again',
  debug: false,
  props: [],
  data: function () {
    return {
      type: '[DemoVueAgain]',
      uuid: false,
      components: EventStore.components
    }
  },
  mounted: function () {
    console.log(this.type, this._uid, 'mounted')
    EventStore.$emit(EventStore.EVENT_COMPONENT_MOUNTED, this)
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
