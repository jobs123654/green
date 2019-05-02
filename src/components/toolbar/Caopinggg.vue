<template>
  <div id="root" v-show="visible">
        <span title="开启捕捉模式" class="item btn btn-default glyphicon glyphicon-screenshot"  style="border-radius: 10px;"  @click="cpgg(0)">
         </span>
        <span title="显示低洼区" class="item btn btn-default glyphicon glyphicon-hand-up" @click="cpgg(1)">
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
    left: 3%;
    top: 70%;
    z-index: 9;
  }
  #root img{
    width: 25px;
    height: 30px;
  }
  #root .item{
    display: block;

    z-index: 9;
    margin-top: 30%;
    background-color: lightgreen;
    cursor: pointer;
      color: white;
  }

</style>
