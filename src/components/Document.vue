<template>
  <div class="document">
    <div class="left-document-container">
        <ul v-for="document in documentList" :key="document">
            <li>{{document.title}}</li>
        </ul>
    </div>
    <div class="right-document-container">
      It's a digital currency in which encryption techniques are used to regulate the generation of units of currency 
      and verify the transfer of funds, operating independently of a central bank.
    </div>
  </div>
</template>

<script>
import {db} from '../firebase/firebase';

export default {
  name: 'Document',
  data(){
      return {
          documentList: []
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
</style>