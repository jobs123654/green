export default class System{
      constructor(){
      	/*初始化地图*/
      	     let imageURL=function(tileCoord, zoom) {
             var x = tileCoord.x;
            var y = tileCoord.y;
            return '../static/tiles/' + zoom + '/tile-' + x + '_' + y + '.png';
           };
            // imageURL=
      	     lay = new T.TileLayer(imageURL, {minZoom: 1, maxZoom: 18});
            var config = {layers: [lay]};
            //初始化地图对象
            this.map = new T.Map("map");
            //设置显示地图的中心点和级别
            this.map.centerAndZoom(new T.LngLat(116.40969, 39.89945), zoom);
            //允许鼠标滚轮缩放地图
            this.map.enableScrollWheelZoom();

      }
}