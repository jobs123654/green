<template>
  <transition enter-active-class="bounceIn" leave-active-class="bounceOut">

    <div class="panel panel-default root" v-show="visible">
      <div class="panel-body">


        <div class="form-group col-md-4">

        <select class="form-control">
          <option>草坪</option>
          <option>树木</option>
        </select>
        </div>

        <!--tab-->
        <div class="tab">
          <ul>
            <li @click="key=0;cVisible=true;sVisible=false;tVisible=false;showBtn=true" :class="key==0?'height':'normal' ">条件查询</li>
            <li @click="key=1;sVisible=true;cVisible=false;tVisible=false;showBtn=false" :class="key==1?'height':'normal'">几何查询</li>
          </ul>
        </div>

        <!--草坪查询-->
        <div v-if="cVisible">
          <div class="form-group col-md-12">

            <input type="checkbox"  v-model="checks" value="0"  placeholder="单位：米">
            <label for="exampleInputEmail1">待除草</label>
          </div>
          <div class="form-group col-md-12">

            <input type="checkbox"  v-model="checks"value="1" placeholder="单位：米">
            <label for="exampleInputEmail1">待灌溉</label>
          </div>
          <div class="form-group col-md-12">

            <input type="checkbox"  v-model="checks"  value="2" placeholder="单位：米">
            <label for="exampleInputEmail1">待除草</label>
          </div>
          <div class="form-group col-md-12">

            <input type="checkbox"  v-model="checks" value="3" placeholder="单位：米">
            <label for="exampleInputEmail1">待施肥</label>
          </div>
        </div>

        <!--树木查询-->
        <div v-if="sVisible">
          <div class="form-group ">
            <label for="exampleInputEmail1" >点选</label>
            <a href="#" @click="dotQuery" class="btn btn-primary glyphicon glyphicon-hand-up"></a>
          </div>
          <div class="form-group ">
            <label for="exampleInputEmail1" >圆选</label>
            <a href="#" @click="circleQuery" class="btn btn-primary glyphicon glyphicon-record"></a>
          </div>

        </div>
           <!--工具查询-->
        <div v-show="showBtn">
          <button  class="btn btn-default" @click="query" >确定</button>
          <button  class="btn btn-default" @click="close">取消</button>
        </div>

      </div>


    </div>

  </transition>
</template>

<script>
    export default {
        name: "CaoGuanGai",
       data:function(){
          return{
            visible:true,
            cVisible:true,//草坪
            sVisible:false,//树木
            tVisible:false,//工具
            pointer:false,//显示位置获取工具
            pos_checked:false,
            showBtn:true,
            key:0,
            dis:0,
            checks:[],
          }
       } ,
      methods:{
          ok(){

          },
         show:function(){
           this.visible=true
         },
         close:function () {
           this.visible=false
         },
         query:function(){
           this.close()
           this.$emit('query',this.dis)
         },
         showPointer:function () {
           this.pointer=true;
         },
          select:function () {
            this.$emit('well_select_position',this.dis)
          },
         dotQuery(){
           this.$emit('dotQuery')
           this.close()
         },
         circleQuery(){
           this.$emit('circleQuery')
           this.close()
         }
        }
    }
</script>

<style scoped>
.root{
  width: 80%;
  position: absolute;
  left: 11%;
  top: 20%;
  z-index: 9;
}
 .tab{
   width: 100%;
   height: 30px;
 }
 .tab ul{
   margin-left: 17%;
   padding: 0.2rem 0rem 0 0 ;
   display: flex;
   flex-direction: row;

 }
 .radio{

   background-color: black;
 }
  .tab li{
     list-style: none;
    width: 40%;
    cursor: pointer;
  }
  a{
    cursor: pointer;
  }
  .height{
    border-bottom: 4px solid lightgreen;
  }
  .normal{
    border-bottom: 4px solid gray;
  }
</style>
