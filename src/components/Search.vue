<template>
    <div>
        <div>
            <div>
                <p>title</p>
            </div>
            <div>
                <p>Ingrese su palabra o frase</p>
                <form @submit.prevent="processForm">
                    <input type="text" placeholder="Palabra" name="phrase">
                    <input type="submit" value="Submit">
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import openai from '../AI/openAi';
import {db} from '../firebase/firebase';

export default {
    data(){
        return{
            phrase: ''
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

            // console.log(typeof documents)
            // console.log(documents.map((document) => {
            //     document.body
            // }))
  

            const getAi = async function() {
                const gptResponse = await openai.search({
                    engine: 'davinci',
                    documents: documents.map(()=> {

                    }),
                    query: ths.phrase


                });
                console.log(gptResponse.data)
            }
            // getAi
        }
    }
}
</script>