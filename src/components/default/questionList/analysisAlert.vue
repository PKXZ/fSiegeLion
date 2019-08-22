<template>
    <a-modal
        title="数据分析"
        :visible="visible"
        :confirmLoading="confirmLoading"
        :footer="null"
        :width="800"
        @ok="handleOk"
        @cancel="handleCancel">
        <a-row class="questionAnalysis" :gutter="16">
            <a-col :span="4" class="imgCol">
                <img src="../../../assets/img/vue.jpg"/>
            </a-col>
            <a-col :span="20">
                <a-row>
                    <a-col :span="24">
                        <span class="questionBt">{{queItem.name}}</span>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col :span="12">
                        <label>创建人：</label>
                        <span>{{queItem.createPerson}}</span>
                    </a-col>
                    <a-col :span="12">
                        <label>创建时间：</label>
                        <span>{{queItem.createTime}}</span>
                    </a-col>
                    <a-col :span="12">
                        <label>修改人：</label>
                        <span>{{queItem.editorPerson}}</span>
                    </a-col>
                    <a-col :span="12">
                        <label>修改时间：</label>
                        <span>{{queItem.editorTime}}</span>
                    </a-col>
                    <a-col :span="12" class="questionState">
                        <label>题库状态：</label>
                        <span class="questionState">
                            <template v-if="queItem.stateNum === 0">
                                <a-badge status="success"></a-badge>
                            </template>
                            <template v-if="queItem.stateNum === 1">
                                <a-badge status="error"></a-badge>
                            </template>
                            <p>{{queItem.stateNum === 0 ? '开放': '关闭'}}</p>
                        </span>
                    </a-col>
                    <a-col :span="12">
                        <label>试题数量：</label>
                        <span>{{queItem.questionNub}}道</span>
                    </a-col>
                </a-row>
            </a-col>
        </a-row>
        <a-divider orientation="left" class="questionADivider">题库组成</a-divider>
        <div style="width: 500px;height: 500px;" id="myChart"></div>
    </a-modal>
</template>

<script>
    export default {
        name: "analysisAlert",
        props:{
            visible:{
                //弹窗显示或隐藏
                type: Boolean,
                default: false
            },
            alertType:{
                //弹窗类型
                type: String,
                default: 'analysis'
            },
            queItem:{
                //修改值
                type: Object
            }
        },
        data(){
            return{
                confirmLoading: false,
            }
        },
        mounted(){
            this.testEcharts()
        },
        methods:{
            handleOk(e) {
                this.confirmLoading = true;
                setTimeout(() => {
                    this.$emit('emitVisible',false);
                    this.confirmLoading = false;
                }, 1000);
            },
            handleCancel(e) {
                this.$emit('emitVisible',false);
            },
            testEcharts(){
                //测试echarts
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById('myChart'))
                // 绘制图表
                myChart.setOption({
                    title: { text: '在Vue中使用echarts' },
                    tooltip: {},
                    xAxis: {
                        data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
                    },
                    yAxis: {},
                    series: [{
                        name: '销量',
                        type: 'bar',
                        data: [5, 20, 36, 10, 10, 20]
                    }]
                });
            }
        }
    }
</script>

<style scoped>

</style>