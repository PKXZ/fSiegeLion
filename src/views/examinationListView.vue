<template>
    <div class="mainContent">
        <a-button type="primary" icon="plus" @click="addExamination">新增</a-button>
        <!--表单-->
        <a-form :layout="formLayout" class="horizForm" :form="examinationForm">
            <a-form-item
                label="所属题库"
                :label-col="formItemLayout.labelCol"
                :wrapper-col="formItemLayout.wrapperCol">
                <a-select @change="handleChange" v-decorator="['qName']" :placeholder="qNamePl" :allowClear="allowClear" :dropdownMatchSelectWidth="dropdownMatchSelectWidth">
                    <a-select-option v-for="(item,index) in qName" :key="index" :value="item.value">{{item.name}}</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item
                label="试题状态"
                :label-col="formItemLayout.labelCol"
                :wrapper-col="formItemLayout.wrapperCol">
                <a-select @change="handleChange" :placeholder="eStateNumPl" :allowClear="allowClear" v-decorator="['eStateNum']" :dropdownMatchSelectWidth="dropdownMatchSelectWidth">
                    <a-select-option v-for="(item,index) in eStateNum" :key="index" :value="item.value" >{{item.name}}</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item
                label="试题类型"
                :label-col="formItemLayout.labelCol"
                :wrapper-col="formItemLayout.wrapperCol">
                <a-select @change="handleChange"  :placeholder="eTypePl" :allowClear="allowClear" v-decorator="['eType']" :dropdownMatchSelectWidth="dropdownMatchSelectWidth">
                    <a-select-option v-for="(item,index) in eType" :key="index" :value="item.value">{{item.name}}</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item
                label="试题难度"
                :label-col="formItemLayout.labelCol"
                :wrapper-col="formItemLayout.wrapperCol">
                <a-select @change="handleChange" :placeholder="eDifficultyPl" :allowClear="allowClear" v-decorator="['eDifficulty']" :dropdownMatchSelectWidth="dropdownMatchSelectWidth">
                    <a-select-option v-for="(item,index) in eDifficulty" :key="index" :value="item.value" >{{item.name}}</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item :wrapper-col="buttonItemLayout.wrapperCol">
                <a-button type="primary" @click="searchForm">查询</a-button>
            </a-form-item>
            <a-form-item :wrapper-col="buttonItemLayout.wrapperCol">
                <a-button @click="resetForm">重置</a-button>
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
            <template slot="eType" slot-scope="text, record">
                <span>{{eType[text].name}}</span>
            </template>
            <template slot="eStateNum" slot-scope="text, record">
                <template v-if="text === 0">
                    <a-badge status="success"></a-badge>
                </template>
                <template v-if="text === 1">
                    <a-badge status="error"></a-badge>
                </template>
                <span>{{text === 0 ? '开放' : '关闭'}}</span>
            </template>
            <template slot="eDifficulty" slot-scope="text, record">
                <span>{{eDifficulty[text].name}}</span>
            </template>
            <template slot="eCreatePerson" slot-scope="text, record">
                <span>{{text + ' ' + record.eCreateTime}}</span>
            </template>
            <template slot="operation" slot-scope="text, record">
                <a href="javascript:;" @click="editorExamination(text)">修改</a>
                <a-divider type="vertical" />
                <a-popconfirm
                    v-if="data.length"
                    title="确认删除?"
                    @confirm="() => onDelete(record.id)">
                    <a href="javascript:;">删除</a>
                </a-popconfirm>
                <a-divider type="vertical" />
                <a href="javascript:;" @click="analysis(text)">预览试题</a>
            </template>
        </a-table>

        <!--新增修改弹窗-->
        <add-modify-alert v-if="alertType === 'add' || alertType === 'editor'" :visible="visible" :alertType="alertType" @emitVisible="emitVisible" :queItem="queItem"></add-modify-alert>
        <!--数据分析-->
        <preview-examination v-if="alertType === 'analysis'" :visible="visible" :alertType="alertType" @emitVisible="emitVisible" :queItem="queItem"></preview-examination>
    </div>
</template>

<script>
    import addModifyAlert from '../components/default/examinationList/addModifyAlert'
    import previewExamination from '../components/default/examinationList/previewExamination'
    export default {
        name: "examinationListView",
        data(){
            return{
                formLayout: 'inline',
                dropdownMatchSelectWidth: false,
                examinationForm: this.$form.createForm(this),
                allowClear: true,
                qName: [
                    {
                        name: '2019年Vue.js最新前端面试题库',
                        value: 0
                    },{
                        name: '2018年Vue.js最新前端面试题库',
                        value: 1
                    },{
                        name: '2017年Vue.js最新前端面试题库',
                        value: 2
                    },{
                        name: '2016年Vue.js最新前端面试题库',
                        value: 3
                    }
                ],
                eStateNum:[
                    {
                        name: '开放',
                        value: 0
                    },{
                        name: '关闭',
                        value: 1
                    }
                ],
                eType: [
                    {
                        name: '单选题',
                        value: 0
                    },{
                        name: '多选题',
                        value: 1
                    },{
                        name: '填空题',
                        value: 2
                    },{
                        name: '判断题',
                        value: 3
                    },{
                        name: '问题题',
                        value: 4
                    }
                ],
                eDifficulty: [
                    {
                        name: '非常容易',
                        value: 0
                    },{
                        name: '比较容易',
                        value: 1
                    },{
                        name: '常规',
                        value: 2
                    },{
                        name: '比较难',
                        value: 3
                    },{
                        name: '非常难',
                        value: 4
                    }
                ],
                qNamePl: '请选择所属题库',
                eStateNumPl: '请选择试题状态',
                eTypePl: '请选择试题类型',
                eDifficultyPl: '请选择试题难度',
                notFoundContent: '请选择试题难度',
                /*表格*/
                columns: [
                    {
                        title: '试题类型',
                        width: 150,
                        key: 'eType',
                        scopedSlots: { customRender: 'eType' },
                        dataIndex: 'eType',
                        align: 'center',
                        filters: [
                            {
                                text: '单选题',
                                value: '0'
                            },{
                                text: '多选题',
                                value: '1'
                            },{
                                text: '填空题',
                                value: '2'
                            },{
                                text: '判断题',
                                value: '3'
                            },{
                                text: '问题题',
                                value: '4'
                            }
                        ],
                    },{
                        title: '所属题库',
                        dataIndex: 'qName',
                        align: 'center',
                        sorter: true,
                    },{
                        title: '试题状态',
                        width: 150,
                        key: 'eStateNum',
                        scopedSlots: { customRender: 'eStateNum' },
                        dataIndex: 'eStateNum',
                        align: 'center',
                        filters: [
                            { text: '开放', value: '开放' },
                            { text: '关闭', value: '关闭' },
                        ],
                    }, {
                        title: '试题难度',
                        width: 180,
                        key: 'eDifficulty',
                        scopedSlots: { customRender: 'eDifficulty' },
                        dataIndex: 'eDifficulty',
                        align: 'center',
                        filters: [
                            {
                                text: '非常容易',
                                value: '0'
                            },{
                                text: '比较容易',
                                value: '1'
                            },{
                                text: '常规',
                                value: '2'
                            },{
                                text: '比较难',
                                value: '3'
                            },{
                                text: '非常难',
                                value: '4'
                            }
                        ],
                    }, {
                        title: '创建人',
                        width: 280,
                        dataIndex: 'eCreatePerson',
                        key: 'eCreatePerson',
                        scopedSlots: { customRender: 'eCreatePerson' },
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
                        qName: `2019年Vue.js最新前端面试题库1`,
                        eStateNum: 0,
                        eDifficulty: 1,
                        eType: 0,
                        eCreatePerson: 'pikaXz',
                        eCreateTime: '2019年8月22日 17:53',
                        eEditorPerson: 'pikaXz',
                        eEditorTime: '2019年8月22日 17:53'
                    },{
                        id: 1,
                        qName: `2019年Vue.js最新前端面试题库2`,
                        eStateNum: 1,
                        eDifficulty: 2,
                        eType: 2,
                        eCreatePerson: 'pikaXz',
                        eCreateTime: '2019年8月22日 17:53',
                        eEditorPerson: 'pikaXz',
                        eEditorTime: '2019年8月22日 17:53'
                    },{
                        id: 2,
                        qName: `2019年Vue.js最新前端面试题库3`,
                        eStateNum: 0,
                        eDifficulty: 1,
                        eType: 0,
                        eCreatePerson: 'pikaXz',
                        eCreateTime: '2019年8月22日 17:53',
                        eEditorPerson: 'pikaXz',
                        eEditorTime: '2019年8月22日 17:53'
                    },{
                        id: 3,
                        qName: `2019年Vue.js最新前端面试题库4`,
                        eStateNum: 0,
                        eDifficulty: 1,
                        eType: 0,
                        eCreatePerson: 'pikaXz',
                        eCreateTime: '2019年8月22日 17:53',
                        eEditorPerson: 'pikaXz',
                        eEditorTime: '2019年8月22日 17:53'
                    },{
                        id: 4,
                        qName: `2019年Vue.js最新前端面试题库5`,
                        eStateNum: 0,
                        eDifficulty: 1,
                        eType: 0,
                        eCreatePerson: 'pikaXz',
                        eCreateTime: '2019年8月22日 17:53',
                        eEditorPerson: 'pikaXz',
                        eEditorTime: '2019年8月22日 17:53'
                    },{
                        id: 5,
                        qName: `2019年Vue.js最新前端面试题库6`,
                        eStateNum: 0,
                        eDifficulty: 1,
                        eType: 0,
                        eCreatePerson: 'pikaXz',
                        eCreateTime: '2019年8月22日 17:53',
                        eEditorPerson: 'pikaXz',
                        eEditorTime: '2019年8月22日 17:53'
                    },{
                        id: 6,
                        qName: `2019年Vue.js最新前端面试题库7`,
                        eStateNum: 0,
                        eDifficulty: 1,
                        eType: 0,
                        eCreatePerson: 'pikaXz',
                        eCreateTime: '2019年8月22日 17:53',
                        eEditorPerson: 'pikaXz',
                        eEditorTime: '2019年8月22日 17:53'
                    },{
                        id: 7,
                        qName: `2019年Vue.js最新前端面试题库8`,
                        eStateNum: 0,
                        eDifficulty: 1,
                        eType: 0,
                        eCreatePerson: 'pikaXz',
                        eCreateTime: '2019年8月22日 17:53',
                        eEditorPerson: 'pikaXz',
                        eEditorTime: '2019年8月22日 17:53'
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
            addExamination(){
                this.visible = true;
                this.alertType = 'add';
            },
            editorExamination(text){
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
            searchForm(){
                console.log('查询');
                console.log(this.examinationForm.getFieldsValue());
            },
            resetForm(){
                this.examinationForm.resetFields();
            }
        },
        components:{
            addModifyAlert,
            previewExamination
        }
    }
</script>

<style>

</style>