<template>
    <div class="container">
       <div class="row">
       	<img src="../../assets/logo.png" height="100" width="100">
       </div>
      <div class="list-group" >
	  <a href="#" class="list-group-item">
	    账号:{{person.zh}}
	  </a>
	  <a href="#" class="list-group-item">
       姓名：{{person.name}}
	  </a>
	  <a href="#" class="list-group-item">邮箱:{{person.email}}</a>
	  <a href="#" class="list-group-item">手机：{{person.phone}}</a>
	  <a href="#" class="list-group-item" @click="zyd">作业单</a>
</div>
		<WorkList class="wk"></WorkList>
    </div>
</template>

<script>
 import config from '../../config/config'
 import WorkList from '../part/WorkList'
  export default {
      name: 'User',
      components: {WorkList},
      props:{

		},
	  mounted(){
        console.log(this.person)
	  },
	  computed:{
        person(){
            return this.$store.state.person;
		},

	  },
	  methods:{
          zyd(){
              if (this.$store.state.worklist.length>0){
                  this.$store.commit('setWorklist',{});

			  }else{
                  this.$store.commit('setWorklist',config.worklist);
			  }

          }
	  }
  }
</script>

<style scoped>
 .row{
 	padding-left: 7%;
 	text-align: center;
 	margin-top: 10%
 }
 .row img{

 	border:1px solid grey;
 	border-radius: 50%
 }
 .list-group{
 	margin-top: 10%
 }
	.wk{
		position: absolute;
		left: 36%;
		top:62%
	}

</style>
