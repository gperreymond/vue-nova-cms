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
          <p>0 utilisateurs en tout</p>
          <p>0 utilisateurs le mois dernier</p>
        </div>
        <div class="statistic">
          <h2 class="dark-green-text">Articles</h2>
          <hr />
          <h5>Les articles, sont le coeur du système.</h5>
          <p></p>
          <p>0 articles en tout</p>
          <p>0 articles le mois dernier</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./script.js" />
<style scoped src="./style.css" />
