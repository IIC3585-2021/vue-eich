import Vue from 'vue'
import Vuex from 'vuex'
import users from './users'
import conversations from './conversations'

import {db} from '../firebase/firebase';

Vue.use(Vuex)

const state = {
	db: db
}

export default new Vuex.Store({
	state,
	modules: {
		users,
		conversations
	}
})