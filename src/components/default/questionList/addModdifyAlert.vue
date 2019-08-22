<template>
    <!--新增，修改题库-->
    <a-modal
        :title="alertType === 'add' ? '新增题库' : '修改题库'"
        :visible="visible"
        :confirmLoading="confirmLoading"
        @ok="handleOk"
        @cancel="handleCancel">
        <a-form :form="form">
            <a-form-item
                :label-col="formItemLayout.labelCol"
                :wrapper-col="formItemLayout.wrapperCol"
                label="题库名称">
                <a-input
                    v-decorator="[
                      'name',
                      {
                      rules: [{ required: true, message: '请输入题库名称' }],
                      initialValue: queItem.name
                      }
                    ]"
                    placeholder="请输入题库名称"/>
            </a-form-item>
            <a-form-item
                :label-col="formItemLayout.labelCol"
                :wrapper-col="formItemLayout.wrapperCol"
                label="题库图标">
                <div class="clearfix">
                    <a-upload
                        listType="picture-card"
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        :fileList="fileList"
                        :beforeUpload="beforeUpload"
                        @preview="handlePreview"
                        @change="handleChange"
                        v-decorator="[
                          'imgUrl',
                          {
                            rules: [{ required: true, message: '请上传题库图标' }],
                            initialValue: queItem.imgUrl
                          }
                        ]">
                        <div v-if="fileList.length < 1">
                            <a-icon type="plus" />
                            <div class="ant-upload-text">上传</div>
                        </div>
                    </a-upload>
                    <a-modal :visible="previewVisible" :footer="null" @cancel="previewCancel">
                        <img alt="example" style="width: 100%" :src="previewImage" />
                    </a-modal>
                </div>
            </a-form-item>
            <a-form-item
                :label-col="formItemLayout.labelCol"
                :wrapper-col="formItemLayout.wrapperCol"
                label="题库状态">
                <a-switch
                    checkedChildren="开"
                    unCheckedChildren="关"
                    v-decorator="[
                      'stateNum',
                      {
                        rules: [{ required: true, message: '请选择题库状态' }],
                        valuePropName: !queItem ? 'checked' : queItem.stateNum === 0 ? 'checked' : 'checked:false',
                        initialValue: !queItem ? 'checked' : queItem.stateNum === 0 ? 'checked' : 'checked:false'
                      },
                    ]">
                </a-switch>
            </a-form-item>
            <a-form-item
                :label-col="formItemLayout.labelCol"
                :wrapper-col="formItemLayout.wrapperCol"
                label="题库备注">
                <a-textarea
                    :rows="4"
                    v-decorator="[
                        'note',
                        {initialValue: queItem.note}
                    ]"
                    placeholder="请输入题库备注">
                </a-textarea>
            </a-form-item>
        </a-form>
    </a-modal>
</template>

<script>
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
                /*表单*/
                checkNick: false,
                form: this.$form.createForm(this),
                formItemLayout: {
                    labelCol: { span: 4 },
                    wrapperCol: { span: 20 },
                },
                /*图片上传*/
                uploadLoading: false,
                imageUrl: '',
                previewVisible: false,
                previewImage: '',
                fileList: []
            }
        },
        mounted(){
            if(this.alertType === 'editor'){
                this.fileList = [
                    {
                        uid: '-1',
                        name: 'xxx.png',
                        status: 'done',
                        url: this.queItem.imgUrl
                    }
                ]
            }
        },
        methods:{
            handleOk(e) {
                this.confirmLoading = true;
                this.form.validateFields((err, values) => {
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
                  }
                );
            },
            handleCancel(e) {
                this.$emit('emitVisible',false);
            },
            beforeUpload (file) {
              console.log(file)
            },
            previewCancel () {
                this.previewVisible = false
            },
            handlePreview (file) {
                this.previewImage = file.url || file.thumbUrl;
                this.previewVisible = true
            },
            handleChange ({ fileList }) {
                this.fileList = fileList
            }
        }
    }
</script>

<style scoped>

</style>