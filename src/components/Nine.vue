<template>
    <div class="main">
        <div class="box">
            <div class="content">
                格子1
            </div>
        </div>
        <div class="box">
            <div class="content">
                格子2
            </div>
        </div>
        <div class="box">
            <div class="content">
                格子3
            </div>
        </div>
        <div class="box"></div>
        <div class="box"></div>
        <div class="box"></div>
        <div class="box"></div>
        <div class="box"></div>
        <div class="box"></div>
    </div>

</template>

<script>
  export default {
    name: 'Nine',

  };

</script>

<style scoped>
    * { padding: 0; margin: 0; }
    .main {

        background-color: #fff;
        width: 100%;
        padding-bottom: 100%;
        padding-left: 0.5%;
        　　 padding-top: 0.5%;
    }
    .main .box {
        width: 31%;
        padding-bottom: 31%;
        border: 1% solid #fff;
        background-color: mediumpurple;
        border-radius: 3%;
        float: left;
        margin: 1%;
        position: relative;   /*父元素给相对定位*/
    }
    .main .box .content {
        　　position: absolute;    /*子元素给绝对定位*/
        　　width: 100%;
        　 height: 100%;
    }
</style>
