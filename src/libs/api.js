
require([
"esri/Basemap",  
"esri/Map",  
  
"esri/views/MapView",  
"esri/views/2d/draw/Draw", 
"esri/layers/TileLayer",  
"esri/symbols/SimpleMarkerSymbol",
"esri/layers/FeatureLayer",
"esri/widgets/Feature",
"esri/Graphic",
"esri/layers/GraphicsLayer", 
"esri/geometry/Point", 
"esri/geometry/Circle",
  "esri/Color",
"esri/symbols/SimpleLineSymbol",

"esri/geometry/geometryEngine",
"esri/geometry/Polygon",
"esri/widgets/Print",
"esri/tasks/PrintTask",
"esri/tasks/support/PrintTemplate",
"esri/tasks/support/PrintParameters",
"esri/config",
"esri/widgets/NavigationToggle",
"esri/widgets/Fullscreen",
"esri/views/ViewAnimation",
"esri/widgets/Expand",
"esri/widgets/Popup",
'esri/PopupTemplate',
"esri/tasks/QueryTask",
"esri/tasks/support/Query",
"esri/tasks/GeometryService",
"esri/geometry/Circle",
"esri/widgets/Feature",
"esri/symbols/PictureMarkerSymbol",
'esri/geometry/Polyline',
"esri/widgets/Search",
'esri/tasks/Locator',
"esri/widgets/ScaleBar",
"esri/widgets/LayerList",
"esri/tasks/support/BufferParameters",
"esri/geometry/SpatialReference",
"esri/widgets/Legend",
"esri/symbols/SimpleFillSymbol",
"esri/widgets/Directions",
 "esri/renderers/UniqueValueRenderer",
   "esri/renderers/ClassBreaksRenderer",
   "esri/widgets/Legend",
    "esri/renderers/SimpleRenderer",
    
    "dojo/domReady!",
// 引用文件
          

  ], function(  
Basemap,Map,MapView,Draw,TileLayer,
SimpleMarkerSymbol,FeatureLayer,Feature,Graphic,GraphicsLayer,Point,Circle,Color,SimpleLineSymbol,
geometryEngine,Polygon,Print,PrintTask,PrintTemplate,PrintParameters,esriConfig,
NavigationToggle,Fullscreen,ViewAnimation,Expand,Popup,PopupTemplate,QueryTask,Query,GeometryService,Circle,
Feature,PictureMarkerSymbol,Polyline,Search,Locator,ScaleBar,LayerList,BufferParameters,SpatialReference,Legend,
SimpleFillSymbol,Directionsm,UniqueValueRenderer,ClassBreaksRenderer,Legend,SimpleRenderer
  
  )
  {

          //var url="http://cache1.arcgisonline.cn/ArcGIS/rest/services/ChinaOnlineCommunityENG/MapServer";

          //url='http://cache1.arcgisonline.cn/arcgis/rest/services/ChinaOnlineCommunity/MapServer';
          // url="http://10.128.90.93:6080/arcgis/rest/services/新校区平面图/MapServer";
          // url='http://localhost:6080/arcgis/rest/services/SampleWorldCities/MapServer';
//        url='http://localhost:6080/arcgis/rest/services//SampleWorldCities/MapServer';
//        url='http://10.128.90.93:6080/arcgis/rest/services/新校区平面图/MapServer';

        var cor=[114.286, 29.942];
         cor=[ 117,38]
//      
            var tilelayer = new FeatureLayer({  
               
                url: 'http://cache1.arcgisonline.cn/arcgis/rest/services/ChinaOnlineCommunity/MapServer'  
            });  
            // Add layer to map  
           var customBasemap = new Basemap({    
            baseLayers: [tilelayer],    
            title: "Custom Basemap",    
            id: "myBasemap"

           });  
           var map = new Map({
          	basemap: 'hybrid',
	        	center: [116, 39], //地图加载后，初始位置
                zoom: 8 //放大级别，值越大放大的比例就越大
        });
        var view = new MapView({
          container: "map",
          map: map,
        });

				
				//创建图层管理器
       var   url= "http://10.128.39.127:6080/arcgis/rest/services//无标题/MapServer/";
          var features=[];
          for(var i=22;i>1;i--)
          {
          	if(i==12||i==19||i==13){
          		continue;
          	}
             var f=new FeatureLayer({url:url+''+i});
             features.push(f);
          }

//添加图层
            features.forEach((e)=>{
              map.add(e);
            });

//      var featureLayer = new FeatureLayer({
//      	
//      		//url: "http://10.128.39.127:6080/arcgis/rest/services//无标题/MapServer/1"
//      	
//        
//      });
       // map.addMany([featureLayer]);    
              //添加绘图对象
                var draw = new Draw({
                  view: view
                 });
                
          
               //全屏控件
                   var fullscreen = new Fullscreen({
                    view: view
                  });
                  view.ui.add(fullscreen, "top-left");
               //显示经纬度
        view.when(function(){
        	   view.goTo({
				  center: [116, 38.9],
				  zoom:13,
				
				})
        	   
  // This function will execute once the promise is resolved
}, function(error){
  // This function will execute if the promise is rejected due to an error
});
               
               
									                  
                //搜索框
                var searchWidget = new Search({
                  view: view,
                  allPlaceholder:'',
                  source:[
                    {
                      locator: new Locator({ url: "http://localhost:6080/arcgis/" }),
                      singleLineFieldName: "SingleLine",
                      outFields: ["Addr_type"],
                      name: '',
                      localSearchOptions: {
                        minScale: 300000,
                        distance: 50000
                      },
                      placeholder: '',
                      resultSymbol: {
                         type: "picture-marker",  // autocasts as new PictureMarkerSymbol()
                         url: "img/marker.png",
                         size: 24,
                         width: 24,
                         height: 24,
                         xoffset: 0,
                         yoffset: 0
                     }
                    }
                  ],//..
                });
                // Adds the search widget below other elements in
                // the top left corner of the view
                view.ui.add(searchWidget, {
                  position: "top-right",
                  index: 2
                });
                //比例尺
                var scaleBar = new ScaleBar({
                  view: view,
                  units:'metric',
                  style:'line',
                });
                // Add widget to the bottom left corner of the view
                view.ui.add(scaleBar, {
                  position: "bottom-right"
                });
                //导航控件
                
                //图层列表

                //----
               
                var action = null;//点线面
              
               
              //线量算方法-------------------------------t
              setTimeout(()=>{

               let createMarker=function(e){
              if(s.isDrawPoint)
                {

                  s.addMarker(e.mapPoint.x,e.mapPoint.y)
                  
                 }
              }
           
          
         
           
          
            //重新划分区域
            function HF()
            {
                  action=draw.create("polygon");
                  action.on("vertex-add", function (evt) {
                       s.paths.push(evt.vertices.pop())
                       s.DrawPolygon(s.paths);
                      
                  });
                    
                    action.on("cursor-update", function (evt) {
                    	
                     });
            }
            
             
            

         //draw polygon
               function drawPolygon() {
               // body...
                action=draw.create("polygon");

              
                  action.on("vertex-add", function (evt) {
                      if(s.isDrawPolygon)
                      {
                      s.paths.push(evt.vertices.pop())
                      s.measurePolygon(s.paths)
                      }
                  });
                    action.on("cursor-update", function (evt) {

                     });

             }    
         //draw line
         function drawLine() {
           // body...
            action = draw.create("polyline");
            action.on("vertex-add", function (evt) {
              if(s.isDrawLine)
               {
                s.paths.push(evt.vertices.pop())
                s.measureLine(s.paths);
               }
            });

            action.on("draw-complete", function (evt) {
              //createPolylineGraphic(evt.vertices);

            });
         }

          //draw marker
          function drawPoint()
          {
             action = draw.create("point");
             action.on("cursor-update", function (evt) { });

             action.on("draw-complete", function (evt) {
                        
                         if(s.isDrawPoint)
                         {
                          var c=prompt("请输入注记内容",'');
                          // s.createPointGraphic(evt.coordinates);
                         
                         if(c!=='')
                         {
                       
                          s.addMarker(evt.coordinates,' ',c);
                         }else{
                           alert('注记内容不得为空!');
                         }
                         }
                         
                         
                    });

           }

           //draw circle 缓冲区分析实例
           let circleTarget=null;
           function drawCircle()
          {
             action = draw.create("point");
             
             action.on("cursor-update", function (evt) { 
             });

             action.on("draw-complete", function (evt) {
                        
                         if(s.isDrawCirlce)
                         {
                         
                          //s.createPointGraphic(evt.coordinates);
                        
                          var o= s.mercator2lonlat({x:evt.coordinates[0],y:evt.coordinates[1]});
                            circleTarget=[
                            evt.coordinates[1],
                            evt.coordinates[0]//bug
                           ];
                           let v=prompt('输入半径','');
                           
                            if(v!=='')
                            {
                            	s.createQueryByBufferWithGeo('http://10.128.39.127:6080/arcgis/rest/services/无标题/MapServer/1',
                    s.getGraphicCircle(circleTarget,parseFloat(v),true).geometry, v, 'intersects',null);
                    
                        	s.baseLayer.source.add(s.getGraphicCircle(circleTarget,parseFloat(v),true));
                             //s.addGraphicToMap(s.getGraphicCircle(circleTarget,parseFloat(v),true));
                            //执行分析
                            console.log(s.result);
                             if(s.result)
                             {
                                   
                             }
                            }
                         }
                         
                    });

           }
           //拉框实现
          //  backward-diagonal
           var start_point=null, end_point=null; 
           function drawRectangle()
           {
            action = draw.create("polygon");
            action.on("vertex-add", function (evt) {
           
             s.paths.push(1);
             
             if(s.isDrawRectangle)
             {
             	
              start_point=evt.vertices[0];
              //alert(1)
              if(s.paths.length>1)
              {
                s.isDrawRectangle=false;
                 s.paths=[];
                end_point=null;
                start_point=null;
              }
              
              var graphic=s.getGraphicPolygon(evt.coordinates, 'solid', '122', '33333');

              
              // s.addGraphicToMap(graphic);
              
                 

             }
            

            });
            action.on("cursor-update", function (evt) { 
              console.log(start_point+' '+s.isDrawRectangle)
               if(s.isDrawRectangle&&start_point!=null)
               {
               	
                 if(view.graphics.length>0)
                {
                  view.graphics.removeAll();
                }
                // s.paths.push(evt.vertices.pop())
             
                  end_point=evt.vertices.pop();

                  var path=[],p1=[start_point[0],end_point[1]],p2=[end_point[0],start_point[1]];
                       path.push(start_point,p2,end_point,p1);
                    var graphic=s.getGraphicPolygon(path, 'solid', '122', '33333');
                s.baseLayer.source.add(graphic);
                    //s.addGraphicToMap(graphic);
      s.createQueryByBufferWithGeo('http://10.128.39.127:6080/arcgis/rest/services/无标题/MapServer/8',
              graphic.geometry, 0, 'intersects',function(){
              	var res=s.result;
              	if(res){
              		var data=console.log(res.attributes);
              	}
              	
              });
              
         
               }
            });
           }
           //var url='http://10.128.39.127:6080/arcgis/rest/services//无标题/MapServer'
           //url="http://10.128.90.93:6080/arcgis/rest/services/MyMapService/MapServer";
            //url='http://localhost:6080/arcgis/rest/services/test/gis/MapServer';
           //url='http://cache1.arcgisonline.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer';

      //var road=url+'/0';
      var buspoint='http://10.128.39.127:6080/arcgis/rest/services//无标题/MapServer/8';
      //var area=url+'/2';
   
      //  cor=[97.8,0];
       

        //-----------------------------------------控制器------------------------------------------------
//    var geometry=new Point({
//      latitude:  29.942,
//      longitude:114.286
//    });
//     $('#buffer').click(function (param) {//缓冲区分析
//          s.createBufferByGeometry(geometry, 100);
//     });
//              // body...
//      $('button').click(function(){
//          let i=$('button').index(this);
//          
//                  s.paths=[];
//                  s.deactive();
//
//                 
//              
//                  switch(parseInt(i))
//                  {
//                    case 0:
//                   
//                    
//                    s.distanceMeasure();
//                    drawLine()
//                    break;
//                      case 1:////面积量算
//                       
//                       s.activeDrawPolygon();
//                      drawPolygon();
//                        break;
//                      
//                      case 2://添加标注
//                      s.activeDrawPoint();
//                     
//                       drawPoint();
//
//                   
//                      break;
//                      case 3://清除要素
//                      s.clear();
//                      break;
//                      case 4://地图打印
//                      s.printMap("http://10.128.90.93:6080/arcgis/rest/directories/arcgisoutput/Utilities/PrintingTools_GPServer/Utilities_PrintingTools/ExportWebMapTask",'');
//                      break;
//
//                      case 5://区域划分
//                     
//                      s.activeDrawPolygonRepeate();
//                      HF();
//                      break;
//                      case 6://显示区域划分列表
//                      /*
//                     1 查询区划信息显示面板
//                      */
//                      alert("区域列表");
//                      break;
//                      case 7:
//                      
//                      s.goTo();//定位
//                      break;
//
//                      case 8://复位
//                      
//                      s.recover();
//                      break;
//                      case 9://弹窗
//                                      
//                         s.addPopup(geometry,'11','222');
//                      break;
//                      case 10://画圆
//                      
//                    //  s.addPopup([114.286, 29.942]);
//                      break;
//
//                      case 11://添加要素
//
//                      s.addFeature(geometry,'1','1222')
//                   
//                    //  s.addPopup([114.286, 29.942]);
//                      break;
//                      case 12://点缓冲
//                   
//                      s.activeDrawCircle();
//                      drawCircle();
//                   
//                    //  s.addPopup([114.286, 29.942]);
//                      break;
//                      case 13://拉框查询
//
//                      s.activeDrawRectangle();
//                      drawRectangle();
//                   
//                    //  s.addPopup([114.286, 29.942]);
//                      break;
//                      
//
//                  }
//      });
//                                          
//                                   //打开三维视图
//             $('#open').click(function(){
//                   window.open('index1.html','123');
//             });       
//             //色板
//             
//             $('#color').change(function(){
//              s.color=$(this).val();
//             });
//             //创建缓冲区
//             /*$('#c_buffer').change(function (param) { 
//              switch(parseInt($(this).val()))
//              {
//                case 0:
//               s.createBufferByGeometry(new Point({
//                longitude:113,
//                latitude:37
//               }), 100);
//                break;
//                case 1:
//                var l=s.getGraphicPolyLine([
//                  [10876805.676113047, 3762466.8545582616],
//                  [11465473.358127527, 4036417.1639322606]
//                ], 1,"simple-line", '', '');
//                 s.addGraphicToMap(l)
//                //缓冲结果
//                 s.createBufferByGeometry(l.geometry, 10)
//                break;
//                
//              }
//            
//             
//             
//              });*/
//               //叠加类型
//             $('#overlap').change(function (param) { 
//              switch(parseInt($(this).val()))
//              {
//                case 0:
//                
//                break;
//                case 1://交集
//               let a=  s.createBufferByGeometry(new Point({
//                  longitude:113,
//                  latitude:37
//                 }), 100);
//                 let b=s.createBufferByGeometry(new Point({
//                  longitude:113.53,
//                  latitude:37.57
//                 }), 100);
//                 var geo=s.createIntersects(a, b);
//               
//                 var g=s.getGraphicPolygon(geo.rings,'solid', '', '');
//                 s.addGraphicToMap(g);
//                break;
//                
//              }});
//                  
//              $('#query').change(function (param) {
//                var u1='http://cache1.arcgisonline.cn/arcgis/rest/services/ChinaOnlineCommunity/MapServer/0';
//                u1='http://10.128.90.93:6080/arcgis/rest/services/新校区平面图/MapServer/2';
//                var layer =s.createQueryByBufferWithFilter(u1,'Shape_Length>0' , view.spatialReference, function(){
//                   var con=s.result.features;
//                   let index=0;
//                    for(var i in con)
//                    {
//                      var item=con[i];
//                     
//                      var tr=$('<tr></tr>');
//                      tr.append($('<td>'+(index++)+'</td>'));
//                      tr.append($('<td>'+(item.attributes).SHAPE_Area+'</td>'));
//                       s.addGraphicToMap(s.getGraphicPolygon(item.geometry.rings,'backward-diagonal','面积',(item.attributes).SHAPE_Area+'KM2'));
//                     $('#tb tbody').append(tr);
//                     $('#tb').show();
//                      }
//                   
//                  //  console.log(g.geometry.rings)
//                  // name
//                });
//
//                });
//                                          

//------------------------------------------2018/6/28------------------------------------------------------------
	var geometr=new Point({
				        latitude:  39.942,
				        longitude:115.286
				      }); 	
 					$('#buffer').click(function (params) {//缓冲区分析
	           		var geometr=new Point({
				        latitude:  39.942,
				        longitude:115.286
				      }); 	
				      
            	s.createBufferByGeometry(geometr, 500);
            	
       		}); 
       	
          	 $('#anniu button').click(function(){
            	let i=$('button').index(this);
            
                    s.paths=[];
                    s.deactive();

                    switch(parseInt(i))
                    {
                      case 0:
                      s.distanceMeasure();
                      drawLine();
                      //线段量算
                      break;
                        case 1:////面积量算
                         
                         s.activeDrawPolygon();
                        drawPolygon();
                          break;
                        
                        case 2://添加标注
                       
                        s.activeDrawPoint();
                       
                         drawPoint();

                     
                        break;
                        case 3:
		                      s.recover();
		                      //复位
		                      break;
                        case 4://清除要素
                        s.clear();
                        break;
                    }
                   
        });
         
	$('#gongjv button').click(function(){
            	let i=$('#gongjv button').index(this);
            
                    s.paths=[];
                    s.deactive();

                    switch(parseInt(i))
                    {
                      
                    case 0://点缓冲
                        s.activeDrawCircle();
                        drawCircle();
                      break;
                    case 1://拉框选择
                     s.activeDrawRectangle();
                        drawRectangle();
                    		break;
                    }
                    
       });
         
        
		map.on("load", function(){
          map.graphics.enableMouseEvents();
          map.graphics.on("mouse-out", closeDialog);
 
       });

        $('#huanchong').click(function(){
        	
        	var result=null,result1=null;
        	var layer = s.createLayerByUrl('http://10.128.39.127:6080/arcgis/rest/services/无标题/MapServer/16');
        	const queryParams = layer.createQuery();
					// set a geometry for filtering features by a region of interest
					queryParams.where =  "OBJECTID>0";
					// query the layer with the modified params object
					layer.queryFeatures(queryParams).then(function(results){
					  // prints the array of result graphics to the console
					  var co=results.features,result=co;
					  co.forEach((e)=>{
					    s.color="gray";
					    s.createBufferByGeometry(e.geometry,5);
					  });
					  
					});
					var layer1 = s.createLayerByUrl('http://10.128.39.127:6080/arcgis/rest/services/无标题/MapServer/14');
        	const queryParams1 = layer1.createQuery();
					// set a geometry for filtering features by a region of interest
					queryParams1.where =  "OBJECTID>0";
					// query the layer with the modified params object
					 layer1.queryFeatures(queryParams1).then(function(results){
					  // prints the array of result graphics to the console
					  var co=results.features,result1=co;
					  co.forEach((e)=>{
					    s.color="pink";
					    s.createBufferByGeometry(e.geometry,5);
					  });
					  
					});
					
					//叠置分析
					
        	var geometryService=new GeometryService({
           		url:'',
        	});
//      	createIntersects(geometry,geometry1);
           geometryService.convexHull(geoms.toArray()).then(function(result){
							  convexLayer.add(new Graphic({
							    geometry: result
							  }));
							},function(error){
							   console.log("error occured", error)
							});
            	var features=layer;
            
			
//			            features.forEach((e)=>{
//			              switch(parseInt(e.val()))
//		                {
//		                  case 0:
//		                 s.createBufferByGeometry(new Point({
//		                  longitude:113,
//		                  latitude:37
//		                 }), 100);
//		                  break;
//		                  
//		                }
//			            });
               
                   
        });
          	//生成单值专题图
			//测试单值专题图
       $('#zt').click(function()
       {

        //此处也可以进行查询构建结果集
        //线-道路实例
           var o=[
               {
                 value:'各种店铺',
                 color:'red',
               },
               {
                 value:'街道店铺',
                 color:'green',
               }
           ],
           //面
           o1=[
            {
              value:'祥和小区',
              color:'red',
            },
            {
              value:'雄县行政服务中心',
              color:'green',
            },
            {
              value:'雄县惠康医院',
              color:'yellow',
            },
            {
              value:'华兴茶庄',
              color:'blue',
            },
            {
              value:'天盾安防',
              color:'orange',
            },
            {
              value:'工商行家属楼',
              color:'brown',
            },
            {
              value:'望湖宾馆',
              color:'pink',
            },
            {
              value:'迎宾饺子馆',
              color:'green',
            },
            {
              value:' 关东泉酒坊',
              color:'red',
            },
            {
              value:'东关村卫生所',
              color:'yellow',
            },
            {
              value:' 汇通小区',
              color:'red',
            },
            {
              value:'北营新区',
              color:'yellow',
            },
            {
              value:' 雄县中学师生公寓',
              color:'red',
            },
            {
              value:'学府花园',
              color:'yellow',
            },
            {
              value:' 佩鑫商贸',
              color:'red',
            },
            {
              value:'东关村卫生所',
              color:'yellow',
            }
        ],
        //点-要素实例
        o2=[
          {
              value:'祥和小区',
              color:'red',
            },
            {
              value:'雄县行政服务中心',
              color:'green',
            },
            {
              value:'雄县惠康医院',
              color:'yellow',
            },
            {
              value:'华兴茶庄',
              color:'blue',
            },
            {
              value:'天盾安防',
              color:'orange',
            },
            {
              value:'工商行家属楼',
              color:'brown',
            },
            {
              value:'望湖宾馆',
              color:'pink',
            },
            {
              value:'迎宾饺子馆',
              color:'green',
            },
            {
              value:' 关东泉酒坊',
              color:'red',
            },
            {
              value:'东关村卫生所',
              color:'yellow',
            },
            {
              value:' 汇通小区',
              color:'red',
            },
            {
              value:'北营新区',
              color:'yellow',
            },
            {
              value:' 雄县中学师生公寓',
              color:'red',
            },
            {
              value:'学府花园',
              color:'yellow',
            },
            {
              value:' 佩鑫商贸',
              color:'red',
            },
            {
              value:'东关村卫生所',
              color:'yellow',
            },
            {
            	value:'汇通小区',
            	color:'green'
            },
            {
              value:'雄县中学师生公寓',
              color:'green',
            },
            {
              value:'学府花园',
              color:'yellow',
            },
            {
              value:'向阳小区',
              color:'blue',
            },
            {
              value:'文苑小区',
              color:'orange',
            },
            {
              value:'佩鑫商贸',
              color:'brown',
            },
            {
              value:'雄县人民政府',
              color:'pink',
            },
            {
              value:'福厚快捷宾馆',
              color:'green',
            },
            {
              value:'迎贡酒专卖',
              color:'red',
            },
            {
              value:'浦凡琴行总店',
              color:'yellow',
            },
            {
              value:' 川町太郎',
              color:'red',
            },
            {
              value:'麦可斯',
              color:'yellow',
            },
            {
              value:' 义达商贸',
              color:'red',
            },
            {
              value:'红星二锅头',
              color:'yellow',
            },
            {
              value:' 恒业商贸有限公司',
              color:'red',
            },
            {
              value:'阳光紫苑',
              color:'yellow',
            },
            {
            	value:'阳光花园',
            	color:'salmon pink'
            },
            {
              value:'口子窖酒专卖',
              color:'green',
            },
            {
              value:' 雄县商贸公司',
              color:'pink',
            },
            {
              value:'鑫盛小区',
              color:'sandy beige',
            },
            {
              value:' 富康小区',
              color:'red',
            },
            {
              value:'路欣家园',
              color:'purple',
            },
            {
              value:'安徽牛肉板面',
              color:'red',
            },
            {
              value:'好滋味世纪城店',
              color:'yellow',
            },
            {
            	value:'华旭公司',
            	color:'green'
            },
            {
              value:'东东超市',
              color:'green',
            },
            {
              value:'雄县三丁商贸公司',
              color:'pink',
            },
            {
              value:'聚缘小区',
              color:'sandy beige',
            },
            {
              value:'潘德熊猫来火锅',
              color:'red',
            },
            {
              value:'程氏塑业包装有限公司',
              color:'purple',
            },
            {
              value:'昌茂包装厂',
              color:'red',
            },
            {
              value:'正新机械',
              color:'yellow',
            },
            {
            	value:'广瑞公司',
            	color:'green'
            },
            {
              value:'西侯留村村委会',
              color:'green',
            },
            {
              value:'雄县塑胶制品有限公司',
              color:'pink',
            },
            {
              value:'年存超市',
              color:'sandy beige',
            },
            {
              value:'保定元瑞塑胶有限公司',
              color:'red',
            },
            {
              value:'雄县保障性住房',
              color:'purple',
            },
            {
              value:'雄县济康医院',
              color:'red',
            },
            {
              value:'中国移动公司雄县分公司',
              color:'yellow',
            },
            {
            	value:'雄县国土局',
            	color:'green'
            }
            
            
          ];

           //0路网 / 1区域
           var themeLayer=ThemeTool.createUniqueValueThemeLayer(buspoint, 'NAME2',o2,'marker','图例')
          //  var themeLayer=ThemeTool.createUniqueValueThemeLayer(road, 'name',o,'line','图例')
            //var themeLayer=ThemeTool.createUniqueValueThemeLayer(area, 'NAME2',o1,'fill','图例')
           s.showTheme(themeLayer,'雄安新区单值专题图');
           
       })
       //分级专题图
        $('fen').click(function () {
         
        var themeLayer=ThemeTool.createClassifyThemeLayer(buspoint,'red', 'marker', 'color', 'pop', 'OBJECTID',[0,10])
      
         app.showTheme(themeLayer,'人口密度');
       })

    //------------------------------------------------------------------------------------------------                             
            },2000);


//----------------------------------------------------------------------------------------------
					

//--------------------------------------------------------------------------------------------------
             
              

        
  //------------------------------------------- operator helper...--------------------------------------------------------
  /*
   类的初始化
   单位 ：feet | kilometers | meters | miles | nautical-miles | yards
  */
  class System
  {
       /*系统初始化
         默认容器ID是map
         class_fields 字段集合
         url 地图服务地址 "http://cache1.arcgisonline.cn/ArcGIS/rest/services/ChinaOnlineCommunityENG/MapServer"
       */
    constructor(map,view,draw,graphic){
         this.map=map;
         this.view=view;
         this.draw=draw;
         this.graphic=graphic;
         this.key='' ;    //操作关键字
         //paths容器
         this.paths=[];
         this.isDrawPoint=false;
         this.isDrawLine=false;
         this.isDrawPolygon=false;
         this.isDrawCirlce=false;
         this.isDrawRectangle=false;//拉框

         this.tooltip=null;//提示控件
         this.color='purple';//设置颜色
         this.printUI=null;//打印控件
             
         this.result=null;//当前处理结果

         this.fillStyle='backward-diagonal';
         
         this.lengend=null;//图例
        
         this.query_result_layer=this.createLayerByGraphic('查询结果图层', 'esriGeometryPolygon', '', '');//封装的查询图层

         this.buffer_layer=this.createLayerByGraphic('缓冲结果图层', 'polygon', '', '');
         this.zj_layer=this.createLayerByGraphic('注记图层', 'esriGeometryPolygon', '', '');
         this.baseLayer=this.createLayerByGraphic('基础图层', 'esriGeometryPolygon', '', '');//封装的查询图层
         this.baseLayer.opacity='0.3';
         this.map.addMany([this.query_result_layer,this.zj_layer,this.buffer_layer]);
        //  系统初始化
         
    }
    //利用服务地址创建图层
    createLayerByUrl(url)
    {
      return new FeatureLayer({
        url: url,
        labelsVisible:true

      });
    }
    //利用图形创建图层
    createLayerByGraphic(title,geometryType,fields,objectIdField)
    {
      return new FeatureLayer({//创建查询结果集图层
        visible:true,
        // type:'feature',
        title:title,
        source:[],
         geometryType:geometryType,
         fields:fields,
         objectIdField:objectIdField,
         popupTemplate: {
          title:'',
          content:''
        } 
        });
    }
    //图形代码复用
    // 获取面
    getPolygonByrings(rings)
    {
     return new Polygon({
        type:'polygon',
        hasZ: true,
        hasM: true,
        rings: rings,
        spatialReference:this.view.spatialReference
        // { wkid: 4326 },
      });
    }
    
    //关闭图例
    closeLegend()
    {
    	this.view.ui.remove(this.lengend);
    	this.lengend=null;
    }
    getPoint(cor)
    {
      return new Point({
        type: "point", // autocasts as /Point
        x: cor[0],
        y: cor[1],
        spatialReference: this.view.spatialReference
      });
    }
    /*
    cor :x,y
    r 半径
    */
    getCircle(cor,r)
    {
      var point=null;
      if(cor instanceof Array)
      {
      point={
        latitude:cor[1],
        longitude: cor[0]
      };
      }else{
        point={
          x:cor.x,
          y:cor.y
        };
      }
      return new Circle({
        center:point,
        radius:r,
        radiusUnit:'kilometers',
      });
    }
    getLine(paths)
    {
     return new Polyline({
       type: "polyline",  // autocasts as new Polyline()
        paths:paths,
        spatialReference: this.view.spatialReference
      });
    }
    //获取面对象
    getGraphicPolygon(rings,style, title,content)
    {
       let geometry=this.getPolygonByrings(rings),
           symbol=this.getSimpleFillSymbol('simple-fill', this.color,style),popupTemplate=this.getPopTemplate(title, content);
      
           return this.getGraphic(geometry, symbol, popupTemplate);
    }
    //获取圆对象
    //cor:x,y
    //r  半径
    //f true普通圆/false 标注

    getGraphicCircle(cor,r,f,title,content)
    {
      var  circle=this.getCircle(cor,r);
          
            
                      
                // type,color,size,style
               
                  var polylineSymbol =f?  this.getSimpleMarkerSymbol('simple-marker',this.color,r,'backward-diagonal'):this.getPictureMarkerSymbol('img/marker.png',35,30);
                      var template=this.getPopTemplate(title, content);
                    return (f? this.getGraphic(circle,polylineSymbol,null):this.getGraphic(circle,polylineSymbol,template));
    }
    
    //根据经纬度获取距离
       distanceByLnglat(lng1, lat1, lng2, lat2) {  
             var Rad=function(d) {  
              return d * Math.PI / 180.0;  
            }
            var radLat1 = Rad(lat1);  
            var radLat2 = Rad(lat2);  
            var a = radLat1 - radLat2;  
            var b = Rad(lng1) - Rad(lng2);  
            var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));  
            s = s * 6378137.0; // 取WGS84标准参考椭球中的地球长半径(单位:m)  
            s = Math.round(s * 10000) / 10000;  
           
            // //下面为两点间空间距离（非球面体）  
            // var value= Math.pow(Math.pow(lng1-lng2,2)+Math.pow(lat1-lat2,2),1/2);  
            // alert(value);  
           return s;
        }  
  
        
    //添加图形到地图
    addGraphicToMap(graphic)
    {
      if(this.view!=null)
      {
        this.view.graphics.add(graphic);
        this.result=graphic.geometry;
        
      }
    }
    //提示:txt内容
    getTooltip(txt)
    {
       
     if(this.tooltip)
     {
      this.tooltip.destroy();
     }
      this.tooltip = new Expand({
       expandIconClass: "esri-icon-right-arrow",
      view: this.view,
      content: txt,
      expanded: true,
      mode:'floating'
      });
      return this.tooltip;
    }
    //清除要素
    clear()
    {
       this.view.graphics.removeAll();
       this.deactive();
       this.view.vertices=[];
       this.paths=[];
       this.clearQueryResult();
       this.zj_layer.source.removeAll();
       //关闭图例
       this.closeLegend();
    }
    //控件失去焦点
    deactive()
    {
      this.isDrawPoint=false;
      this.isDrawLine=false;
      this.isDrawPolygon=false;
      this.isDrawRectangle=false;
      this.isDrawPolygonRepeate=false;


      
    }
    //获取线对象
                      /* [
                         [ 9684346.072634611,1940450.2611479554],
                         [10926906.404438106,1813259.046081456],
                         [12511904.6229591,1705635.7102559563],
                         [13030453.422845598,2507918.759136953],
                      ]*/
         getGraphicPolyLine(paths,width, style,title,content)  
      {

              
                  var polyline = this.getLine(paths);

                  var polylineSymbol = this.getSimpleLineSymbol(this.color,width,style);
                  // console.log(polyline)

                  var polylineAtt = {
                    Name: "Keystone Pipeline",
                    Owner: "TransCanada"
                  };

                
                  return this.getGraphic(polyline, polylineSymbol, this.getPopTemplate(title, content));

    }
    //获取面对象？
    getArea(vertices)
    {
           const polygon = new Polygon({
            hasZ: true,
            hasM: true,
            rings: vertices,
            spatialReference: this.view.spatialReference
          });
            var polylineGraphic = new Graphic({
                    geometry: polygon,
                    symbol: {
                    type: "simple-fill",  // autocasts as new SimpleLineSymbol()
                    color: this.color,
                    size: "3px",
                    style: "backward-diagonal",
                    outline: {  // autocasts as SimpleLineSymbol
                      color: "gray",
                      width: 1
                    }
                  },
                  

                  });
            return polylineGraphic;

    }
    //激活画圆控件
    activeDrawCircle()
    {
      this.isDrawCirlce=true;
      

    }
    //激活拉框控件
    activeDrawRectangle()
    {
      this.isDrawRectangle=true;
     
    }
    //实现弹窗 1
    addPopup(geometry,title,content)
    {
      // 
   
       this.view.popup.title=title;
       this.view.popup.content=content;
       this.view.popup.location=geometry;
       this.view.popup.visible=true;
    }
    //弹窗2
    addSimplePopup(geometry,title,content)
    {
      this.view.popup.open({
        title: title,  // title displayed in the popup
        content:content,  // content displayed in the popup
        updateLocationEnabled: true,  // updates the location of popup based on
        // selected feature's geometry
        location:geometry
      });
    }
    //添加要素 
    addFeature(geometry,title,content)
    {
            if(this.feature!=null)
            {
               this.feature.destroy();
            }
             
              var symbol=this.getPictureMarkerSymbol('img/marker.png',35,30);
              var template=this.getPopTemplate(title,content);
              var graphic=this.getGraphic(geometry,symbol,template);

               this.query_result_layer.source.add(graphic);
              
    }
    /*-----清除地图结果集-----*/
    clearQueryResult()
    {
      this.query_result_layer.source.removeAll();
    }
    /*-----------------获取图形对象-----------*/
    getGraphic(geometry,symbol,popupTemplate)
    {
      return {
        type:'',
        geometry:geometry,
        symbol:symbol,
        popupTemplate:popupTemplate,
        attributes: {
          Name: "",
          Owner: ""
        },
        layer:'',
      };
    }
    /*---------------获取poptemplate------------*/
    getPopTemplate(title,content)
    {
      return {
                        title:title,
                        content: content
              };
    }
    /*------------获取symbol-------------*/
    /*  style
           backward-diagonal	
            cross	
            diagonal-cross	
            forward-diagonal
            horizontal	
            none	
            solid	
            vertical
    */
    //get polygon symbol
    getSimpleFillSymbol(type,color,style)
    {
                  return{
                    type:'simple-fill' ,  //"simple-marker" autocasts as new SimpleLineSymbol() 改动
                    color: color,
                  
                    style: 'solid',//solid
                    outline: {  // autocasts as new SimpleLineSymbol()
                      color: "lightgray",
                      width: 1
                    }
                  };
    }
    //get simple symbol
    getSimpleMarkerSymbol(type,color,size,style)
    {
                  return{
                    type:type ,  //"simple-marker" autocasts as new SimpleLineSymbol()
                    color: color,
                    size: size+"px",
                    style: style,
                  };
    }
    getSimpleLineSymbol(color,size,style)
    {
      
                  return{
                    type:'simple-line' ,  //"simple-marker" autocasts as new SimpleLineSymbol()
                    color: this.color,
                    width: size+"px",
                    style: style,
                  };
    }
    //get img symbol
    getPictureMarkerSymbol(url,width,height)
    {
       var s=new PictureMarkerSymbol({
                      type: "picture-marker",
                      url:url,
                     
                      width: width+"px",
                      height:height+'px',
                    });
      return s;
    }
    activeDrawPolygon()
    {
      this.isDrawPolygon=true;
    }
    activeDrawPolygonRepeate()
    {
      this.isDrawPolygonRepeate=true;
    }
    activeDrawPoint()
    {
       
       this.isDrawPoint=true;
    }
    createPointGraphic(coordinates)
    {
               var point = {
                      type: "point", // autocasts as /Point
                      x: coordinates[0],
                      y: coordinates[1],
                      spatialReference: view.spatialReference
                    };

                    var graphic =new Graphic({
                      geometry: point,
                      symbol: {
                        type: "simple-marker", // autocasts as SimpleMarkerSymbol
                        style: "square",
                        color: "red",
                        size: "16px",
                        outline: { // autocasts as SimpleLineSymbol
                          color: [255, 255, 0],
                          width: 3
                        }
                      }
                    });;
                  

                    this.view.graphics.add(graphic);
    }
    //导航控件@Control[控件] 3D
    showNavigation()
    {
      var navigationToggle = new NavigationToggle({
        view: this.view
      });
      
      // and adds it to the top right of the view
      this.view.ui.add(navigationToggle, "top-left");
    }
    //显示图层列表@Control[控件]
    showLayerList()
    {
      var layerList = new LayerList({
        view: this.view
      });
      // Adds widget below other elements in the top left corner of the view
    this.view.ui.add(layerList, {
        position: "top-right"
      });
    }
    //显示图例@Control[控件]
    showLegend(featureLayer)
    {
      var legend = new Legend({
        view: view,
        layerInfos: [{
          layer: featureLayer,
          title: "图例"
        }]
      });
      
      view.ui.add(legend, "bottom-right");
    }
    //距离量算
     distanceMeasure(){
       s.isDrawLine=true;  
     }
    //获取量算结果
    
           measureLine(vertices) { 
               
               if(vertices.length>1)
               {
                var line = s.getGraphicPolyLine(vertices,3,'short-dot','12','23');
                   
                console.log(vertices)
                  
                  var lineLength =geometryEngine.planarLength(line.geometry, "meters");

                // var graphic = createGraphic(line);
                
                   this.view.graphics.add(line);
                 
                 
                  this.view.ui.add(this.getTooltip( "当前距离为："+lineLength+"米"), "top-left");
                  this.paths=[];//截断
              
               }
                
       }
    //面积量算
    areaMeasure()
    {
      this.isDrawPolygon=true;
      
    }
    measurePolygon(vertices)
    {
       var p=this.getArea(vertices);
      
      this.view.graphics.add(p);
       var lineLength =geometryEngine.planarArea(p.geometry, "square-meters");
              
                
                   this.view.ui.add(this.getTooltip("当前面积为："+parseFloat(Math.abs(lineLength))+"平方米"), "top-left");
    }
     //画面
    DrawPolygon(vertices)
    {
       if(this.isDrawPolygonRepeate)
       {
        var p=this.getArea(vertices);
        this.view.graphics.add(p);
       }
    }
    //激活区域划分
    activeHf()
    {
      this.isHf=true;
    }
    //执行区域划分动作:点集合
    executeHf(vertices)
    {
      if(this.isHf)
      {
           if(vertices.length>2)
           {
               var p=this.getArea(vertices);
               this.view.graphics.add(p);
               

           }
      }
    }
    //动画模式地图定位
    goToByAnimate(geometry)
    {
      var trackWidget = new Track({
        view: this.view,  // Assigns the track widget to a view
          graphic: new Graphic({
            symbol: { type: "simple-marker" }  // Overwrites the default symbol used for the
            // graphic placed at the location of the user when found
          })
      });
      this.view.ui.add(trackWidget,'')

    }
    //普通地图定位
    goTo()
    {
      // [114.286, 29.942]
        var p=new Point({
          latitude:40,
          longitude: 116
        });
      this.view.goTo({
        target:p,
        zoom:10,
      },{
        duration:3000
      });
    }
    //复位
    recover()
    {
     this.view.goTo({
        target:{
          latitude: cor[1],
        longitude: cor[0]
        },
        zoom:4,
      },{
        duration:3000
      });  
    }
    //经纬度转墨卡托  
         lonlat2mercator(lonlat){  
            var mercator={x:0,y:0};  
            var x = lonlat.x *20037508.34/180;  
            var y = Math.log(Math.tan((90+lonlat.y)*Math.PI/360))/(Math.PI/180);  
            y = y *20037508.34/180;  
            mercator.x = x;  
            mercator.y = y;  
            return mercator ;  
           }  
              
            //墨卡托转经纬度  
            mercator2lonlat(mercator){  
            var lonlat={x:0,y:0};  
            var x = mercator.x/20037508.34*180;  
            var y = mercator.y/20037508.34*180;  
            y= 180/Math.PI*(2*Math.atan(Math.exp(y*Math.PI/180))-Math.PI/2);  
            lonlat.x = x;  
            lonlat.y = y;  
            return lonlat;  
            }  
    //标注
    addMarker(cor,title,content)
    {
                var view=this.view;

                var action0 = draw.create("point");
                 // PointDrawAction.cursor-update
             
                if(!this.isDrawPoint)
                {
                     return false;
                }
                    
                    var point = this.getPoint(cor);
                    var symbol=this.getPictureMarkerSymbol('img/markerflag.png', 30, 30);
                    // this.getSimpleMarkerSymbol('simple-marker', this.color, 20, 'circle')
                    var graphic =this.getGraphic(point, symbol, this.getPopTemplate(title, content));
                    // this.query_result_layer.source.add(graphic);
                    this.zj_layer.source.add(graphic);
                    // this.addGraphicToMap(graphic);
                    
                  
    }
    //地图打印：服务地址、输出格式  问题？
    printMap(printUrl,format)
    {

                       esriConfig.request.proxyUrl ="proxy.html";//设置打印跨域代理请求
                         //esriConfig.defaults.io.alwaysUseProxy = true;
       
                      /* var printTask = new PrintTask({
                           url: printUrl
                        });
                        var template = new PrintTemplate({
                         format: "pdf",
                         exportOptions: {
                           dpi: 300
                         },
                         layout: "a4-portrait",
                         layoutOptions: {
                           titleText: "Warren Wilson College Trees",
                           authorText: "Sam"
                         }
                        });

                        var params = new PrintParameters({
                         view: this.view,
                         template: template
                        });

                        printTask.execute(params).then(printResult, printError);
                        function printResult(e) {
                          // body...
                             window.open(e.url, "_blank");
                              window.location =e.url;
                        }
                        function printError(e) {
                          // body...
                          alert("打印失败！");
                           console.log("打印失败！"+e);
                        }*/
                        //打印控件
                if(this.printUI)
                {
                this.printUI.destroy();
                }
                this.printUI = new Print({
                  view: this.view,
                   printServiceUrl: "https://www.example.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task"

                });
                // Adds widget below other elements in the top left corner of the view
                this.view.ui.add(this.printUI, {
                  position: "bottom-left"
                });
                this.printUI.on('click',function(e){
                     alert(e)
                });
    }
     addControl(c,position)
           {
            
             this.view.ui.add(c,position)
           }
       showTheme(themeLayer,title)
           {

                this.lengend = new Legend({
                  view:this.view,
                  layerInfos: [{
                    layer: themeLayer,
                    title:title
                  }]
                });
                 this.addControl(this.lengend, "bottom-right");
                this.map.add(themeLayer);
               
           }
    //------------------------------查询--------------------------------
            /*
        备注：空间关系
        contains 包含
        crosses  穿过
        overlaps 重叠
        intersects 相交
        index-intersects
        envelope-intersects
        relation 
        touches  接触


        缓冲区查询:条件、几何
        url      服务地址
        filter   查询条件
        distance 缓冲距离
        geometry 操作对象
        spatialRelationship 空间关系
        f 回掉函数
            */
    createQueryByBufferWithFilter(url,filter,spatialRelationship,f)
    {
             var queryStatesTask  = new QueryTask({
                url: url // URL of a feature layer representing U.S. states
              });
              var query = new Query({
                 where: filter,
                outFields:['type','name','SHAPE_Area','SHAPE'],
                //  units: "miles",//默认是米
                
                //  distance:distance,
                 spatialRelationship:spatialRelationship
              });
              var o=this;
              queryStatesTask.execute(query).then(function(result){
                // Do something with the resulting FeatureSet (zoom to it, highlight features, get other attributes, etc)
                if(f instanceof Function)
                {
                o.result=result;
                f();
                }
               },function(e){
                 console.log("error:"+e)
               });
               queryStatesTask.executeForCount(query).then(function(results){
                if(f instanceof Function)
                {

                 console.log(results);
                //  f();
                }
              });
    }
    /*
    缓冲区查询：几何  
    */
    createQueryByBufferWithGeo(url,geometry, distance,spatialRelationship,fn)
    {
              
             var queryStatesTask  = new QueryTask({
                url: url // URL of a feature layer representing U.S. states
              });
             
              var query = new Query({
                 geometry:geometry,
                 units: "kilometers",//默认是公里
                 returnGeometry:true,
                 distance:distance,
                 spatialRelationship:spatialRelationship
              });
//             query.outFields = [ "NAME-2" ];
              var o=this;
              queryStatesTask.execute(query).then(function(result){
                // Do something with the resulting FeatureSet (zoom to it, highlight features, get other attributes, etc)
               var c=result.features;
               o.result=c;
               for(let i in c)
               {
                    var item=c[i], graphic=null;
                    switch(item.geometry.type)
                    {
                   case 'point':
                   graphic=o.getGraphicCircle([item.geometry.x,item.geometry.y],0,false,'','');
                   break;
                   case 'polyline':
                   graphic=o.getGraphicPolyLine(item.geometry.paths, 5,"simple-line", '', '');
                  //  "short-dot", '1222', '222'
                   break;
                   case 'polygon':
                   graphic=o.getGraphicPolygon(item.geometry.rings,'backward-diagonal','名称',item.attributes['NAME2']+'</br>'+'地点:雄州镇');
                   break;
                    }

                     o.query_result_layer.source.add(graphic);
               } 
               
                //  o.query_result_layer.source.add(o.getGraphicPolygon(rings1,'backward-diagonal','23','56'));
               if(fn instanceof Function)
               {
                fn();
               }
               });
               //
               queryStatesTask.executeForCount(query).then(function(results){
                
              });
    }
    //Creates query parameters that   can be used to fetch features that satisfy the layer's current filters, and definitions.
    createQueryByFeatureLayer(query_layer,geometry,filter,f)
    {
        
         
         var queryParams=query_layer.createQuery();
      
          queryParams.geometry = geometry;
          
          queryParams.where =filter;
          queryParams.returnGeometry=true;
          // queryParams. units= "miles";
          var o=this;
          
          query_layer.queryFeatures(queryParams).then(function(results){
         
            
            if(f instanceof Function)
            {
              o.result=results;
              // console.log(results[0].features)
                f();
            }
         },function(e){
            console.log(e)
         });
    }
    //经纬度转为墨卡托 数组
    lontToMercatorArray(con)
    {
      let p=[];
    
      if(con.length>1)
      {
        for(var j in con)
        {
            var item=con[j];
             var o=this.lonlat2mercator({x:item[0],y:item[1]});
               p.push([o.x,o.y]);
        }
      }
    
      return p;
    }
    //-要素编辑------return boolean
    //addFeatureResults
     addFeature(geometry,obj) {
      const attributes = {};
      for(var i in obj)
      {
        attributes[i]=obj[j];
      }
     attributes["Report_Date"] = Date.now();
    
      const addFeature =  new Graphic({
        geometry: geometry,
        attributes: attributes
      });
    
      const promise = featureLayer.applyEdits({
        addFeatures: [addFeature],
      });
      return promise.addFeatureResults.length>0;
    }
    //updateFeatureResults
    updateFeature(geometry,obj)
    {
       const attributes = {};
       for(var i in obj)
       {
        attributes[i]=obj[j];
       }
       const feature = {
         geometry:geometry,
        attribute:attributes
       };
       const promise = featureLayer.applyEdits({
         updateFeatures: [feature],
       });
       return promise.updateFeatureResults.length>0;
    }
    //deleteFeatureResults
    deleteFeature(objectId)
    {
      const deleteFeature = {
        objectId:  objectId
       };
       const promise = featureLayer.applyEdits({
         deleteFeatures: [deleteFeature]
       });
       return promise.deleteFeatureResults.length>0;
    }
    /*------------------------3d view--------------------*/
    //获取节点：polygon/polyline
    /*
     空间分析
    
     */
    /*------------------------------------------空间分析----------------------------------------*/
    //获取GeometryService服务
    getGeometryService(url)
    {
       return new GeometryService({
        requestOptions:{},
         url:url,
       });
    }
    //获取缓冲参数
    getBufferParameters(geometry,distance)
    {
      return new BufferParameters({
        distances: [distance],
        unit: "kilometers",
        geodesic: true,
        bufferSpatialReference: new SpatialReference({wkid: 3857}),
        outSpatialReference:this.view.spatialReference,
        geometries: [geometry]
      });
    }
    //创建缓冲区 返回类型geometry
     createBufferByGeometry(geometry,distance)
     {
      var p=[],r= geometryEngine.geodesicBuffer(geometry, distance, "kilometers"),con=r.rings;
      if(geometry.type==='polyline'||geometry.type==='polygon')
      {
         p=con[0];
      }else{
        p=this.lontToMercatorArray(con[0]);
      }
      
      s.addGraphicToMap(s.getGraphicPolygon(p, this.fillStyle, '', ''));
      return r;
     }
     //叠加分析
     //交集
     createIntersects(geometry,geometry1)
     {
      //  console.log(geometry.rings)
       geometryEngine.spatialReference=this.view.spatialReference;
         console.log(geometry)
       var a=this.getPolygonByrings(this.lontToMercatorArray((geometry.rings)[0]));
       var b=this.getPolygonByrings(this.lontToMercatorArray((geometry1.rings)[0]));

      //  console.log((this.lontToMercatorArray((geometry.rings)[0])).length)
      //  console.log(a);
       return geometryEngine.intersect(a,b);
      
     }

     //追踪分析

    
  }
  
  /////////////////////////////
     ///////ThemeTool 工具类
     ////////////////////////////

      class ThemeTool{
          constructor()
          {

          }
          //报表打印 Id容器，path文件位置 
          static print(Id,path)
          {
            var mStr;  
             mStr = window.document.body.innerHTML ; 
               var mWindow = window;  
                  window.document.body.innerHTML =document.getElementById(Id).innerHTML;
                  console.log(Id.innerHTML) 
                     mWindow.print();  
                     window.document.body.innerHTML = mStr;  
                   
                     function saveas(Id){  
                           var mStr; 
                              var mWindow = window;   
                                 window.document.body.innerHTML =document.getElementById(Id).innerHTML; 
                                    // document.write(window.document.body.innerHTML); 
                                       document.execCommand('saveAs','1',path);   
                                       
                                       window.location='work.html';
                                     }
                                     saveas(Id);
          }
         static createLayerByGraphic(title,geometryType,fields,objectIdField,render)
          {
            return new FeatureLayer({//创建查询结果集图层
              visible:true,
              // type:'feature',
              title:title,
              source:[],
               geometryType:geometryType,
               fields:fields,
               objectIdField:objectIdField,
               popupTemplate: {
                title:'',
                content:''
              } ,
              render:render
              });
          }
          static createLayerByUrl(url,render)
          {
          	
            return new FeatureLayer({
              url: url,
              renderer:render,
              labelsVisible:true
            });
          }

          //获取配置项 透明颜色[45, 184, 36, 0.1]
          static getSymbol(color,type)
          {
          
           
            if(type==='fill')
            {
              type='simple-fill';
              return {
                type:type,
                color:color
              };
            }
          
            else if(type==='marker')
            {
            
              
              return  {
                type:'simple-marker',  // autocasts as new SimpleMarkerSymbol()
                size: 20,
                color: color,
                outline: {  // autocasts as new SimpleLineSymbol()
                  width: 0.5,
                  color: "lightblue"
                }
              };
            }else{
              
              return {
                type:'simple-line',
                color:color,
                width:4
              }; 
            }
            
          }
          //配置项
          static getUniqueValueInfos(field,a,type)
          {
            var result=[];
            for(var i in a)
            {
              var item=a[i];
             result.push({
              value: item.value,
              symbol: ThemeTool.getSymbol(item.color, type)
             });
            }
            return result;
          }
            //分级专题图 基于点
            /* 
              url服务地址,
              color要素颜色,
              stype元素类型, 
              vtype 渲染变量,"color size opacity"
              field,数字类型
              normalizationField 数字类型
              o{u,d}范围
            */

            static createClassifyThemeLayer(url,color, stype, vtype, field,normalizationField,o)
            {
                 var render=new SimpleRenderer({
                 
                  symbol:ThemeTool.getSymbol('', stype),  // autocasts as new SimpleFillSymbol()
                  visualVariables:[
                   {
                    lable:'122',
                    type: vtype,//"color size opacity"
                    field: field,
                    normalizationField:normalizationField,
                    // features with 30 ppl/sq km or below are assigned the first color
                    stops: [{ value: o[0], color: color },
                           { value: o[1], color: 'yellow' }]
                  }
                ]
                });
                return ThemeTool.createLayerByUrl(url,render);
            }

        
          //创建单值专题图专题图 目标图层, 字段、 内容数组（格式如下）
          /*
         uniqueValueInfos: 
            element{
            value:'209'，10，20，当values=10,20时 颜色批量设置
            colors:'red',
            lable:'text'
          }*/
         
          //获取专题图配置信息 Array
          static createUniqueValueThemeLayer(url,field,o,type,legendTitle)
          {
            var render=null;
             
              
              //单值专题图
               
              render=new UniqueValueRenderer({  
              
                field:field,
                defaultSymbol:{ type:'simple-'+type}, 
                uniqueValueInfos:ThemeTool.getUniqueValueInfos(field, o,type),
                legendOptions:{
                  title:legendTitle,
                  showLegend:true,
                }
              });
              
               var themeLayer=ThemeTool.createLayerByUrl(url,render);
              return themeLayer;

          }
         
      }
  //.....
  //初始化system

          // contains 包含
          // crosses  穿过
          // overlaps 重叠
          // intersects 相交
          // index-intersects
          // envelope-intersects
          // relation 
          // touches  接触

                        var s=new System(map,view,draw,null);
                       
                    //方法测试  [114.286, 29.942]
                     
                      /*setTimeout(function (argument) {

                       //console.clear();
                       
                      //几何查询
                       s.createQueryByBufferWithGeo('http://cache1.arcgisonline.cn/arcgis/rest/services/ChinaOnlineCommunity/MapServer/0', new Point({
                       latitude:29.942,
                       longitude:114.286 
                       }), 10*10, 'intersects');
                          //  s.view.graphics.add()
                       
                      //edit features and query features theme
                   
                     


                      

                    },3000);*/

    $('#map_operation .subnav-text').click(function () {

        console.log(s)
    });
               
        });  


      

