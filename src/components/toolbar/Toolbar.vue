<template>
  <div id="btn">
    <!--裁剪-->
    <span class="item" @click="select('search')">
             <!--<img src="../assets/jd.png">-->
             <span class=" btn btn-default glyphicon glyphicon-search"></span>
         </span>
    <!--刷新-->
    <span class="item" @click="select('reset')">
             <span class="btn btn-default glyphicon glyphicon-inbox"></span>
         </span>
    <!--擦除-->
    <span class="item"  @click="select('distance')">
             <span class="btn btn-default glyphicon glyphicon-resize-full"></span>
         </span>
    <span class="item" @click="select('area')">
             <span class="btn btn-default glyphicon glyphicon-stop"></span>
         </span>
    <span class="item" title="清除要素" @click="select('erase')">
             <span class="btn btn-default glyphicon glyphicon-erase"></span>
         </span>
  </div>
</template>

<script>
    export default {
        name: "toolbar",
        methods:{
          select(n){
            this.$emit('toolbar',n);
          }
        }
    }
</script>

<style scoped>
  #btn{
    width: 10%;
    height: auto;
    position: absolute;
    left: 85%;
    top: 20%;
  }
  #btn img{
    width: 25px;
    height: 30px;
  }
  #btn .item{
    display: block;
    border-radius: 50%;
    z-index: 9;
    margin-top: 30%;
    background-color: white;
  }
</style>
