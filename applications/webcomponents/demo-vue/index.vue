<template>
  <div class="card" v-if="isDestroyed === false">
    <h4>WebComponent: {{ _uid }}</h4>
    <p><button type="button" @click="increment">count: {{ state.count }}</button></p>
    <p><button type="button" @click="destroyMe">destroy me!</button></p>
  </div>
</template>

<script src="./script.js" />
<style scoped src="./style.css" />
