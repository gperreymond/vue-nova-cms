<template>
  <div class="holder">
    <!-- inclideIn STATE_INITIALIZE -->
    <ui-loader v-if="currentState==='STATE_INITIALIZE'" />
    <!-- inclideIn STATE_COMPLETE -->
    <div v-if="currentState==='STATE_COMPLETE'" class="page">
      <header>
        <div class="content header">
          <div class="logo">
            <h1 class="header dark-blue-text">NOVA</h1>
            <h4 class="header black-text">Administrator</h4>
          </div>
          <button v-on:click="authLogout" type="button" class="button flat logout">Logout</button>
        </div>
      </header>
      <div class="content no-border body">
        <div class="statistic">
          <h2 class="dark-green-text">Utilisateurs</h2>
          <hr />
          <h5>Le nombre d'ulisateurs est un KPI essentiel à suivre.</h5>
          <p></p>
          <p>{{statsUsers.total}} utilisateurs en tout</p>
          <p>{{statsUsers.lasts}} utilisateurs le mois dernier</p>
        </div>
        <div class="statistic">
          <h2 class="dark-green-text">Réponses</h2>
          <hr />
          <h5>Les sondages, et par extensions les réponses sont le coeur du système.</h5>
          <p></p>
          <p>{{statsAnswers.total}} réponses en tout</p>
          <p>{{statsAnswers.lasts}} réponses le mois dernier</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./script.js" />
<style scoped src="./style.css" />
