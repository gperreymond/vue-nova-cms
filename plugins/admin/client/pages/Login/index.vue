<template>
  <div class="holder">
    <div class="ui middle aligned grid">
      <div class="eight column wide">
        <div class="ui card">
          <div class="content">
            <div class="header">Nova</div>
          </div>
          <div class="content">
            <h4 class="ui sub header">Administrator</h4>
            <div class="ui small feed">
              Identification
              Vous êtes un étranger, montrez-vous sous votre meilleur profil !
            </div>
          </div>
          <div class="extra content footer">
            <button v-on:click="authLogin" class="ui button large red">Google +</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./script.js" />
<style scoped src="./style.css" />
