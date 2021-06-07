<template>
<div>
    <div class="document" v-if="favouritesList.length != 0">
        <div class="left-document-container">
            <div v-for="(document, index) in favouritesList" :key="document">
              <button class="menu-item" v-on:click="currentDoc= index">
                  {{document.title}}
              </button>
            </div>
        </div>
        <div class="right-document-container">
            <p class="title"> {{favouritesList[currentDoc].title}} </p>
            <p>{{favouritesList[currentDoc].body}}</p>
        </div>
    </div>
    <div  class="right-document-container" v-if="favouritesList.length == 0">
      <p> No tienes ningún favorito</p>
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
            favouritesList: [],
            currentDoc: 0,
        }
    },
    created() {
        const favouritesList = []
        const favouritesIds = store.state.favourites

        favouritesIds.forEach(async (id) => {
            await db.collection('documents').doc(id).get().then(
                snapshot => {
                    const document = snapshot.data()
                    favouritesList.push(document)
                }
            ).catch((err) => {
                console.log(err)
            })
        })
        this.favouritesList = favouritesList
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
    },
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