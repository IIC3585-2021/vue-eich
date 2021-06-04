import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Document from '@/components/Document'
import Chat from '@/components/Chat/Chat'
import { firestorePlugin } from 'vuefire'


Vue.use(Router)
Vue.use(firestorePlugin)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: HelloWorld
    },
    {
      path: '/wiki',
      name: 'Document',
      component: Document
    },
    {
      path: '/qa',
      name: 'Questions',
      component: Chat
    }
  ]
})
