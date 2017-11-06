<template>
  <div class="holder">
    <ui-loader v-if="currentState==='STATE_INITIALIZE'" />
    <div v-if="currentState==='STATE_COMPLETE'" class="ui inverted vertical masthead center aligned segment">
      <div class="ui container">
        <div class="ui large secondary inverted pointing menu">
          <a class="active item">Home</a>
          <a class="item">Users</a>
          <div class="right item">
            <a v-on:click="authLogout" class="ui inverted red button">Logout</a>
          </div>
        </div>
      </div>
      <div class="ui text container">
      <h1 class="ui inverted header">Imagine-a-Company</h1>
      <h2>Do whatever you want when you want to.</h2>
      <div class="ui huge primary button">Get Started <i class="right arrow icon"></i></div>
    </div>
    </div>
  </div>
</template>

<script src="./script.js" />
<style scoped src="./style.css" />
