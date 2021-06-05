<template>
    <div>
        <div v-show=show>
            <div>
                <p>title</p>
            </div>
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
                <ul v-for="(document, index) in documentIndexes" :key="document">
                    <li>
                    <button class="title" v-on:click="currentDoc= index">
                        {{documentList[document.document].title}}
                    </button>
                    </li>
                </ul>
            </div>
            <!-- <div class="right-document-container">
                <p>{{documentList[currentDoc].body}}</p>
            </div> -->
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
            documentIndexes: []
        }
    },
    methods:{
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

            const headers = {
                "Content-Type": "application/json",
                "Authorization": "Bearer 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"
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