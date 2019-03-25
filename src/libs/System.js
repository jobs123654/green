import DataManager from './DataManager'
/*地图api*/
export  default  class System {
    constructor(){
        this.map=null;
        this.distanceToolObject=null;//测距对象
        this.areaPath=[];//路径点集合

        this.isArea=false;
        this.key=null;//事件标识码
        this.fn=null//回掉函数
        this.result=null
        this.animationControl=null

        /*加载瓦片地图*/
        var tileLayer = new BMap.TileLayer();
        tileLayer.getTilesUrl = function(tileCoord, zoom) {
            var x = tileCoord.x;
            var y = tileCoord.y;
            return '../static/tiles/' + zoom + '/tile-' + x + '_' + y + '.png';
        }
        var MyMap = new BMap.MapType('MyMap', tileLayer, {minZoom: 5, maxZoom: 13});

        this.map  = new BMap.Map('map', {mapType: MyMap});

        /*over*/
        // 创建地图实例

        this.map.addControl(new BMap.NavigationControl());

        this.map.addControl(new BMap.ScaleControl());
        this.map.addControl(new BMap.OverviewMapControl());
        // 118.59931,39.21084
        var point = new BMap.Point(0,0);
        // 中心点坐标
        this.map.centerAndZoom(point, 7);
        let m=this.map;
        setTimeout(function () {
            m.setZoom(9);
        },1200)

        var mapStyle ={

            style : 'grassgreen',
        };
        this.map.setMapStyle(mapStyle)
        this.map.enableScrollWheelZoom(true);
        this.map.setMinZoom(8);
        // this.map.setMaxZoom(12);
        // this.map.setZoom(7);
        /*面样式*/
        this.polygonStyle= {
            strokeColor:"red",    //边线颜色。
            fillColor:"red",      //填充颜色。当参数为空时，圆形将没有填充效果。
            strokeWeight: 3,       //边线的宽度，以像素为单位。
            strokeOpacity: 0.8,    //边线透明度，取值范围0 - 1。
            fillOpacity: 0.6,      //填充的透明度，取值范围0 - 1。
            strokeStyle: 'solid' //边线的样式，solid或dashed。
        };
        let obj=this;
        let data=[];
        /*左键*/
        this.map.addEventListener("click", function(e){

            /!*标注点*!/

            let x=e.point.lng;
            let y=e.point.lat;

                   // 创建标注
               console.log(e.point.lng,e.point.lat)
            data.push(e.point);

            if(obj.actionKey){
            //     var marker = new BMap.Marker(e.point);
            // obj.map.addOverlay(marker);
            }
            /* 搜索工作单元 */
            console.log(obj.map.getPanes())

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

                        obj.result=(BMapLib.GeoUtils.getPolygonArea(polygon)/100000).toFixed(2);
                        if (obj.fn) {
                            obj.fn();
                        }else{
                            MessageBox.alert((BMapLib.GeoUtils.getPolygonArea(polygon)/100000).toFixed(2)+'平方米', '测量结果');
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


}


