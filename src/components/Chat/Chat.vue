<template>
  <div id="Chat">
		<InitializeData />
		<ConversationContainer 
			v-for="id in convoIds"
			:conversation="conversations[id]"
	 		:id="id"
	 		:key="id"
		/>
  </div>
</template>

<script>
import InitializeData from './InitializeData.vue'
import ConversationContainer from './ConversationContainer.vue'
import { mapState } from 'vuex'
export default {
  name: 'Chat',
	components: {
		InitializeData,
		ConversationContainer
	},
	computed: {
		...mapState({
			conversations: state => state.conversations.all,
			convoIds: state => state.conversations.allIds
		})
	},
}
</script>

<style>
</style>