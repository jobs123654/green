<template>
 <div>

     <div id="map">

     </div>
     <!--补植-->
     <BZ ref="BZ"></BZ>
     <!-- 修剪草坪 -->
     <CutForm ref="cutForm"></CutForm>

     <div id="btn">
          <!--裁剪-->
         <span class="item" @click="search">
             <!--<img src="../assets/jd.png">-->
             <span class=" btn btn-default glyphicon glyphicon-search"></span>
         </span>
         <!--刷新-->
         <span class="item" @click="reset">
             <span class="btn btn-default glyphicon glyphicon-inbox"></span>
         </span>
         <!--擦除-->

         <span class="item"  @click="distance">
             <span class="btn btn-default glyphicon glyphicon-resize-full"></span>
         </span>
         <span class="item" @click="area">
             <span class="btn btn-default glyphicon glyphicon-stop"></span>
         </span>
         <span class="item" title="清除要素" @click="erase">
             <span class="btn btn-default glyphicon glyphicon-erase"></span>
         </span>
     </div>

     <!--底部导航-->
     <AppTab @manager="manager" @caoping="caoping" @bch="bch" @weisheng="weisheng"></AppTab>

     <!--侧滑栏-->
     <SlideBar ref="slideBar" ></SlideBar>

     <!--查询表单-->
    <QueryForm ref="query" ></QueryForm>

   <!--草坪灌溉-->
   <!--<CaoGuanGai ref="cpgg" @query_well="query_well" @well_select_position="well_select_position" @well_satuation_set="well_satuation_set"></CaoGuanGai>-->
   <Caopinggg ref="cpgg" @cpgg="cpgg"></Caopinggg>
 </div>

</template>

<script>

    import AppTab from './AppTab'

    import SlideBar from  './SlideBar'

    import QueryForm from './panel/QueryForm'
    import CaoGuanGai from './panel/QueryForm'

    import BZ from './map/BZ'

    import System from '../libs/System'

    import CustomRouters from '../libs/CustomRouters'
     import  CutForm from './map/CutForm'
    import Data from '../config/Data'
    import Caopinggg from './toolbar/Caopinggg'

   let system=null
  export default {
    name: 'Index',

    data:function () {
      return{
        /*定义事件列表*/
          eventList:[],
          query_show:false,
          caopinglist:Data.caopingList
      }
    },
    components:{
      AppTab,SlideBar,QueryForm,BZ,CutForm,Caopinggg,
    },
      created:function(){

      },
    //组件装载之后
    mounted:function(){
        /*初始化事件*/

      /*加载地图*/
      this.createMap();


    },
    methods:{
      createMap: function () {
          system=new System();

          CustomRouters.init(system);

          // alert(system)
      },
//manger
        manager:function(){
            let that=this
            this.$refs.slideBar.changeView([
        {
            name:'补植',
            method:function (argument) {

            }
        },
        {
            name:'修剪',
            method:function (argument) {
                /* body... */
            }

        },
        {
            name:'灌溉',
            method:function (argument) {
                /* body... */
            }
        },
        {
            name:'施肥',
            method:function (argument) {
                /* body... */
            }
        },
    ]);
          },
        caoping:function(){
          let obj=this

            let item=[
        {
            name:'补植',
            method:function (argument) {
                /* 画面 */

                // obj.$refs.BZ.system=system;
                system.area(function (argument) {
                    obj.$refs.BZ.visible=true
                    obj.$refs.BZ.area=system.result
                });
                /*显示面板*/
            }
        },
        {
            name:'修剪',
            method:function (argument) {
                /* body... */
                obj.$refs.cutForm.visible=true

            }

        },
        {
            name:'灌溉',
            method:function (argument) {
                /* body... */
              obj.$refs.cpgg.visible=!obj.$refs.cpgg.visible;
            }
        },
        {
            name:'施肥',
            method:function (argument) {
                /* body... */
            }
        },
    ];
            this.$refs.slideBar.changeView(item);
            // this.$refs.BZ.visible=true
        },
        bch:function(){
            this.$refs.slideBar.changeView(CustomRouters.getItems1);

        },
        weisheng:function(){
            this.$refs.slideBar.changeView(CustomRouters.getItems1);

        },
      /*****************************************************************/
      cpgg:function(e){

        if (e){
          system.key=3
        } else{
         system.loadTrace();

        }
      },
        //查询水井
        query_well:function(i){
        if (i<=100){
          system.drawMarker(Data.wells.center,Data.wells.result,3)
        }else{
          system.drawMarker(Data.wells.center,Data.wells.result,5)
        }
      },
      //场景设置
      well_satuation_set:function(){
        system.showHotPoint()
      },
        //自定义位置查询水井位置
        well_select_position:function(){
          system.key=2;

        },
        //  绘制图形
      draw:function () {
            system.draw();

      },
    /*擦除*/
      erase:function () {
          system.clear();
      },
        /*裁剪*/
        search:function (argument) {
        /* body... */
            this.$refs.query.visible=true
            this.$refs.query.system=system;
        },
        /*复位*/
      reset:function (argument) {
        /* body... */
          system.reset()
      },
        /*测距*/
        distance:function () {
         system.distance()
        },
        /*计算面积*/
        area:function () {
           system.area(null)
        }
    }
  }

</script>

<style scoped>
    .anchorBL{display:none;}

    #map{
     border: 1px solid gray;
     width: 99.34%;
     height: 584px;
        z-index: -1
 }
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
