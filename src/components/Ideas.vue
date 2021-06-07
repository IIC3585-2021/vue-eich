<template>
    <div>
        <div v-show=show>
            <div>
                <p>title</p>
            </div>
            <div>
                <p>Ingrese palabra para generar ideas parecidas</p>
                <form @submit.prevent="processIdea">
                    <input v-model="idea" type="text" placeholder="Idea" name="idea">
                    <input type="submit" value="Submit">
                </form>
            </div>
        </div>
        <div class="document" v-show=!show>
            <div class="left-document-container">
                <ul v-for="(document, index) in documentIdeas" :key="document">
                    <li>
                    <button class="title" v-on:click="currentDoc= index">
                        {{documentList[document.document].title}}
                    </button>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Ideas',
    data(){
        return{
            idea: '',
            show: true,
            documentIdeas: []
        }
    },

    methods: {
        processIdea: async () => {

            const headers = {
                "Content-Type": "application/json",
                "Authorization": "Bearer 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"
            }

            const getIdeas = async function(idea) {
                const response = await axios.post('https://api.openai.com/v1/engines/davinci/completions', {
                    prompt: idea
                },{
                headers: headers
                }).then(
                    (response) => {
                        console.log("RESPUESTA", response)
                        return response;
                    }
                ).catch((error) => {console.log(error)})
                console.log("WII", response.data)
                return response
            }

            const response = await getIdeas(this.idea);
            console.log("LA IDEA ES", response.data)

        }
    }
}
</script>