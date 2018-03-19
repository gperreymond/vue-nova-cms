<template>
  <div class="card">
    <h4>WebComponents</h4>
    <p v-if="state.components">
      <label>components: {{ state.components.length }}</label>
      <ul>
        <li v-for="item in state.components">{{ item.type }} -- {{ item._uid }}</li>
      </ul>
    </p>
    <sui-button color="blue" content="Like">
      <a is="sui-label" slot="label" basic color="blue" pointing="left">2,048</a>
    </sui-button>
  </div>
</template>

<script src="./script.js" />
<style scoped src="./style.css" />
