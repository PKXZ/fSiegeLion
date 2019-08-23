<template>
    <div class="mainContent">
        <a-button type="primary" icon="plus" @click="addQusetion">新增</a-button>
        <!--表单-->
        <a-form :layout="formLayout" class="horizForm" :form="questionForm">
            <a-form-item
                label="题库名称"
                :label-col="formItemLayout.labelCol"
                :wrapper-col="formItemLayout.wrapperCol">
                <a-input placeholder="请输入题库名称" v-decorator="['qName']"/>
            </a-form-item>
            <a-form-item
                label="状态"
                :label-col="formItemLayout.labelCol"
                :wrapper-col="formItemLayout.wrapperCol">
                <a-select :initialValue="qstateNumDV" @change="handleChange" v-decorator="['qstateNum']" :placeholder="qstateNumPl" :allowClear="allowClear" :dropdownMatchSelectWidth="dropdownMatchSelectWidth">
                    <a-select-option v-for="(item,index) in qstateNum" :key="index" :value="item.value" >{{item.name}}</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item :wrapper-col="buttonItemLayout.wrapperCol">
                <a-button type="primary" @click="serchForm">
                    查询
                </a-button>
            </a-form-item>
            <a-form-item :wrapper-col="buttonItemLayout.wrapperCol">
                <a-button @click="resetForm">
                    重置
                </a-button>
            </a-form-item>
        </a-form>
        <!--表格-->
        <a-alert
            type="info"
            showIcon
            class="commonAlert">
            <span slot="message" v-html="alertMessge" @click="selEmpty($event)"></span>
        </a-alert>
        <a-table
             rowKey="id"
            :columns="columns"
            :dataSource="data"
            :loading="loading"
            :scroll="{ y: 500 }"
            :pagination="pagination"
            :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
            @change="handleTableChange">
            <template slot="qImgUrl" slot-scope="text, record">
                <img :src="text" class="questionImg"/>
            </template>
            <template slot="qStateNum" slot-scope="text, record">
               <template v-if="text === 0">
                   <a-badge status="success"></a-badge>
               </template>
                <template v-if="text === 1">
                    <a-badge status="error"></a-badge>
                </template>
                <span>{{text === 0 ? '开放' : '关闭'}}</span>
            </template>
            <template slot="operation" slot-scope="text, record">
                <a href="javascript:;" @click="editorQusetion(text)">修改</a>
                <a-divider type="vertical" />
                <a-popconfirm
                    v-if="data.length"
                    title="确认删除?"
                    @confirm="() => onDelete(record.id)">
                    <a href="javascript:;">删除</a>
                </a-popconfirm>
                <a-divider type="vertical" />
                <a href="javascript:;" @click="analysis(text)">数据分析</a>
            </template>
        </a-table>

        <!--新增修改弹窗-->
        <add-modify-alert v-if="alertType === 'add' || alertType === 'editor'" :visible="visible" :alertType="alertType" @emitVisible="emitVisible" :queItem="queItem"></add-modify-alert>
        <!--数据分析-->
        <analysis-alert v-if="alertType === 'analysis'" :visible="visible" :alertType="alertType" @emitVisible="emitVisible" :queItem="queItem"></analysis-alert>
    </div>
</template>

<script>
    import addModifyAlert from '../components/default/questionList/addModifyAlert'
    import analysisAlert from '../components/default/questionList/analysisAlert'
    export default {
        name: "questionListView",
        data(){
            return{
                formLayout: 'inline',
                questionForm: this.$form.createForm(this),
                qstateNum:[
                    {
                        name: '开放',
                        value: 0
                    },{
                        name: '关闭',
                        value: 1
                    }
                ],
                qstateNumDV: '',
                qstateNumPl: '请选择题库状态',
                dropdownMatchSelectWidth: false,
                allowClear: true,
                /*表格*/
                columns: [
                    {
                        title: '题库名称',
                        dataIndex: 'qName',
                        align: 'center',
                        sorter: true,
                    }, {
                        title: '题库图标',
                        width: 150,
                        key: 'qImgUrl',
                        scopedSlots: { customRender: 'qImgUrl' },
                        dataIndex: 'qImgUrl',
                        align: 'center'
                    },  {
                        title: '题库状态',
                        width: 150,
                        key: 'qStateNum',
                        scopedSlots: { customRender: 'qStateNum' },
                        dataIndex: 'qStateNum',
                        align: 'center',
                        filters: [
                            { text: '开放', value: '开放' },
                            { text: '关闭', value: '关闭' },
                        ],
                    }, {
                        title: '试题数量',
                        width: 150,
                        dataIndex: 'eNub',
                        align: 'center',
                        sorter: true
                    },  {
                        title: '备注',
                        width: 280,
                        dataIndex: 'qNote',
                        align: 'center'
                    }, {
                        title: '操作',
                        width: 180,
                        key: 'operation',
                        scopedSlots: { customRender: 'operation' },
                        align: 'center'
                    }
                ],
                data: [
                    {
                        id: 0,
                        qName: `2019年Vue.js最新前端面试题库`,
                        qImgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566386054475&di=5318acb9f716efea5a50a20565e3c267&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fq_70%2Cc_zoom%2Cw_640%2Fimages%2F20180622%2Ff16fcd0b55454535be73cc603d50dbdd.jpeg',
                        qStateNum: 0,
                        eNub: 20,
                        qNote: `2019年Vue.js最新前端面试题库`,
                        qCreatePerson: 'pikaXz',
                        qCreateTime: '2019年8月22日 17:53',
                        qEditorPerson: 'pikaXz',
                        qEditorTime: '2019年8月22日 17:53'
                    },{
                        id: 1,
                        qName: `2019年Vue.js最新前端面试题库`,
                        qImgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566386054475&di=5318acb9f716efea5a50a20565e3c267&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fq_70%2Cc_zoom%2Cw_640%2Fimages%2F20180622%2Ff16fcd0b55454535be73cc603d50dbdd.jpeg',
                        qStateNum: 0,
                        eNub: 20,
                        qNote: `2019年Vue.js最新前端面试题库`,
                        qCreatePerson: 'pikaXz',
                        qCreateTime: '2019年8月22日 17:53',
                        qEditorPerson: 'pikaXz',
                        qEditorTime: '2019年8月22日 17:53'
                    },{
                        id: 2,
                        qName: `2019年Vue.js最新前端面试题库`,
                        qImgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566386054475&di=5318acb9f716efea5a50a20565e3c267&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fq_70%2Cc_zoom%2Cw_640%2Fimages%2F20180622%2Ff16fcd0b55454535be73cc603d50dbdd.jpeg',
                        qStateNum: 0,
                        eNub: 20,
                        qNote: `2019年Vue.js最新前端面试题库`,
                        qCreatePerson: 'pikaXz',
                        qCreateTime: '2019年8月22日 17:53',
                        qEditorPerson: 'pikaXz',
                        qEditorTime: '2019年8月22日 17:53'
                    },{
                        id: 3,
                        qName: `2019年Vue.js最新前端面试题库`,
                        qImgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566386054475&di=5318acb9f716efea5a50a20565e3c267&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fq_70%2Cc_zoom%2Cw_640%2Fimages%2F20180622%2Ff16fcd0b55454535be73cc603d50dbdd.jpeg',
                        qStateNum: 0,
                        eNub: 20,
                        qNote: `2019年Vue.js最新前端面试题库`,
                        qCreatePerson: 'pikaXz',
                        qCreateTime: '2019年8月22日 17:53',
                        qEditorPerson: 'pikaXz',
                        qEditorTime: '2019年8月22日 17:53'
                    },{
                        id: 4,
                        qName: `2019年Vue.js最新前端面试题库`,
                        qImgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566386054475&di=5318acb9f716efea5a50a20565e3c267&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fq_70%2Cc_zoom%2Cw_640%2Fimages%2F20180622%2Ff16fcd0b55454535be73cc603d50dbdd.jpeg',
                        qStateNum: 0,
                        eNub: 20,
                        qNote: `2019年Vue.js最新前端面试题库`,
                        qCreatePerson: 'pikaXz',
                        qCreateTime: '2019年8月22日 17:53',
                        qEditorPerson: 'pikaXz',
                        qEditorTime: '2019年8月22日 17:53'
                    },{
                        id: 5,
                        qName: `2019年Vue.js最新前端面试题库`,
                        qImgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566386054475&di=5318acb9f716efea5a50a20565e3c267&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fq_70%2Cc_zoom%2Cw_640%2Fimages%2F20180622%2Ff16fcd0b55454535be73cc603d50dbdd.jpeg',
                        qStateNum: 0,
                        eNub: 20,
                        qNote: `2019年Vue.js最新前端面试题库`,
                        qCreatePerson: 'pikaXz',
                        qCreateTime: '2019年8月22日 17:53',
                        qEditorPerson: 'pikaXz',
                        qEditorTime: '2019年8月22日 17:53'
                    },{
                        id: 6,
                        qName: `2019年Vue.js最新前端面试题库`,
                        qImgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566386054475&di=5318acb9f716efea5a50a20565e3c267&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fq_70%2Cc_zoom%2Cw_640%2Fimages%2F20180622%2Ff16fcd0b55454535be73cc603d50dbdd.jpeg',
                        qStateNum: 0,
                        eNub: 20,
                        qNote: `2019年Vue.js最新前端面试题库`,
                        qCreatePerson: 'pikaXz',
                        qCreateTime: '2019年8月22日 17:53',
                        qEditorPerson: 'pikaXz',
                        qEditorTime: '2019年8月22日 17:53'
                    },{
                        id: 7,
                        qName: `2019年Vue.js最新前端面试题库`,
                        qImgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566386054475&di=5318acb9f716efea5a50a20565e3c267&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fq_70%2Cc_zoom%2Cw_640%2Fimages%2F20180622%2Ff16fcd0b55454535be73cc603d50dbdd.jpeg',
                        qStateNum: 0,
                        eNub: 20,
                        qNote: `2019年Vue.js最新前端面试题库`,
                        qCreatePerson: 'pikaXz',
                        qCreateTime: '2019年8月22日 17:53',
                        qEditorPerson: 'pikaXz',
                        qEditorTime: '2019年8月22日 17:53'
                    }
                ],
                pageSize: 0,
                pagination: {
                    defaultPageSize:5, //默认每页条数
                    defaultCurrent: 1, //默认当前页数
                    pageSizeOptions: ['5', '10', '15', '20'], //指定每页可以显示多少条
                    showSizeChanger: true, //是否可以改变pageSize
                    showQuickJumper: true, //是否可以快速跳转到某夜
                    showTotal: (total,range) => `共 ${total} 条记录`,
                    onShowSizeChange:(current, pageSize)=>{
                        this.pageSize = pageSize;
                        console.log(this.pageSize);
                        console.log(current);
                    },
                },
                selectedRowKeys: [],
                loading: false,
                alertMessge: '当前选择<span class="selNum">0</span>项 <a href="#" class="selEmpty" id="del">批量删除</a><a href="#" class="selEmpty" id="clear">清空</a>',
                /*弹窗*/
                visible: false,
                alertType: '',
                queItem: {}
            }
        },
        watch:{
            selectedRowKeys(newVal,oldVal){
                this.alertMessge = '当前选择'+ '<span class="selNum">'+ newVal.length + '</span>项 <a href="#" class="selEmpty" id="del">批量删除</a><a href="#" class="selEmpty" id="clear">清空</a>';
            }
        },
        computed:{
            formItemLayout () {
                const { formLayout } = this;
                return formLayout === 'horizontal' ? {
                    labelCol: { span: 4 },
                    wrapperCol: { span: 14 },
                } : {};
            },
            buttonItemLayout () {
                const { formLayout } = this;
                return formLayout === 'horizontal' ? {
                    wrapperCol: { span: 14, offset: 4 },
                } : {};
            }
        },
        methods:{
            handleChange(value) {
                console.log(`selected ${value}`);
            },
            onSelectChange (selectedRowKeys) {
                console.log('selectedRowKeys changed: ', selectedRowKeys);
                this.selectedRowKeys = selectedRowKeys
            },
            onDelete (id) {
                const dataSource = [...this.data];
                this.data = dataSource.filter(item => item.id !== id)
            },
            handleTableChange(pagination, filters, sorter) {
                console.log(pagination, filters, sorter)
            },
            selEmpty(event){
                //清空
                if(event.target.nodeName === 'A'){
                    if(event.target.id === 'clear'){
                        // 获取触发事件对象的属性
                        console.log('清空');
                        this.selectedRowKeys = [];
                    }
                    if(event.target.id === 'del'){
                        console.log('批量删除');
                    }
                }
            },
            addQusetion(){
                this.visible = true;
                this.alertType = 'add';
            },
            editorQusetion(text){
                this.visible = true;
                this.alertType = 'editor';
                this.queItem = text;
            },
            analysis(text){
                //数据分析
                this.visible = true;
                this.alertType = 'analysis';
                this.queItem = text;
            },
            emitVisible(visible){
                //弹窗状态
                this.visible = visible;
                this.alertType = '';
            },
            serchForm(){
                console.log('查询');
                console.log(this.questionForm.getFieldsValue());
            },
            resetForm(){
                this.questionForm.resetFields();
            }
        },
        components:{
            addModifyAlert,
            analysisAlert
        }
    }
</script>

<style>

</style>