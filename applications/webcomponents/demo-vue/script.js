import { VueEventStore } from '../_libs/vue-event-store'

export default {
  name: 'demo-vue',
  debug: false,
  props: [],
  data: function () {
    return {
      type: '[DemoVue]',
      uuid: false,
      isDestroyed: false
    }
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
    VueEventStore.$emit(VueEventStore.EVENT_COMPONENT_DESTROYED, this._uid)
  },
  methods: {
    destroyMe: function () {
      this.$el.remove()
      this.$destroy()
    }
  }
}
