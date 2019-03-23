<template>
    <div v-show="header_visible">
        <mt-header title="首页" style="background-color: #41b883">
            <router-link to="" slot="left">
                <mt-button icon="back" @click="$router.back(-1)"></mt-button>
            </router-link>
            <router-link to="" slot="right">
                <mt-button icon="more" @click="more"></mt-button>
            </router-link>
        </mt-header>

        <mt-actionsheet :actions="actions" v-model="action" close-on-click-modal="true" cancel-text="" @click="logout"></mt-actionsheet>

    </div>
</template>

<script>
  import Nine from './Nine'
  let obj=null;
  export default {
    name: 'Header',
    components: {Nine},
    data:function () {
      return{
        header_visible:false,

        action:false,

        routeName:'',
        actions:[
          {
            name:'首页',
            method:function () {
              obj.$router.push('Index')

            }
          },
          {
            name:'系统设置',
            method:function () {
              obj.$router.push('Set')

            }
          },
          {
            name:'个人中心',
            method:function () {
              obj.$router.push('User')

            }
          },
          {
            name:'退出账号',
            method:function () {
              obj.logout();
            }
          },
        ]
      }
    },
    mounted:function(){
      obj=this;
    },
    created:function(){

    },
    methods: {
      /*显示菜单*/
      more: function () {
        this.action = true;
        let path = obj.$route.path.substr(1);
      },
      /*退出*/
      logout: function () {
        obj.$router.push('Login')
        obj.header_visible = false;
        obj.routeName = 'Login';
      },
      getParams: function () {
        // 取到路由带过来的参数
        var routerParams = this.$route.query.visible;
        // 将数据放在当前组件的数据内
        if (routerParams){
          this.header_visible=routerParams;
        }
      },
    },
    watch:{
      // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
      '$route': 'getParams'
    },
  }
</script>

<style scoped>

</style>
