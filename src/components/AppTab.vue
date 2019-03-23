<template>
   <div>



       <!--底部选项卡-->
       <mt-tab-container v-model="selected">
           <mt-tab-container-item id="one">

           </mt-tab-container-item>
           <mt-tab-container-item id="two">

           </mt-tab-container-item>
           <mt-tab-container-item id="three">

           </mt-tab-container-item>

       </mt-tab-container>

       <div class="bottom-bar">
           <mt-tabbar v-model="selected">
               <mt-tab-item id="one">
                   <img slot="icon" src="../assets/manager.png">
                   <span  @click='yh'>
                     树木养护
                   </span>

               </mt-tab-item>
               <mt-tab-item id="two">
                   <img slot="icon" src="../assets/query.png">

                   <span @click="caoping">
                     草坪养护
                   </span>
               </mt-tab-item>

               <mt-tab-item id="three">
                   <img slot="icon" src="../assets/yuj.png">
                   <!-- <router-link  class="item" to="User"></router-link> -->
                   <span @click="bch">
                     病虫防治
                   </span>
               </mt-tab-item>
                <mt-tab-item id="four">
                   <img slot="icon" src="../assets/chart.png">
                   <span @click="weisheng">
                    卫生保洁
                   </span>
               </mt-tab-item>
               <!-- <mt-tab-item id="five">
                   <img slot="icon" src="../assets/edit.png">
                   <span @click="edit">
                     在线编辑
                   </span>
               </mt-tab-item>-->
           </mt-tabbar>
       </div>
       <!--底部选项卡-->
   </div>
</template>

<script>

  // import User from './User'

  export default {
    name: 'AppTab',
    data:function () {
      return{
        selected:true
      }
    },
    methods:{
          yh:function () {
            this.$emit('manager');
          },
        caoping:function () {
            this.$emit('caoping');
        },
        bch:function () {
            this.$emit('bch');
        },
        weisheng:function () {
            this.$emit('weisheng');
        },
        edit:function () {
            this.$emit('edit');
        },

    },

  }
</script>

<style scoped>
 .header{
     height: 60px;
     background-color: forestgreen;
     color:white;
     text-align: center;

 }
 .item{
  text-decoration: none;
  color: grey;
 }
    .right,.center,.left{
        width: auto;
        height: inherit;
        float: left;
        margin-left: 12%;
        margin-top: 5%;
    }
    .center{
        width: 45%;
    }
    .mt-tab-item{
        text-decoration: none;
    }
</style>
