<template>
  <div v-if="isDestroyed === false">
    <p>
      <b>WebComponent: Demo VueJS</b><br />
      <label>uid: {{ _uid }}</label>
    </p>
    <p><button type="button" @click="destroyMe">destroy me!</button></p>
  </div>
</template>

<script src="./script.js" />
