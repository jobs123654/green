<template>
    <!--查询组件-->
    <transition enter-active-class="bounceIn" leave-active-class="bounceOut">

        <div class="panel panel-default" v-show="show">
            <div class="panel-body">
                <div class="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Email">
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
                </div>
                <div class="form-group">
                    <label for="exampleInputFile">File input</label>
                    <input type="file" id="exampleInputFile">
                    <p class="help-block">Example block-level help text here.</p>
                </div>
                <div class="checkbox">
                    <label>
                        <input type="checkbox"> Check me out
                    </label>
                </div>
                <button  class="btn btn-default" @click="query">查询</button>
                <button  class="btn btn-default" @click="close">取消</button>
            </div>
        </div>

    </transition>
</template>

<script>
    export default {
        name: "QueryForm",
        props:{
          sys:Object
        },
        data:function () {
            return{
                show:false,
                system:null,
            }
        },
        mounted:function(){

        },
          methods:{
            close:function () {
                this.show=false
            },
            query:function () {
                this.system.test();
                this.show=false
            }
        }
    }
</script>

<style scoped>
    .panel-default{
     background-color: white;
     position: absolute;
     left: 11%;
     top: 20%;
     z-index: 9;
 }
</style>
