<template>
  <div class="content full center no-border">
    <h1 class="title">NOVA</h1>
    <h3 class="title">Administrator</h3>
    <div class="content login">
      <h3 class="dark-red-text">Vous êtes un étranger</h3>
      <p>Nous n’avons trouvé aucune trace de votre passage.</p>
      <button v-on:click="authLogin" class="button dark-red">Google +</button>
    </div>
  </div>
</template>

<script src="./script.js" />
<style scoped src="./style.css" />
