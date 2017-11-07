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
    <!-- contents -->
    <div v-if="currentState==='STATE_COMPLETE'" class="ui container stackable grid mastbody">
      <!-- stats users -->
      <div class="ui eight wide column">
        <div class="ui text blue">
          <h2 class="ui left floated header">Nombre d'tilisateurs</h2>
          <div class="ui clearing divider"></div>
          <p>Voici un bon indicateur du taux d'utilisation du site, il faut continuer comme ça...</p>
          <div class="ui statistics">
            <div class="statistic">
              <div class="value">{{statsUsers.total}}</div>
              <div class="label">Utilisateurs<br />au total</div>
            </div>
            <div class="statistic">
              <div class="value">{{statsUsers.lasts}}</div>
              <div class="label">Inscriptions<br />novembre</div>
            </div>
          </div>
        </div>
      </div>
      <!-- stats answers -->
      <div class="ui eight wide column">
        <div class="ui text blue">
          <h2 class="ui left floated header">Taux de réponses</h2>
          <div class="ui clearing divider"></div>
          <p>Calcul en pourcentage du rapport entre le nombre de questionnaires remplis finalement utilisables et le nombre total de contacts réalisés. Dans le cas d'une enquête en vis-à-vis, cet indicateur permet notamment d'apprécier la compétence des enquêteurs à sensibiliser les répondants à participer à l'enquête.</p>
          <div class="ui statistics">
            <div class="statistic">
              <div class="value">{{statsAnswers.total}}</div>
              <div class="label">Réponses<br />au total</div>
            </div>
            <div class="statistic">
              <div class="value">{{statsAnswers.lasts}}</div>
              <div class="label">Réponses<br />novembre</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./script.js" />
<style scoped src="./style.css" />
