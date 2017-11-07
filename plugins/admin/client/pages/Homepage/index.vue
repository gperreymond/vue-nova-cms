<template>
  <div class="holder">
    <!-- inclideIn STATE_INITIALIZE -->
    <ui-loader v-if="currentState==='STATE_INITIALIZE'" />
    <!-- inclideIn STATE_COMPLETE -->
    <div v-if="currentState==='STATE_COMPLETE'">
      <header>
        <div class="logo">
          <h1 class="header dark-blue-text">NOVA</h1>
          <h4 class="header black-text">Administrator</h4>
        </div>
        <button v-on:click="authLogout" type="button" class="button flat logout">Logout</button>
      </header>
      <div class="content">

      </div>
    </div>
  </div>
</template>

<script src="./script.js" />
<style scoped src="./style.css" />
