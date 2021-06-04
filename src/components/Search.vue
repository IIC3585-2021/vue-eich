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
        processForm: async function() {

            const gptResponse = await openai.search({
                engine: 'davinci',
                documents: ["White House", "hospital", "school"],
                query: "the president"


            });
            console.log(gptResponse.data)
        }
    }
}
</script>