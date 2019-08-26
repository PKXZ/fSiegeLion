<template>
    <!--新增，修改题库-->
    <a-modal
        :title="alertType === 'add' ? '新增题库' : '修改题库'"
        :visible="visible"
        :confirmLoading="confirmLoading"
        @ok="handleOk"
        :width="1000"
        :footer="null"
        @cancel="handleCancel">
        <div class="addModdifyAlert">
            <a-steps :current="current" size="small">
                <a-step v-for="item in steps" :key="item.title" :title="item.title" :description="item.description"></a-step>
            </a-steps>
            <div class="steps-content stepContent" v-show="current === 0">
                 <a-form :form="examinationInfo" :gutter="16">
                     <a-form-item
                         :label-col="formItemLayout.labelCol"
                         :wrapper-col="formItemLayout.wrapperCol"
                         label="所属题库">
                        <a-select @change="handleChange" v-decorator="['qName',{rules: [{ required: true, message: '请选择所属题库' }]}]" :placeholder="qNamePl" :allowClear="allowClear" :dropdownMatchSelectWidth="dropdownMatchSelectWidth">
                             <a-select-option v-for="(item,index) in qName" :key="index" :value="item.value">{{item.name}}</a-select-option>
                         </a-select>
                     </a-form-item>
                     <a-form-item
                         :label-col="formItemLayout.labelCol"
                         :wrapper-col="formItemLayout.wrapperCol"
                         label="试题难度">
                         <a-select @change="handleChange" v-decorator="['eDifficulty',{rules: [{ required: true, message: '请选择试题难度' }]}]" :placeholder="eDifficultyPl" :allowClear="allowClear" :dropdownMatchSelectWidth="dropdownMatchSelectWidth">
                             <a-select-option v-for="(item,index) in eDifficulty" :key="index" :value="item.value">{{item.name}}</a-select-option>
                         </a-select>
                     </a-form-item>
                     <a-form-item
                         :label-col="formItemLayout.labelCol"
                         :wrapper-col="formItemLayout.wrapperCol"
                         label="试题类型">
                         <a-select @change="handleChange" v-decorator="['eType',{rules: [{ required: true, message: '请选择试题类型' }]}]" :placeholder="eTypePl" :allowClear="allowClear" :dropdownMatchSelectWidth="dropdownMatchSelectWidth">
                             <a-select-option v-for="(item,index) in eType" :key="index" :value="item.value">{{item.name}}</a-select-option>
                         </a-select>
                     </a-form-item>
                     <a-form-item
                         :label-col="formItemLayout.labelCol"
                         :wrapper-col="formItemLayout.wrapperCol"
                         label="试题状态">
                         <a-switch
                             checkedChildren="开"
                             unCheckedChildren="关"
                             v-decorator="[
                              'eStateNum',
                              {
                                rules: [{ required: true, message: '请选择试题状态' }],
                                valuePropName: !queItem ? 'checked' : queItem.eStateNum === 0 ? 'checked' : 'checked:false',
                                initialValue: !queItem ? 'checked' : queItem.eStateNum === 0 ? 'checked' : 'checked:false'
                              },
                            ]">
                         </a-switch>
                     </a-form-item>
                     <a-form-item
                         :label-col="formItemLayout.labelCol"
                         :wrapper-col="formItemLayout.wrapperCol"
                         label="试题标签"
                         class="eTagsItem"
                         :validate-status="colorValidateStatus">
                         <template v-for="(tag, index) in eTags">
                             <a-tooltip v-if="tag.length > 20" :key="tag" :title="tag">
                                 <a-tag :key="index" :closable="index !== 0" :color="tag.color" :afterClose="() => handleClose(tag)">
                                     {{`${tag.text.slice(0, 20)}...`}}
                                 </a-tag>
                             </a-tooltip>
                             <a-tag v-else :key="index" :closable="index !== 0" :color="tag.color" :afterClose="() => handleClose(tag)">
                                 {{tag.text}}
                             </a-tag>
                         </template>
                         <!--颜色选择器组件-->
                         <div v-if="inputVisible" class="eTagsDiv">
                             <a-input
                                  ref="eTagsRef"
                                  type="text"
                                  :style="{ width: '220px' }"
                                  size="small"
                                  @change="handleInputChange">
                                 <div class="colorPickerDiv" slot="addonBefore">
                                     <colorPicker v-model="colorPicker" :change="headleChangeColor"></colorPicker>
                                 </div>
                                 <template slot="addonAfter">
                                     <a-button size="small" type="primary" @click="handleInputConfirm">
                                         <a-icon type="check"></a-icon>
                                     </a-button>
                                     <a-button size="small" @click="showInput">
                                         <a-icon type="close"></a-icon>
                                     </a-button>
                                 </template>
                             </a-input>
                         </div>
                         <a-tag v-else @click="showInput" style="background: #fff; border-style: dashed;">
                             <a-icon type="plus" />添加试题标签
                         </a-tag>
                     </a-form-item>
                     <a-form-item
                         :label-col="formItemLayout.labelCol"
                         :wrapper-col="formItemLayout.wrapperCol"
                         label="试题来源">
                         <a-input v-decorator="['eSource']">
                             <a-select slot="addonBefore" defaultValue="Http://" style="width: 90px">
                                 <a-select-option value="Http://">Http://</a-select-option>
                                 <a-select-option value="Https://">Https://</a-select-option>
                             </a-select>
                             <a-select slot="addonAfter" defaultValue=".com" style="width: 80px">
                                 <a-select-option value=".com">.com</a-select-option>
                                 <a-select-option value=".jp">.jp</a-select-option>
                                 <a-select-option value=".cn">.cn</a-select-option>
                                 <a-select-option value=".org">.org</a-select-option>
                             </a-select>
                         </a-input>
                     </a-form-item>
                 </a-form>
            </div>
            <div class="steps-content stepContent" v-show="current === 1">
                <ckeditor5></ckeditor5>
            </div>
            <div class="steps-action stepAction">
                <a-button v-if="current < steps.length - 1" type="primary" @click="next">下一步</a-button>
                <a-button v-if="current === steps.length - 1" type="primary" @click="$message.success('Processing complete!')">下一步</a-button>
                <a-button v-if="current>0" style="margin-left: 8px" @click="prev">上一步</a-button>
            </div>
        </div>
    </a-modal>
</template>

<script>
    import ckeditor5 from '../../../components/common/ckedtor5'
    export default {
        name: "addModdifyAlert",
        props:{
            visible:{
                //弹窗显示或隐藏
                type: Boolean,
                default: false
            },
            alertType:{
                //弹窗类型
                type: String,
                default: 'add'
            },
            queItem:{
                //修改值
                type: Object
            }
        },
        data(){
            return{
                confirmLoading: false,
                /*步骤条*/
                current: 1,
                steps: [{
                    title: '第一步',
                    description: '基础信息',
                    content: '第一步内容'
                }, {
                    title: '第二步',
                    description: '试卷详情',
                    content: '第二步内容',
                }],
                formItemLayout: {
                    labelCol: { span: 2 },
                    wrapperCol: { span: 22 },
                },
                dropdownMatchSelectWidth: false,
                allowClear: true,
                /*第一步表单*/
                examinationInfo: this.$form.createForm(this),
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
                colorPicker: '#409EFF',
                /*标签*/
                eTags: [
                    {
                        text: 'vue.js',
                        color: '#87d068'
                    },{
                        text: 'react.js',
                        color: '#f50'
                    }
                ],
                inputVisible: false,
                inputValue: '',
                colorValidateStatus: '',
            }
        },
        mounted(){
        },
        methods:{
            next() {
                this.examinationInfo.validateFields((err, values) => {
                    if (!err) {
                        console.log('Received values of form: ', values);
                        console.log('还要加上eTags的数据哦');
                        console.log(this.eTags);
                        this.current++;
                    }
                });
            },
            prev() {
                this.current--
            },
            handleOk(e) {
                this.confirmLoading = true;
                this.examinationInfo.validateFields((err, values) => {
                    if (!err) {
                        console.info('success')
                        console.log('Received values of form: ', values);
                        setTimeout(() => {
                            this.$emit('emitVisible',false);
                            this.confirmLoading = false;
                        }, 1000);
                    }else {
                        this.confirmLoading = false;
                    }
                });
            },
            handleCancel(e) {
                this.$emit('emitVisible',false);
            },
            handleChange(value) {
                console.log(`selected ${value}`);
            },
            /*标签*/
            handleClose (removedTag) {
                const tags = this.eTags.filter(tag => tag !== removedTag);
                this.eTags = tags;
            },
            showInput () {
                if(this.inputVisible){
                    this.inputVisible = false;
                }else{
                    this.inputVisible = true;
                    this.$nextTick(function () {
                        this.$refs.eTagsRef.focus();
                    });
                }
            },
            handleInputChange (e) {
                this.inputValue = e.target.value;
            },
            handleInputConfirm () {
                if(this.inputValue){
                    const inputValue = this.inputValue;
                    let eTags = this.eTags;
                    let flag = false;
                    for(let i = 0; i < eTags.length; i++){
                        if(inputValue && eTags[i].text.indexOf(inputValue) === -1) {
                            flag = true;
                        }else{
                            flag = false;
                        }
                    }
                    if(flag){
                        let obj = {
                            text: inputValue,
                            color: this.colorPicker
                        };
                        eTags = [...eTags, obj];
                        console.log(eTags);
                        Object.assign(this, {
                            eTags,
                            inputVisible: false,
                            inputValue: '',
                        })
                    }
                }else{
                    this.colorValidateStatus = 'error';
                }
            },
            headleChangeColor(color){
                console.log('颜色改变时触发'+color)
            }
        },
        components:{
            ckeditor5
        }
    }
</script>

<style scoped>

</style>