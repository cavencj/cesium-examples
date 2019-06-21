import Vue from 'vue'
import Router from 'vue-router'
import Index from '../views/index.vue'
import Home from '../views/home'
import ExampleList from '../views/example-list'
import Editor from '../views/editor'
import Docs from '../views/docs'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Index,
      children: [
        {
          path: '',
          name: 'index',
          component: Home
        },
        {
          path: '/example-list',
          name: 'example-list',
          component: ExampleList
        },
        {
          path: '/editor',
          name: 'editor',
          component: Editor
        },
        {
          path: '/docs',
          name: 'docs',
          component: Docs
        }
      ]
    }
  ]
})
