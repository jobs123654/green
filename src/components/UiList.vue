<template>
    <ul class="list-group">
        <li class="list-group-item" @click='item.method'  v-for="item in items">{{item.name}}</li>
    </ul>
</template>

<script>
    export default {
        name: "UiList",
        props:{
          list:{

              type:Array,
          }
        },
        methods:{
            close:function (argument) {
              /* body... */
              this.$parent.visible=false;
            }
        },
        data:function () {
            return{
              items:this.list
            }
        },
        mounted:function () {
            
        }
    }
</script>

<style scoped>

</style>
