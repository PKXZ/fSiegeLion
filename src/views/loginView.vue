<template>
    <!--登录界面-->
    <div>
        {{msg}}
        <p>测试iconfont</p>
        <i class="iconfont icon-zhuyefangzi"></i>
        <p>测试echarts</p>
        <div style="width: 500px;height: 500px;" id="myChart"></div>
        <p>测试elementui</p>
        <el-button type="primary">我是elementui按钮</el-button>
        <p>测试less</p>
        <span>
            配置less  setting->tools->+ less-> <br>
            Program:  .....\node_modules\.bin\lessc  <br>
            Arguments:  $FileName$ $FileParentDir$\css\$FileNameWithoutExtension$.css --source-map  <br>
            Output paths to refresh: $FileNameWithoutExtension$.css  <br>
            参考： https://blog.csdn.net/weiwenwen6/article/details/79136605  <br>
        </span>
    </div>
</template>

<script>
    export default {
        name: "loginView",
        data(){
            return{
                msg: "登录界面"
            }
        },
        mounted(){
            this.testAxios();
            this.testEcharts();
        },
        methods:{
            testAxios(){
                //测试axios
                const self = this;
                const params = {
                    name: '13688071072',
                    pwd: '13688071072'
                };
                self.axios({
                    method: 'post',
                    url: self.api.commonAPi + '/login/access',
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    },
                    data: params
                })
                    .then((res) => {
                        console.log(res);
                    }).catch((err) => {
                    console.log(err);
                });
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

<style>

</style>