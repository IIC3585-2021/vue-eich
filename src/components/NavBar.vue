<template>
    <div class="nav-bar">
        <router-link :to="{ name: 'Hello' }">Home</router-link>
        <router-link :to="{ name: 'Document' }">Documentos</router-link>
        <router-link :to="{ name: 'Search' }">Buscador</router-link>
        <!-- <router-link :to="{ name: 'Ideas' }">Generación de Ideas</router-link>
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
        background-color: grey;
        height: 10vh;
        display: flex;
        justify-content: flex-start;
    }
</style>