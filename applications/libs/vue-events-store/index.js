import debug from 'debug'

function install (Vue) {
  Vue.mixin({
    mounted: function () {
      if (!window.VueEventsStore) { return false }
      if (this.debug) { this.debug('mounted (mixin)') }
      window.VueEventsStore.$emit('EVENT_COMPONENT_MOUNTED', this)
    },
    destroyed: function () {
      if (!window.VueEventsStore) { return false }
      if (this.debug) { this.debug('destroyed (mixin)') }
      window.VueEventsStore.$emit('EVENT_COMPONENT_DESTROYED', this)
    },
    created: function () {
      if (!window.VueEventsStore && this.$options.name !== 'events-store') {
        window.VueEventsStore = new Vue({
          name: 'events-store',
          data: function () {
            return {
              components: {}
            }
          },
          methods: {
            debug: debug('nova:events-store')
          }
        })
        // event component mounted
        window.VueEventsStore.$on('EVENT_COMPONENT_MOUNTED', function (component) {
          this.debug('component monted')
          this.components[component._uid] = component
        })
        // event component destroyed
        window.VueEventsStore.$on('EVENT_COMPONENT_DESTROYED', function (component) {
          this.debug('component destroyed')
          delete this.components[component._uid]
        })
      }
      if (!this.$options.name) { return false }
      this.debug('created (mixin)')
    }
  })
}

export default install

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(install)
  if (install.installed) {
    install.installed = false
  }
}
