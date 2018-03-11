import Vue from 'vue'
import { remove } from 'lodash'

if (!window.EventStore) {
  // create the singleton
  console.log('[EventStore] create singleton')
  const EventStore = new Vue({
    data: {
      type: '[EventStore]',
      state: {
        components: []
      }
    }
  })
  // event: EVENT_STORE_UPDATED
  EventStore.EVENT_INITIALIZE_STORE = 'EventInitializeStore'
  // event: EventComponentMounted
  EventStore.EVENT_COMPONENT_MOUNTED = 'EventComponentMounted'
  EventStore.$on(EventStore.EVENT_COMPONENT_MOUNTED, function (component) {
    console.log(this.type, 'a new component is mounted', component._uid, component.type)
    this.state.components.push({
      _uid: component._uid,
      type: component.type
    })
    EventStore.$emit(EventStore.EVENT_INITIALIZE_STORE, this.state)
  })
  // event: EventDestroyComponent
  EventStore.EVENT_DESTROY_COMPONENT = 'EventDestroyComponent'
  EventStore.$on(EventStore.EVENT_DESTROY_COMPONENT, function (component) {
    console.log(this.type, 'a component will be destroyed', component._uid, component.type)
    this.state.components = remove(this.state.components, item => {
      return item._uid !== component._uid
    })
    component.$el.remove()
    component.$destroy()
    component = null
  })
  // expose the singleton
  window.EventStore = EventStore
}
export const EventStore = window.EventStore
