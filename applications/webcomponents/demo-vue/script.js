import { VueEventStore } from '../_libs/vue-event-store'

export default {
  name: 'demo-vue',
  debug: false,
  props: [],
  data: function () {
    return {
      type: '[DemoVue]',
      uuid: false,
      isDestroyed: false,
      state: {
        count: 0
      }
    }
  },
  created: function () {
    VueEventStore.$on(VueEventStore.EVENT_STORE_UPDATED, (state) => {
      this.state = { ...this.state, ...state }
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
    VueEventStore.$emit(VueEventStore.EVENT_COMPONENT_DESTROYED, this._uid)
  },
  methods: {
    increment: function () {
      this.state.count++
      VueEventStore.$emit(VueEventStore.EVENT_STORE_UPDATED, this.state)
    },
    destroyMe: function () {
      this.$el.remove()
      this.$destroy()
    }
  }
}
