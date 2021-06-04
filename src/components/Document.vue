<template>
  <div class="document">
    <div class="left-document-container">
        <div v-for="(document, index) in documentList" :key="document">
              <button class="menu-item" v-on:click="currentDoc= index">
                {{document.title}}
              </button>
        </div>
    </div>
    <div class="right-document-container">
      <p class="title"> {{documentList[currentDoc].title}} </p>
      <p>{{documentList[currentDoc].body}}</p>
    </div>
  </div>
</template>

<script>
import {db} from '../firebase/firebase';

export default {
  name: 'Document',
  data(){
      return {
          documentList: [],
          currentDoc: 0,
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
        color: #25427b;
    }
    .left-document-container{
        width: 30%;
        padding: 0;
        border: none;
        background: #DFE0E1;
        width: calc(22vw - .5px);
        border-right: .5px solid #25427B;
;
    }
    .right-document-container{
        width: 70%;
        background-color: white;
    }
    .menu-item {
      padding: 8px;
      border: none;
      background: none;
      font-size: 1.3vw;
      border-bottom: .5px solid #25427B;
      font-weight: 400;
      width: 100%;
    }

    .title {
      color: #081E39;
      font-size: 2vw;
      font-weight: 600;
    }
</style>