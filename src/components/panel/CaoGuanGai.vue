<template>
  <transition enter-active-class="bounceIn" leave-active-class="bounceOut">

    <div class="panel panel-default root" v-show="visible">
      <div class="panel-body">

        <!--tab-->
        <div class="tab">
          <ul>
            <li @click="key=0;jVisible=true;pVisible=false;" :class="key==0?'height':'normal' ">水井查询</li>
            <li @click="key=1;pVisible=true;jVisible=false;" :class="key==1?'height':'normal'">喷头位置规划</li>
          </ul>
        </div>
        <!--水井查询-->
        <div v-if="jVisible">
          <div class="form-group col-md-12">
            <label for="exampleInputEmail1">设置范围</label>
            <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Email">
          </div>

          <div class="form-group">
            <label>
              <input type="radio" name="optionsRadios" id="optionsRadios1" value="option1" checked>
              使用当前位置
            </label>
          </div>
          <div class="form-group">
            <label>

              <input type="radio"  name="optionsRadios" id="optionsRadios2" value="option2">

             <span> 自定义位置&nbsp;&nbsp;&nbsp;</span>
            </label>
          </div>

          <div class="checkbox" v-if="pointer">
            <label>
              <span class="btn glyphicon glyphicon-hand-up"></span> 选择位置
            </label>
          </div>
          <button  class="btn btn-default" @click="">查询</button>
          <button  class="btn btn-default" @click="close">取消</button>
        </div>

        <!--喷头位置规划-->
        <div v-if="pVisible">
          <div class="form-group ">
            <label for="exampleInputEmail1">位置</label>
            <input type="email" class="form-control" id="exampleInputEmail2" placeholder="Email">
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" class="form-control" id="exampleInputPassword2" placeholder="Password">
          </div>
          <div class="form-group">
            <label for="exampleInputFile">File input</label>
            <input type="file" id="exampleInputFile2">
            <p class="help-block">Example block-level help text here.</p>
          </div>
          <div class="checkbox">
            <label>
              <span class="glyphicon glyphicon-hand-up"></span> 选择位置
            </label>
          </div>
          <button  class="btn btn-default" @click="">查询</button>
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
            jVisible:true,//水井
            pVisible:false,//喷头
            pointer:false,//显示位置获取工具
            key:0,

          }
       } ,
      methods:{
         show:function(){
           this.visible=true
         },
         close:function () {
           this.visible=false
         },
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
   clear: both;
   width: 100%;
   height: 30px;

 }
 .radio{

   background-color: black;
 }
  .tab li{
     list-style: none;
    width: 40%;
    float: left;
    cursor: pointer;
  }
  .height{
    border-bottom: 4px solid lightgreen;
  }
  .normal{
    border-bottom: 4px solid gray;
  }
</style>
