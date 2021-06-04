import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import 'firebase/firestore'

import users from './users'
import conversations from './conversations'

import firebase from '../firebase/firebase'

Vue.use(Vuex)

const state = {
	db: firebase.firestore()
}

export default new Vuex.Store({
	state,
	modules: {
		users,
		conversations
	}
})