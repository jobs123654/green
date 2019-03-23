<template>

  <transition enter-active-class="bounceIn" leave-active-class="bounceOut">
       <!--补植-->
       <div class="panel panel-default root" v-show="visible">
           <div class="panel-heading">修剪作业
           </div>
           <div class="panel-body">
               <table class="table">
                 <thead>
                   <th>编号</th>
                   <th>状态</th>
                   <th>负责人</th>
                   <th>定位</th>
                   <th>操作</th>
                 </thead>
                 <tbody>
                      <tr v-for="item in list" v-bind:key="item.id">
                        <td>{{item.areaId}}</td>
                        <td>
                          {{item.status}}
                        </td>
                        <td>
                          {{item.man}}
                        </td>
                        <td>
                          <a href="#" class="btn circle glyphicon glyphicon-map-marker" @click="fixed(item)"></a>
                        </td>
                        <td>
                           <button class="btn btn-primary btn-xs" >更新</button>
                           <button class="btn btn-danger  btn-xs" >删除</button>
                        </td>
                      </tr>
                 </tbody>
               </table>

           </div>
           <div class="panel-footer">
               <button class="btn btn-success" style="width: 99%" @click="close">关闭</button>
           </div>
       </div>

 </transition>
</template>

   <script type="text/javascript">
      export default{
        name:'CutForm',
        data:function (argument) {
          /* body... */
          return{
            visible:false,
            system:null,
            /* 任务列表 */
            list:[
              {
                areaId:1001,
                status:'未完成',
                man:'张三',
              },
              {
                areaId:1002,
                status:'未完成',
                man:'张三',
              },
            ]
          }
        },
        methods:{
          close(){
            this.visible=false
          },
          /* 定位 */
          fixed(item){
            /* 区域编号定位 */
            this.system.drawPolygon({x:0.102706,y: -0.153149})
          }
        }
      }  
   </script>
   <style scoped>
 .root{
      width: 70%;
      position: absolute;
      left: 16%;
      top: 30%;
      z-index: 9;
  }
   </style>