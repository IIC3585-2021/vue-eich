<template>
    <div class="nav-bar">
        <router-link :to="{ name: 'Hello' }" class="logo" > WikiEich </router-link>
        <router-link :to="{ name: 'Document' }" class="other"> Documentos </router-link>
        <!-- <router-link :to="{ name: 'Search' }">Buscador</router-link>
        <router-link :to="{ name: 'Ideas' }">Generación de Ideas</router-link>
        <router-link :to="{ name: 'Questions' }">Preguntas - Respuestas</router-link> -->

    </div> 
</template>

<script>

export default {
  name: 'NavBar'
}
</script>

<style scoped>
    .nav-bar{
      background-color: #52739B;
      width: calc(100% - 6vw);
      height: 12vh;
      position: relative;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      padding: 0 3vw;
      -webkit-box-shadow: 0 10px 6px -6px #777;
      -moz-box-shadow: 0 10px 6px -6px #777;
      box-shadow: 0 10px 6px -6px #777;
    }

    .logo {
        margin: 0;
        color: #081E39;
        font-size: 2vw;
        font-weight: 600;
        text-decoration: none;
        margin-right: 30px;
      }
    
    .other {
      color: white;
      font-size: 1.3vw;
      font-weight: 400;
      text-decoration: none;
      margin-right: 30px;
    }
  
</style>