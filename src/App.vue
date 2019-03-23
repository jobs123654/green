<template>
  <div id="app">
      <!-- 菜单容器 -->

      <!-- 主页面容器 -->


      <Header></Header>
      <router-view></router-view>




      <!--首页-->
     <!-- <router-view></router-view>
      &lt;!&ndash;tab&ndash;&gt;
      <div class="tab">
          <div>
              <router-link class="item" to="Index">Index</router-link>
          </div>
          <router-link  class="item" to="Set">Setting</router-link>
          <router-link  class="item" to="User">User</router-link>
      </div>-->

  </div>
</template>

<script>
    import AppTab from './components/AppTab'
  import Index from './components/Index'
  import router from './router/index'
    import Header from './components/Header'


export default {
  name: 'App',
  components: { Header,AppTab},
  router,
  mounted:function(){
  
  },
  methods:{
    slide:function () {


    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 60px;*/
}

</style>
