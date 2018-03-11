import Vue from 'vue'

if (!window.EventBus) {
  window.EventBus = new Vue()
}

export const EventBus = window.EventBus
