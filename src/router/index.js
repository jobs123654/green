import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

import Index from '@/components/Index'
import Set from '@/components/Set'
import User from '@/components/User'
import Bch from  '@/components/Bch'
import Login from  '@/components/Login'
Vue.use(Router)

export default new Router({
  routes: [
  {path:'/',redirect:'/Login'},
    {
      path: '/Index',
      component: Index,
     /* children:[
        {
          path:'/bch',//病虫害
          component:Bch,
        }
      ]*/
    },

    {
      path: '/Login',
      component: Login,
    },

    {
      path: '/Set',
      component: Set,
    },
    {
      path: '/User',
      component: User,
    },
    /*二级*/
    {
      path:'/bch',//病虫害
      component:Bch,
    },
  ],
  mode:'history'
})
