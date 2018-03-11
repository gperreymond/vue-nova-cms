import Vue from 'vue'
import { remove } from 'lodash'

if (!window.VueEventStore) {
  // create the singleton
  console.log('[VueEventStore] create singleton')
  const VueEventStore = new Vue({
    data: {
      type: '[VueEventStore]',
      state: {
        components: []
      }
    }
  })
  // event: EVENT_STORE_UPDATED
  VueEventStore.EVENT_STORE_UPDATED = 'VueEventStoreUpdated'
  // event: EventComponentMounted
  VueEventStore.EVENT_COMPONENT_MOUNTED = 'EventComponentMounted'
  VueEventStore.$on(VueEventStore.EVENT_COMPONENT_MOUNTED, function (component) {
    console.log(this.type, 'a new component is mounted', component._uid, component.type)
    this.state.components.push({
      _uid: component._uid,
      type: component.type
    })
    this.$emit(VueEventStore.EVENT_STORE_UPDATED, this.state)
  })
  // event: EventDestroyComponent
  VueEventStore.EVENT_COMPONENT_DESTROYED = 'EventComponentDestroyed'
  VueEventStore.$on(VueEventStore.EVENT_COMPONENT_DESTROYED, function (_uid) {
    this.state.components = remove(this.state.components, item => {
      if (item._uid === _uid) { console.log(this.type, 'a component has been destroyed', _uid) }
      return item._uid !== _uid
    })
    this.$emit(VueEventStore.EVENT_STORE_UPDATED, this.state)
  })
  // expose the singleton
  window.VueEventStore = VueEventStore
}
export const VueEventStore = window.VueEventStore
