import Vue from "vue"
import Vuex from "vuex"
import users from './users'
import conversations from './conversations'

import {db} from '../firebase/firebase';
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({

    state:{

        favourites: [],
        db: db

    },
    plugins: [createPersistedState()],
    mutations: {
        save (state, id) {
          state.favourites.push(id)
        }
      },
    modules: {
        users,
        conversations
      }

})