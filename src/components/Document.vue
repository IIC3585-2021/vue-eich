<template>
  <div class="document">
    <div class="left-document-container">
        <ul v-for="(document, index) in documentList" :key="document">
            <li>
              <button class="title" v-on:click="currentDoc= index">
                {{document.title}}
              </button>
              <button class="favourite" v-on:click="save(document.id)">Guardar</button>
            </li>
        </ul>
    </div>
    <div class="right-document-container">
      <p>{{documentList[currentDoc].body}}</p>
    </div>
  </div>
</template>

<script>
import {db} from '../firebase/firebase';
import store from '../store/store';

export default {
  name: 'Document',
  data(){
      return {
          documentList: [],
          currentDoc: 0,
      }
  },
  methods: {
    save: (id) => {
      const favs = store.state.favourites
      if (!(id in favs)){
        console.log("BIEN")
        store.commit('save', id)
      }
      console.log("GUARDADO", store.state.favourites)
    }
  },
  firestore: {
      documentList: db.collection('documents')
  }
}
</script>

<style scoped>
    .document{
        width: 100vw;
        height: 90vh;
        display: flex;
        flex-direction: row;
    }
    .left-document-container{
        width: 30%;
        background-color: honeydew;
    }
    .right-document-container{
        width: 70%;
        background-color: hotpink;
    }
    .title {
      padding: 0;
      border: none;
      background: none;
    }
</style>