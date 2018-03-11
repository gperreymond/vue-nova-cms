<template>
  <div>
    <p><b>WebComponent: Demo Again VueJS</b></p>
    <p><a href="https://fr.vuejs.org/v2/guide/state-management.html" target="_blank">state management</a></p>
    <p v-if="state.components">
      <label>components: {{ state.components.length }}</label>
      <ul>
        <li v-for="item in state.components">{{ item.type }} -- {{ item._uid }}</li>
      </ul>
    </p>
  </div>
</template>

<script src="./script.js" />
