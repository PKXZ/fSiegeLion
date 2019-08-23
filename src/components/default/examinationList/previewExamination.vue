<template>
    <a-modal
        title="预览试题"
        :visible="visible"
        :confirmLoading="confirmLoading"
        @ok="handleOk"
        @cancel="handleCancel">
        我是表单
    </a-modal>
</template>

<script>
    export default {
        name: "previewExamination",
        props: {
            visible: {
                //弹窗显示或隐藏
                type: Boolean,
                default: false
            },
            alertType: {
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
            }
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
        }
    }
</script>

<style scoped>

</style>