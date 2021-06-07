<template>
    <div>
        <div v-show=show>
            <div>
                <p>Ingrese su palabra o frase</p>
                <form @submit.prevent="processForm">
                    <input v-model="phrase" type="text" placeholder="Palabra" name="phrase">
                    <input type="submit" value="Submit">
                </form>
            </div>
        </div>
        <div class="document" v-show=!show>
            <div class="left-document-container">
                <div v-for="(document, index) in documentIndexes" :key="index">
                    <button class="menu-item" v-on:click="currentDoc = index">
                        {{documentList[document.document].title}}
                    </button>
                </div>
            </div>
          
            <div class="right-document-container">
              <p class="title"> {{documentList[currentDoc].title}} </p>
              <p>{{documentList[currentDoc].body}}</p>
            </div>
            
        </div>
    </div>
</template>

<script>
import {db} from '../firebase/firebase';
import axios from 'axios';
import apiKey from '../variables/apiKey';

export default {
    data(){
        return{
            phrase: '',
            show: true,
            documentList: [],
            documentIndexes: [],
            currentDoc: 0,
        }
    },
    methods:{
        created: ()=> {
            this.$forceUpdate();
        },
        nose: () => {console.log("HOLA")},
        processForm: async function() {

            
            const documents2 = await db.collection('documents').get().then(querySnapshot => {
                const documents = querySnapshot.docs.map(doc => doc.data())
                // do something with documents
                console.log(documents)
                console.log(typeof documents)
                return documents
            })

            console.log("???", documents2)
            this.documentList = documents2

            const apiKey = await db.collection('variables').doc('api').get().then(
                snapshot => {
                    return snapshot.data()
                }
            ).catch((err) => {console.log("EEROR", err)})
            const headers = {
                "Content-Type": "application/json",
                "Authorization": apiKey.key
            }

            const getAi = async function(documents, phrase) {
                let bodies = [];
                documents.forEach(element => {
                    bodies.push(element.body)
                });
                const response = await axios.post('https://api.openai.com/v1/engines/davinci/search', {
                    documents: bodies,
                    query: phrase
                },{
                headers: headers
                }).then(
                    (response) => {
                        return response;
                    }
                ).catch((error) => {console.log(error)})
                console.log("WII", response.data)
                return response
            }
            const response = await getAi(documents2, this.phrase)
            console.log("$$$$", typeof this.phrase, response.data.data)
            const sorted = response.data.data.sort((a, b) => (a.score < b.score)? 1: -1)
            console.log(sorted)
            this.documentIndexes = sorted
            this.show = false
            // getAi
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
        width: 80%;
        background-color: white;
        overflow-y: scroll;
        overflow-x: hidden;
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