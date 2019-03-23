<template>
    <div class="container">
       <div class="row">
       	<img src="../assets/logo.png" height="100" width="100">
       </div>
      <div class="list-group" >
	  <a href="#" class="list-group-item">
	    Cras justo odio
	  </a>
	  <a href="#" class="list-group-item">Dapibus ac facilisis in</a>
	  <a href="#" class="list-group-item">Morbi leo risus</a>
	  <a href="#" class="list-group-item">Porta ac consectetur ac</a>
	  <a href="#" class="list-group-item">Vestibulum at eros</a>
</div>
    </div>
</template>

<script>
  export default {
    name: 'User',
   
  }
</script>

<style scoped>
 .row{
 	padding-left: 40%;
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

</style>
