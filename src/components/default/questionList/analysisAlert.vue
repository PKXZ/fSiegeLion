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
                        <span class="questionBt">{{queItem.qName}}</span>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col :span="12">
                        <label>创建人：</label>
                        <span>{{queItem.qCreatePerson}}</span>
                    </a-col>
                    <a-col :span="12">
                        <label>创建时间：</label>
                        <span>{{queItem.qCreateTime}}</span>
                    </a-col>
                    <a-col :span="12">
                        <label>修改人：</label>
                        <span>{{queItem.qEditorPerson}}</span>
                    </a-col>
                    <a-col :span="12">
                        <label>修改时间：</label>
                        <span>{{queItem.qEditorTime}}</span>
                    </a-col>
                    <a-col :span="12" class="questionState">
                        <label>题库状态：</label>
                        <span class="questionState">
                            <template v-if="queItem.qStateNum === 0">
                                <a-badge status="success"></a-badge>
                            </template>
                            <template v-if="queItem.qStateNum === 1">
                                <a-badge status="error"></a-badge>
                            </template>
                            <p>{{queItem.qStateNum === 0 ? '开放': '关闭'}}</p>
                        </span>
                    </a-col>
                    <a-col :span="12">
                        <label>试题数量：</label>
                        <span>{{queItem.eNub}}道</span>
                    </a-col>
                </a-row>
            </a-col>
        </a-row>
        <a-divider orientation="left" class="questionADivider">题库组成</a-divider>
        <div style="width: 100%;height: 300px;" id="myChart"></div>
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
                let myChart = this.$echarts.init(document.getElementById('myChart'),'macarons');
                // 绘制图表
                myChart.setOption({
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c}道 (占{d}%)"
                    },
                    legend: {
                        type: 'scroll',
                        orient: 'vertical',
                        left: 10,
                        top: 20,
                        bottom: 20,
                        data: ['单选题','多选题','判断题','填空题','问答题']
                    },
                    series : [
                        {
                            name: '题库组成',
                            type: 'pie',
                            radius : '55%',
                            center: ['50%', '50%'],
                            data: [
                                {value:335, name:'单选题'},
                                {value:310, name:'多选题'},
                                {value:234, name:'判断题'},
                                {value:135, name:'填空题'},
                                {value:1548, name:'问答题'}
                            ],
                            label:{
                              normal:{
                                  formatter: "{b} : {c}道 (占{d}%)",
                              }
                            },
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                });
            }
        }
    }
</script>

<style scoped>

</style>