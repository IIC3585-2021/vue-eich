import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Document from '@/components/Document'
import { firestorePlugin } from 'vuefire'
import Search from '@/components/Search'
import Favourites from '@/components/Favourites'
import Chat from '@/components/Chat/Chat'


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
      path: '/search',
      name: 'Search',
      component: Search
    },
    {
      path: '/favourites',
      name: 'Favourites',
      component: Favourites
    },
    {
      path: '/qa',
      name: 'Questions',
      component: Chat
    }
  ]
})
