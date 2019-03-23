/*测试数据*/
export default class DataManager {
   /*初始化数据
   * 标注
   *
   *
   * */
    static int(){
        return[
            {
                name:'图书馆', lng: 118.598921, lat: 39.206116
            },
            {
                name:'大礼堂', lng: 118.598648, lat: 39.214042
            },
            {
                name:'D区3号楼', lng: 118.601992, lat: 39.215329
            },
            {
                name:'D区2号楼',lng: 118.601878, lat: 39.216771
            },
            {
                name:'D区4号楼', lng: 118.6036, lat: 39.21583
            },
            {
                name:'D区6号楼',lng: 118.603475, lat: 39.217059
            },
        ]
    }
    static get(){
        return[
            {lng: 118.600519, lat: 39.210736},
            {lng: 118.602259, lat: 39.210728},
            {lng: 118.602509, lat: 39.209631},
            {lng: 118.601304, lat: 39.209339},
            {lng: 118.600451, lat: 39.209993},
        ]
    }
}
