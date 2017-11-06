<template>
  <div id="application">
    <div v-if="currentState==='STATE_COMPLETE'">
      <h1 v-if="!user.connected">LOADING IN PROGRESS...</h1>
      <h1 v-if="user.connected">{{ message }}</h1>
    </div>
  </div>
</template>

<script src="./script.js" />
<style scoped src="./style.css" />
