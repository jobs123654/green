<template>
  <div id="root" v-show="visible">
        <span class="item"  @click="cpgg(0)">
             <span class="btn btn-default glyphicon glyphicon-screenshot" title="开启捕捉模式"></span>
         </span>
        <span class="item" @click="cpgg(1)">
             <span class="btn btn-default glyphicon glyphicon-hand-up" title="显示低洼区"></span>
         </span>
  </div>
</template>

<script>
    export default {
        name: "Caopinggg",

        data:function () {
          return{
            visible:false,
          }
        },

       methods:{
       cpgg:function(e){
         this.$emit('cpgg',e)
       },
        show:function () {
          this.visible=true
        },
        close:function () {
          this.visible=false
        },
      }
    }
</script>

<style scoped>
  #root{
    width: 10%;
    height: auto;
    position: absolute;
    left: 85%;
    top: 55%;
    z-index: 9;
  }
  #root img{
    width: 25px;
    height: 30px;
  }
  #root .item{
    display: block;
    border-radius: 50%;
    z-index: 9;
    margin-top: 30%;
    background-color: white;
    cursor: pointer;
  }

</style>
