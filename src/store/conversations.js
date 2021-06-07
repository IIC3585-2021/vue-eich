import Vue from 'vue'
import uuidv4 from 'uuid/v4'
import axios from 'axios'
import apiKey from '../variables/apiKey'
import {db} from '../firebase/firebase'

const state = {
	all: {},
	allIds: [],
	allMsgIds: []
}

const mutations = {
	SET_CONVERSATION (state, { conversation }) {
		const data = conversation.data()
		state.all[conversation.id]= { users: data.users, created: data.created, messages: [] }

		state.allIds.push(conversation.id)
	},

	ADD_MESSAGE (state, { conversationId, message }) {
		if (!state.allMsgIds.includes(message.id)) {
			state.all[conversationId].messages.push(message)
			state.allMsgIds.push(message.id)
		}
	},
}

const actions = {
	sendMessage ({ commit, rootState }, { text, created, sender, conversationId }) {
		const convoRef = db.collection('conversations').doc(conversationId)

		convoRef.update({
			messages: [...state.all[conversationId].messages, { id: uuidv4(), created, sender, text }]
		})
		.then(res => console.log('Message sent.'))
		.catch(err => console.log('Error', err))

    const headers = {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + apiKey
    }

      console.log('holiiiii')
      const question = "I am a highly intelligent question answering bot, If you ask me a question that is rooted in truth, I will give you the answer, If you ask me a question that is nonsense, trickery, or has no clear answer, I will respond with \"Unknown\", Q: " + text + ""
      axios.post('https://api.openai.com/v1/engines/davinci/completions', {
          prompt: question,
          "temperature": 0,
          "max_tokens": 100,
          "top_p": 1,
          "frequency_penalty": 0,
          "presence_penalty": 0,
          "stop": [" Q:"]
      },{
      headers: headers
      }).then(
          (response) => {
              convoRef.update({
                messages: [...state.all[conversationId].messages, { id: uuidv4(), created: Date.now(), sender: 'bot', text: response.data.choices[0].text }]
              })
              return response;
          }
      ).catch((error) => {console.log(error)})
	},
	
	seed ({ rootState }) {
		let convoRef = db.collection('conversations')

		convoRef.add({
			created: Date.now(),
			users: ['mr_a', 'mr_b'],
			messages: []
		})
	},

	async get ({ commit, rootState }) {
		let convoRef = db.collection('conversations')
		let convos = await convoRef.get()

		convos.forEach(conversation => commit('SET_CONVERSATION', { conversation }))
	}
}

export default { namespaced: true, state, mutations, actions }