<template>
    <div>
       <!--病虫草害预防-->
        <mt-cell is-link="false" title="地图切换">
            <mt-radio
                    title=""
                    v-model="baseLayer"
                    :options="layerOption">
            </mt-radio>

        </mt-cell>


        <mt-checklist
                title=""
                v-model="checkValue"
                :options="checklist">
        </mt-checklist>

        <!--over-->
        <!--病虫草害预防-->


        <!--over-->
        <!--病虫草害预防-->


        <!--over-->
        <!--病虫草害预防-->

        <!--over-->
        <!--病虫草害预防-->

        <!--over-->

    </div>
</template>

<script>
    import { Cell } from 'mint-ui';

    import { Switch } from 'mint-ui';
    import { Checklist } from 'mint-ui';
    import { Radio } from 'mint-ui';

    export default {
    name: 'Set',
        data:function () {
            return{
                checklist:['开启自动分区', '开启巡查维护'],
                baseLayer:0,
                checkValue:[],
                layerOption:[
                    {
                        label: '影像图',
                        value: '0'
                    },
                    {
                        label: '矢量图',
                        value: '1'
                    }
                ]
            }
        }
  }
</script>

<style scoped>
    .row{
        padding-left: 15%;
    }
.col-xs-3{
    background-color: #4cd964;

}
</style>
