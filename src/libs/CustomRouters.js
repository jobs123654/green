/*事务类*/
let system=null

export default class CustomRouters {
    /*传入api对象*/
    static init(s){
        system=s;
    }
    /*树木养护*/
    static item1=[
        {
            name:'病虫害防治',
            method:function (argument) {
                /* body... */
                system.clear();
            }
        },
        {
            name:'树木补植',
            method:function (argument) {
                /* body... */
            }

        },
        {
            name:'中耕除草',
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
        {
            name:'灌溉',
            method:function (argument) {
                /* body... */
            }
        },
    ];
    /*树木养护*/
    static item2=[
        {
            name:'补植',
            method:function (argument) {
                /* 画面 */
                system.area();
                /*显示面板*/
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
    ];


}
