<template>
  <div class="holder">
    <ui-loader v-if="currentState==='STATE_INITIALIZE'" />
    <!-- top menus -->
    <div v-if="currentState==='STATE_COMPLETE'" class="ui inverted vertical masthead center aligned segment">
      <div class="ui container">
        <div class="ui large secondary inverted pointing menu">
          <a href="/admin" class="active item">Home</a>
          <div class="right item">
            <a v-on:click="authLogout" class="ui inverted red button">Logout</a>
          </div>
        </div>
      </div>
      <div class="ui text container">
        <h2 class="ui header blue inverted">
          <div class="content">
            Homepage
            <div class="sub header">Bienvenue sur l'espace de travail.</div>
          </div>
        </h2>
      </div>
    </div>
    <!-- content -->
    <div v-if="currentState==='STATE_COMPLETE'" class="ui vertical stripe quote segment">
      <div class="ui container equal width stackable internally celled grid">
        <div class="row">
          <div class="ui text column">
            <h3 class="ui header">Utilisateurs</h3>
            <p>Voici un bon indicateur du taux d'utilisation du site, il faut continuer comme ça...</p>
          </div>
          <div class="ui statistics center aligned column">
            <div class="statistic">
              <div class="value">{{stats.users}}</div>
              <div class="label">Utilisateurs<br />au total</div>
            </div>
            <div class="statistic">
              <div class="value">{{stats.lasts}}</div>
              <div class="label">Inscriptions<br />novembre</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./script.js" />
<style scoped src="./style.css" />
