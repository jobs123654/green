import Vue from 'vue'
import Router from 'vue-router'


import Index from '@/components/user/Index'
import Set from '@/components/user/Set'
import User from '@/components/user/User'
import Bch from  '@/components/part/Bch'
import Login from  '@/components/user/Login'
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
