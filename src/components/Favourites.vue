<template>
    <div>
        <div>
            <div>
                <p>title</p>
            </div>
            <div>
                <p>Tus textos favoritos son:</p>
                <div class="left-document-container">
                <ul v-for="(document, index) in favouritesList" :key="document">
                    <li>
                    <button class="title" v-on:click="currentDoc= index">
                        {{document.title}}
                    </button>
                    </li>
                </ul>
            </div>

            </div>
        </div>
    </div>
</template>

<script>
import store from '../store/store';
import {db} from '../firebase/firebase';

export default {
    name: 'Favourites',
    data(){
        return {
            favouritesList: []
        }
    },
    mounted: () =>{
        console.log("YEY")
        const favouritesList = []
        const favouritesIds = store.state.favourites
        console.log("WWW", favouritesIds, favouritesIds.length)

        favouritesIds.forEach(async (id) => {
            console.log("WOWO", id)
            const veamos = await db.collection('documents').doc(id).get()
            console.log("SII", veamos.data)
        })
            
        console.log("···", store.state.favourites)
    },
    methods:{
        getFavourites: () => {

            const favourtiesIds = store.state.favourites

            favourtiesIds.forEach(async (id) => {
                await db.collection('documents').document(id).get().then(text => {
                    console.log("123", text)
                    this.favouritesList.push(text)

                })
            })
            
            console.log("VEAMOS EL RESULTADO", this.favouritesList)

        }
    }
}

</script>