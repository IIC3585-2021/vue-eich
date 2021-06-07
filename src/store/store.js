import Vue from "vue"
import Vuex from "vuex"
import users from './users'
import conversations from './conversations'

import {db} from '../firebase/firebase';

Vue.use(Vuex)

export default new Vuex.Store({

    state:{

        favourites: [],
        db: db

    },
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