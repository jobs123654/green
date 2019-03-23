<template>
   <transition enter-active-class="bounceIn" leave-active-class="bounceOut">
       <!--补植-->
       <div class="panel panel-default root" v-show="visible">
           <div class="panel-heading">草坪补植
           </div>
           <div class="panel-body form">
               <div class="form-group">
                       <label for="exampleInputEmail1">草坪类型</label>
                   <select class="form-control" v-model="key" @change="getPrice">
                       <option v-for="item in cp"  :value="item.name">{{item.name}}</option>
                   </select>
               </div>
               <div class="form-group">
                   <label for="exampleInputEmail2">草坪价格</label>
                   <!-- <input type="text" class="form-control" v-model="price"  > -->
                    <label for="exampleInputEmail3" class="form-control">{{price|unit}}</label>
               </div>
               <div class="form-group">
                   <label for="exampleInputEmail3">补植面积</label>
                   
                   <label for="exampleInputEmail3" class="form-control">{{area|areaUnit}}</label>
                   
               </div>
               <div class="form-group">
                   <label for="exampleInputEmail4">总价</label>
                   <u>{{total}}</u>
               </div>

           </div>
           <div class="panel-footer">
               <button class="btn btn-success" style="width: 99%" @click="close">关闭</button>
           </div>
       </div>



   </transition>
</template>

<script>
    export default {
        name: "BZ",
        propps:{
            sys:Object,
        },
        data:function () {
            return{
                visible:false,
                map:null,
                key:null,
                cp:[
                    {
                        name:'黑麦草',
                        price:70,
                    },
                    {
                        name:'高羊茅草',
                        price:65,
                    },
                    {
                        name:'早熟禾',
                        price:56,
                    },
                ],
                price:0,
                total:0,
                area:'',
            }
        },
        mounted:function(){

            
            this.map=new Map([]);
            let that=this
            let i=0;
            this.cp.forEach(function (item) {
                that.map.set(item.name,item.price)
            });
                    },
        methods:{
            close:function () {
                this.visible=false;
            },
            getPrice:function () {
                this.price=(this.map.get(this.key)?this.map.get(this.key):0)
                this.total=(this.price*this.area).toFixed(2);
                console.log(this.total)
            }
        },
        computed:{

        },
        watch:{
          visible(newValue){
            if (newValue) {
              console.log(this.system)
            }
          }
        },
        filters:{
          unit:function (t) {
            /* body... */
            return '￥'+t+'.00';
          },
          areaUnit:function (argument) {
            /* body... */
            return argument+'平方米'
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
  input,select{
    text-align: center;
  }
</style>
