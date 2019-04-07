import DataManager from './DataManager'
import Data from "../config/Data";
/*地图api*/
export  default  class System {
    constructor(ins){
        this.map=null;
        this.distanceToolObject=null;//测距对象
        this.areaPath=[];//路径点集合

        this.isArea=false;
        this.key=null;//事件标识码
        this.fn=null//回掉函数
        this.result=null
        this.animationControl=null
        this.instance=ins
        this.fixed=null
        this.queryCircle={
          r:0,
          c:{
            lng:0,
            lat:0
          }
        }

        /*加载瓦片地图*/
        var tileLayer = new BMap.TileLayer();
        tileLayer.getTilesUrl = function(tileCoord, zoom) {
            var x = tileCoord.x;
            var y = tileCoord.y;
            return 'http://localhost/tiles/' + zoom + '/tile-' + x + '_' + y + '.png';
        }

        var MyMap = new BMap.MapType('MyMap', tileLayer);

        this.map  = new BMap.Map('map', {mapType: MyMap});


        /*over*/
        // 创建地图实例

        this.map.addControl(new BMap.NavigationControl());

        this.map.addControl(new BMap.ScaleControl());
        this.map.addControl(new BMap.OverviewMapControl());
        // 118.59895,39.210264
        var point = new BMap.Point(133.571437 ,40.515121);

        // 中心点坐标
        this.map.centerAndZoom(point, 8);
        setTimeout(function () {
            this.map.setZoom(7)
        }.bind(this),500)

        let m=this.map;
        var mapStyle ={
            style : 'grassgreen',
        };
        this.map.setMapStyle(mapStyle)
        this.map.enableScrollWheelZoom(true);


        // this.map.setMaxZoom(12);
        // this.map.setZoom(8);
        /*面样式*/
        this.polygonStyle= {
            strokeColor:"red",    //边线颜色
            fillColor:"red",      //填充颜色。当参数为空时，圆形将没有填充效果。
            strokeWeight: 3,       //边线的宽度，以像素为单位。
            strokeOpacity: 0.8,    //边线透明度，取值范围0 - 1。
            fillOpacity: 0.6,      //填充的透明度，取值范围0 - 1。
            strokeStyle: 'solid' //边线的样式，solid或dashed。
        };
        let obj=this;
        let data=[];
      this.cpList=[];

      Data.caopingList.forEach(function (i) {
        let p=[]
        i.bun.forEach(function (j) {
          p.push(new BMap.Point(j[0],j[1]))
        })
        this.cpList.push(new BMap.Polygon(p))
        this.map.addOverlay(new BMap.Polygon(p,{
          fillOpacity:0.1,
          strokeColor:'#91a87d',
        }));
      }.bind(this));

       /*鼠标移动事件*/
        this.map.addEventListener("mousemove",function (e) {
          // console.log(e)
          /* body... */
          switch (this.key){
            case 5:
              // statements_1
                 this.queryCircle.r=this.getDistance(this.queryCircle.c,e.point)
                  obj.drawCircle(this.queryCircle.c,this.queryCircle.r);
              break;
            default:
              // statements_def
              break;
          }
        }.bind(this))
        /*点击事件*/
        this.map.addEventListener("click", function(e){

            /!*标注点*!/
          let x=e.point.lng;
            let y=e.point.lat;


                   // 创建标注
            console.log(e.point.lng,e.point.lat)
            data.push(e.point);


            /* 搜索工作单元 */
            // console.log(obj.map.getPanes())

            switch (obj.key) {
                case 0:
                    break;
                case 1:

                    obj.areaPath.push(e.point);
                    if (obj.areaPath.length>3){
                        let polygon=new BMap.Polygon(obj.areaPath);
                        polygon.setStrokeColor('purple');
                        obj.map.addOverlay(polygon);
                        console.log(BMapLib.GeoUtils.getPolygonArea(polygon));

                        obj.result=(BMapLib.GeoUtils.getPolygonArea(polygon)/100000000).toFixed(2);
                        if (obj.fn) {
                            obj.fn();
                        }else{
                            MessageBox.alert((BMapLib.GeoUtils.getPolygonArea(polygon)/100000000).toFixed(2)+'平方米', '测量结果');
                        }
                    }
                    break;
              //      草坪灌溉
              case 2:
                    /*var marker = new BMap.Marker(e.point);
                obj.map.addOverlay(marker);*/


                setTimeout((item)=>{
                  let c=new BMap.Circle(e.point,obj.getRealDis(400),{
                    strokeColor:'purple',
                    fillColor:'grey',
                    fillOpacity:0.6,
                    strokeWeight:'8px'
                  });
                  obj.map.addOverlay(c);
                  // obj.map.panTo(e.point)
                  obj.map.centerAndZoom(e.point,12)
                  // obj.map.setZoom(12)
                  var m = new BMap.Marker(new BMap.Point(e.point.lng-0.04,e.point.lat-0.03));

                  var m1 = new BMap.Marker(new BMap.Point(e.point.lng+0.04,e.point.lat-0.04));
                  obj.map.addOverlay(m);
                  obj.map.addOverlay(m1);
                //  查询well

                },300)
                obj.key=0;
              break;
              //低洼区显示
              case 3:
                var pt = new BMap.Point(e.point.lng, e.point.lat);
                obj.cpList.forEach(function (i) {
                  var result = BMapLib.GeoUtils.isPointInPolygon(pt, i);
                  if (result){
                    obj.showHotPoint(i.Mn)
                  }
                })
                obj.key=0;
                break;

              //点选查询
               case 4:
                 obj.instance.$store.commit('setInfoBox',{})
                 obj.instance.$store.commit('setInfoBox',Data.query.attribute[0])
                 obj.key=0;
                break;
            //    圆选
                  case 5:
                  obj.queryCircle.c=e.point
                  obj.drawCircle(obj.queryCircle.c,obj.queryCircle.r);
                  if (obj.queryCircle.r>0) {
                    obj.key=0;//停止绘制
                    obj.queryCircle={
                      r:0,
                      c:{
                        lng:0,
                        lat:0
                      }
                    }
                  }
                  break;
                  // 作业单
                  case 6:
                  obj.instance.$refs.work.show()
                     /* let o=obj.instance.$store.state.work;
                      o.time=common.getDate()
                      obj.instance.$store.commit('setWork',o);*/
                  obj.key=0;
                  break;
            }


        });



        /*图形数据采集*/
        window.addEventListener('keydown',function (e) {

         if (e.keyCode==13){

            DataManager.get().forEach((e)=>{
             data.push(new BMap.Point(e.lng,e.lat));
            });
             let polygon=new BMap.Polygon(data);
             // polygon.setStrokeColor('purple');
             polygon.setFillColor('#00CD00');
             obj.map.addOverlay(polygon);
             /*添加文字标注*/
             DataManager.int().forEach((e)=>{
                 var opts = {
                     position :new BMap.Point(e.lng,e.lat),    // 指定文本标注所在的地理位置
                     offset   : new BMap.Size(0, 0)    //设置文本偏移量
                 }
                 var label = new BMap.Label(e.name, opts);  // 创建文本标注对象
                 label.setStyle({
                     color : "grey",
                     fontSize : "12px",
                     height : "20px",
                     lineHeight : "20px",
                     fontFamily:"微软雅黑"
                 });
                 obj.map.addOverlay(label);
             })

         }
        });

        this.distanceToolObject = new BMapLib.DistanceTool(this.map,
            {
                lineStroke : 2,
                lineColor:'purple',
                unit:'metric'
            });
        if (this.distanceToolObject){

            this.distanceToolObject.addEventListener("ondrawend", function(result) {
                console.log(result.distance)

            });
        }

    }
    addMan(){
        if (this.fixed){
            this.map.removeOverlay(this.fixed)
            this.fixed=null
        } else{
            this.fixed=this.man(Data.person.position);
            this.map.addOverlay(this.fixed)
        }



    }
    getDistance(e1,e2){
        return Math.sqrt((e1.lng-e2.lng)*(e1.lng-e2.lng)+(e1.lat-e2.lat)*(e1.lat-e2.lat))
    }
    getRealDis(v){
      return v*16.5;
    }
    /*清除要素*/
    clear(){
           this.map.clearOverlays();
        this.distanceToolObject.close();
        this.key=null;
        this.areaPath=[];


    }
    /*测距*/
    distance(){
        /*开启测距*/
        this.distanceToolObject.open();
    }
    /*计算面积*/
    area(fn){
         this.key=1;
         this.fn=fn;
    }
    /*创建弹窗*/
    openWindow(p){
        var opts = {
            width : 250,     // 信息窗口宽度
            height: 100,     // 信息窗口高度
            title : "Hello"  // 信息窗口标题
        }
        var infoWindow = new BMap.InfoWindow("World", opts);  // 创建信息窗口对象
        this.map.openInfoWindow(infoWindow, new BMap.Point(p.x,p.y));      // 打开信息窗口
    }
    /*测试*/
    test(){

        var marker = new BMap.Marker(new BMap.Point(0.533023,0.394783));        // 创建标注
        // data.push(e.point);
        this.map.addOverlay(marker);
    }
     /*绘制区域*/
     drawPolygon(p){
        this.map.setZoom(13)
         this.map.panTo(new BMap.Point(p.x,p.y),{
             noAnimation:false
         })
     let path=[];
     let s=0.1;

     path.push(new BMap.Point(0.090294 ,-0.102783));path.push(new BMap.Point(0.112127 ,-0.10205))
     path.push(new BMap.Point(0.113582 ,-0.187043));path.push(new BMap.Point(0.091022 ,-0.184845));
     let polygon=new BMap.Polygon(path);

        polygon.setStrokeColor('blue');
        polygon.setFillColor('grey');
        this.map.addOverlay(polygon);
        this.openWindow(p)
        /* 语音动画 */
        // 0.111001 -0.183801
        let o=this
        let apath=[],i=-0.183801;
        setTimeout(function (param) {
            o.animationControl= setInterval(function (param) {
                apath.push(new BMap.Point(0.111001 ,i))

                let l=new BMap.Polyline(apath,{
                    strokeColor:'red',
                    strokeStyle:'dashed'
                });
                o.map.addOverlay(l)
                i+=0.0001;
                if (i.toString().indexOf('178')>-1) {
                    clearInterval(o.animationControl)
                }
               },300)
          },1000)

    }
   // 批量绘制marker
   drawMarker(c,ps,v){
       let o=this
       this.map.panTo(new BMap.Point(c[0],c[1]),{
         noAnimation:false
       })
         ps.forEach((e,i)=>{
           if (i<v){
             var marker = new BMap.Marker(new BMap.Point(e[0],e[1]));
             o.map.addOverlay(marker);
           }

         })
   }
//   判断浏览器是否支持canvas
  isSupportCanvas(){
       let e=document.createElement('canvas')
      return e.getContent&&e.getContext('2d');
  }
//  复位
  reset(){
       this.map.reset();
  }
//   显示热力图
  showHotPoint(points){
    this. heatmapOverlay&&this. heatmapOverlay.hide();
  let r=[],max=points[1].lng,min=points[0].lng,max1=points[0].lat,min1=points[2].lat;
  let n=Math.random()*2*3;
  for(let i=0;i<n;i++){
    r.push({
      lng:Math.random()*(max-min)+min,
      lat:Math.random()*(max1-min1)+min1,
      count:Math.random()*100+200
    })
  }

    this.heatmapOverlay = new BMapLib.HeatmapOverlay({"radius":40});

    this.map.addOverlay(this.heatmapOverlay);

    this.heatmapOverlay.setDataSet({data:r,max:100});

    var gradient = {};

    this.heatmapOverlay.setOptions({"gradient": {
        0:'#889fe4',
        // .5:'#54f470',
        // 1:'#ebf301'
      }});

    this.heatmapOverlay.show();
  }
  //草坪灌溉轨迹追踪
  loadTrace(){
       let marker=null,i=0;
    let start=new BMap.Point(135.041534 ,41.115631),end=new BMap.Point(133.680134 ,41.073876)
    let dlng=1,dlat=1;

       if (this.animationControl){
         clearInterval(this.animationControl)
         this.animationControl=null;
         this.map.removeOverlay(marker)

         i=0;
       }else{
         this.animationControl=setInterval(function () {
           if (marker){
             this.map.removeOverlay(marker)
           }
           if (start.lng<=end.lng){
             start.lat+=dlat*0.1
             this.map.addOverlay(new BMap.Marker(new BMap.Point(133.652538,40.759862)));
           }else{
             start.lng-=dlng*0.1
           }

           let icon=new BMap.Icon('../../static/logo.png',{
             width:100,
             height:100,
           },{
             imageOffset:{
               width:30,
               height:37
             }
           });
           icon.setImageSize({
             width:30,
             height:30
           })
           marker = new BMap.Marker(start,{
             icon:icon
           });
           this.map.addOverlay(marker);
         }.bind(this),1000)
       }
  }
  man(e){
      let icon=new BMap.Icon('../../static/logo.png',{
          width:100,
          height:100,
      },{
          imageOffset:{
              width:30,
              height:37
          }
      });
      icon.setImageSize({
          width:30,
          height:30
      })
      let marker = new BMap.Marker(e,{
          icon:icon
      });
      return marker
  }
//  设置中心
  focus(e){
    this.map.panTo(new BMap.Point(e[0] ,e[1]))
    this.map.setZoom(7)
  }
// 画面
  drawPolygon(geo){
    let path=[];
    if (geo.length==1){
      this.focus([geo[0][0][0],geo[0][0][1]])
    }
    geo.forEach(function (i) {
       i.forEach(function (j) {
         path.push(new BMap.Point(j[0] ,j[1]))
       })
      let polygon=new BMap.Polygon(path);
      polygon.setStrokeColor('blue');
      polygon.setFillColor('#fff');
      polygon.setFillOpacity(0.5)

      this.map.addOverlay(polygon);

      polygon.addEventListener('click', this.polygonClick)
      path=[];
    }.bind(this))


  }
  // 画圆
   drawCircle(e,r){
    let circle=new BMap.Circle(e.point,r,{
      strokeColor:'lightblue',
      fillColor:'#fff',
      fillOpacity:0.5
    });
    this.map.addOverlay(circle)
   }

}


