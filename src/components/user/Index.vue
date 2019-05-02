<template>
 <div>

     <div id="map">

     </div>
     <!--补植-->
     <BZ ref="BZ"></BZ>
     <!-- 修剪草坪 -->
     <Toolbar class="menu" :menu="menu" @toolbar="toolbar" ref="toolbar"></Toolbar>
     <Toolbar class="cpMenu" v-show="showCpMenu" :menu="cpMenu" @toolbar="toolbar" ref="toolbar"></Toolbar>
     <Toolbar class="treeMenu" :menu="treeMenu" v-show="showTreeMenu" @toolbar="toolbar" ref="toolbar"></Toolbar>

     <CutForm ref="cutForm"></CutForm>
     <!--底部导航-->
     <AppTab ref="tb"  @bch="bch" @weisheng="weisheng"></AppTab>
     <!--侧滑栏-->
     <SlideBar ref="slideBar" ></SlideBar>
     <!--查询表单-->
    <QueryForm ref="query" @dotQuery="dotQuery" @circleQuery="circleQuery" @querywell="querywell" @query="query"></QueryForm>
   <!--草坪灌溉-->
   <!--<CaoGuanGai ref="cpgg" @query_well="query_well" @well_select_position="well_select_position" @well_satuation_set="well_satuation_set"></CaoGuanGai>-->
   <Caopinggg ref="cpgg" @cpgg="cpgg"></Caopinggg>
   <!--信息框-->
   <InfoBox :list="infoBox" ref="InfoBox"></InfoBox>
   <!-- 作业单 -->
     <Work ref='work' :work="work"></Work>
   <BchJl ref='work' :work="work"></BchJl>
     <!--提示框-->
     <Info ref="info"></Info>
     <!--进度条-->
     <Progress class="progress" ref="progress"></Progress>
 </div>

</template>

<script>

    import AppTab from '../part/AppTab'

    import SlideBar from '../part/SlideBar'

    import QueryForm from '../box/QueryForm'
    import InfoBox from '../box/InfoBox'
    import Work from '../box/Work'
    import BchJl from '../box/BchJl'
    import BZ from '../map/BZ'

    import System from '../../libs/System'
    import common from '../../libs/common'
    import CustomRouters from '../../libs/CustomRouters'
     import  CutForm from '../map/CutForm'
    import Data from '../../config/Data'
    import Caopinggg from '../toolbar/Caopinggg'
    import Toolbar from '../toolbar/Toolbar'
    import Info from '../box/Info'
    import Progress from '../box/Progress'
    import config from '../../config/config'
   let system=null
  export default {
    name: 'Index',

    data:function () {
      return{
        /*定义事件列表*/
          work:config.work,
          menu:config.menu,
          eventList:[],
          query_show:false,
          caopinglist:Data.caopingList,
          cpMenu:config.cpMenu,
          treeMenu:config.treeMenu,
          showTreeMenu:false,
          showCpMenu:false,
      }
    },
    components:{
      AppTab,SlideBar,QueryForm,BZ,CutForm,Caopinggg,Toolbar,InfoBox,Work,Progress,BchJl,
        Info,
      },
      created:function(){

      },

    //组件装载之后
    mounted:function(){
        /*初始化事件*/
      /*加载地图*/
      this.createMap();
    },
    computed:{
      infoBox:function () {
        return this.$store.state.infoBox;
      }
    },

    watch:{
      infoBox:function () {
        this.$refs.InfoBox.show()
      }
    },
    methods:{
      toolbar:function(n){
        switch (n) {
          case 'search':
            this.search();
            break;
          case 'reset':
            // this.reset()
              system.addMan()
            break;
          case 'distance':
            this.distance()
            break;
          case 'area':
            this.area()
            break;
          case 'erase':
            this.erase()
            break;
            case 'work':
            // this.$refs.work.show()
            system.key=6;
            this.$refs.info.show('请选择操作对象!');
            break;
             case '补植':
                // obj.$refs.BZ.system=system;
                system.area(function (argument) {
                    this.$refs.BZ.visible=true
                    this.$refs.BZ.area=system.result
                }.bind(this));
                break;
               case '灌溉c':
                this.$refs.cpgg.visible=!this.$refs.cpgg.visible;
                   this.$refs.progress.show()
                   setTimeout(e=>{
                       this.createGood()
                       this.$refs.progress.close()
                       },1700)
                break;
               case '除草':
                this.$refs.cutForm.visible=true
                break;

                case '施肥':
                break;

              case '灌溉t':
                system.key=7;
                break;

            case '修剪':
                break;

        }
      },
      createMap: function () {
          system=new System(this);
          CustomRouters.init(system);
          // alert(system)
      },
      querywell(){
         let map=system.map;
          var marker = new BMap.Marker(Data.wells.near);        // 创建标注
          // data.push(e.point);
          map.addOverlay(marker);
      },
        bch:function(){
            this.$refs.slideBar.changeView(CustomRouters.getItems1);
        },
        weisheng:function(){
            this.$refs.slideBar.changeView(CustomRouters.getItems1);

        },
      /*****************************************************************/
      createGood(){
        let map=system.map;
        console.log(Data.wells)
        let n=Data.wells.near,n1=Data.wells.near1;
        let c=Data.wells.c,c1=Data.wells.c1;
          // data.push(e.point);
          let style={strokeColor:"blue", strokeWeight:2, strokeOpacity:0.5}
          map.addOverlay(new BMap.Marker(n1));
          map.addOverlay(new BMap.Marker(n));
          // map.addOverlay(new BMap.Marker(c1));
          // map.addOverlay(new BMap.Marker(c));
          map.addOverlay(new BMap.Polyline([new BMap.Point(n.lng, n.lat),new BMap.Point(c.lng, c.lat)],style));
          style.strokeCole='yellow'
          map.addOverlay(new BMap.Polyline([new BMap.Point(n1.lng, n1.lat),new BMap.Point(c1.lng, c1.lat)],style));
      },
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
            system.draw()
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
        },
        query(){
          system.drawPolygon(Data.query.caoping);
        },
      //点选
      dotQuery(){
        system.key=4
      },
      //圆选
      circleQuery(){
        system.key=5
      },
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
    .menu,.cpMenu,.treeMenu{
        position: absolute;
        left: 86%;
    }
    .menu{top: 10%;}
    .cpMenu{
        top: 36%;
    }
    .treeMenu{top:36%}
    .progress{position: absolute;
        width: 60%;
        left: 20%;
        top:30%;
        z-index: 99;
    }
</style>
