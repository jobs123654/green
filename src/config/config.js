export default {
	menu:[
          {
          	name:`search`,
			  style:`btn btn-default glyphicon glyphicon-search`,
              title:'综合检索'
          },
          {
          	name:`reset`,
              title:'我的位置',
			  style:`btn btn-default glyphicon glyphicon-eye-open`
          },
          /*{
          	name:`distance`,
              style:`btn btn-default glyphicon glyphicon-resize-full`
          },
        {
            name:`area`,
            style:`btn btn-default glyphicon glyphicon-stop`
        },*/
        {
            title:'清除要素',
            name:`erase`,
            style:`btn btn-default glyphicon glyphicon-erase`
        },
        {
            title:'养护记录单',
            name:`work`,
            style:`btn btn-default glyphicon glyphicon-pencil`
        },
	],
    person:{
        zh:'2019',
        name:'李明',
        email:"1234554321@qq.com",
        phone:"18345677654",
        pwd:'2019'
    },
	work:{
		  position:{
			lng:132.453803 ,lat:37.603181
		  },
			man:'李明',
			quyu:'7区',
			content:'草坪灌溉',
			beizhu:'',
			obj:'c10023',
			time:'',
            zc:''
	},
    worklist:[
        {
            name:'草坪灌溉',
            level:9,
        },

        {
            name:'树木灌溉',
            level:9,
        },
        {
            name:'病虫防治',
            level:9,
        },
        {
            name:'整型修剪',
            level:9,
        },
        {
            name:'补植缺株',
            level:9,
        },

    ],
	cpMenu:[
		/*补植成本计算*/
        {
            title:'补植成本计算',
            name:`补植`,
            style:`btn btn-default glyphicon glyphicon-erase`
        },
		/*实时水井显示 最佳灌溉方案*/
        {
            title:'显示草坪灌溉方案',
            name:`灌溉c`,
            style:`btn btn-default glyphicon glyphicon-erase`
        },
        {
            name:`除草`,//？？？
            style:`btn btn-default glyphicon glyphicon-erase`
        },
        {
            title:'草坪喷施建议',
            name:`施肥`,
            style:`btn btn-default glyphicon glyphicon-erase`
        },
	],
	treeMenu:[
        {
            title:"",
            name:`修剪`,
            style:`btn btn-default glyphicon glyphicon-erase`
        },
        {
        	/*最佳灌溉路线分析*/
            title:"最佳灌溉路线",
            name:`灌溉t`,
            style:`btn btn-default glyphicon glyphicon-erase`
        },
        {
            name:``,
            style:`btn btn-default glyphicon glyphicon-erase`
        },
	]

}
