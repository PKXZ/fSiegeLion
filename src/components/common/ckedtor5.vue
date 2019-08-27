<template>
    <div>
        <!--<ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>-->
        <!-- 工具栏容器 -->
        <div id="toolbar-container"></div>

        <!-- 编辑器容器 -->
        <div id="editor">
            <p>This is the initial editor content.</p>
        </div>
    </div>
</template>

<script>
    //import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
    //import '@ckeditor/ckeditor5-build-classic/build/translations/zh-cn'
    import CKEditor from '@ckeditor/ckeditor5-build-classic/build/ckeditor'
    //文本样式
    /* import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
    import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
    import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline';
    import Strikethrough from '@ckeditor/ckeditor5-basic-styles/src/strikethrough';
    import Code from '@ckeditor/ckeditor5-basic-styles/src/code';
    import Subscript from '@ckeditor/ckeditor5-basic-styles/src/subscript';
    import Superscript from '@ckeditor/ckeditor5-basic-styles/src/superscript';*/
    /*import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
    import EssentialsPlugin from '@ckeditor/ckeditor5-essentials/src/essentials';
    import BoldPlugin from '@ckeditor/ckeditor5-basic-styles/src/bold';
    import ItalicPlugin from '@ckeditor/ckeditor5-basic-styles/src/italic';
    import LinkPlugin from '@ckeditor/ckeditor5-link/src/link';
    import ParagraphPlugin from '@ckeditor/ckeditor5-paragraph/src/paragraph';
    //文本样式
   import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
   import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
   import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline';
   import Strikethrough from '@ckeditor/ckeditor5-basic-styles/src/strikethrough';
   import Code from '@ckeditor/ckeditor5-basic-styles/src/code';
   import Subscript from '@ckeditor/ckeditor5-basic-styles/src/subscript';
   import Superscript from '@ckeditor/ckeditor5-basic-styles/src/superscript';*/
    export default {
        name: "ckedtor5",
        data(){
            return{
                editor:null,//编辑器实例

               /* editor: ClassicEditor,
                editorData: '<p>Content of the editor.</p>',
                editorConfig: {
                    language: 'zh-cn',//语言包
                    /!*toolbar: {
                        items: [
                            'Bold',
                            'Italic',
                            'Underline',//下划线
                            'Strikethrough',//删除线
                            'Code',//代码
                            'Subscript',//下标
                            'Superscript',//上标
                        ]
                    }*!/
                },*/
                /*editorConfig: {
                    language: 'zh-cn',//语言包
                    //plugins: [ Bold,Italic,Underline, Strikethrough, Code ,Subscript,Superscript],
                    toolbar: [
                        'heading',//段落
                        '|',//分隔
                        'bold',//加粗
                        'italic',//倾斜
                        'Underline',//下划线
                        'Strikethrough',//删除线
                        'Code',//代码
                        'Subscript',//下标
                        'Superscript',//上标
                        '|',//分隔
                        'link', //超链接
                        'bulletedList', //项目列表
                        'numberedList', //编号列表
                        'blockQuote',//块引用
                       /!* 'imageStyle:full', //图片通栏显示
                        'imageStyle:side', //图片侧边显示
                        'imageTextAlternative',//更换图片替换文本*!/
                        'imageUpload',//插入图像
                        '|',//分隔
                        'undo', //撤销
                        'redo',//重做
                        'insertTable',
                        'mediaEmbed',
                    ],
                    removePlugins: [], //除去工具栏按钮
                }*/
            }
        },
        mounted() {
            this.initCKEditor();
        },
        methods: {
            initCKEditor() {
                /*CKEditor.create(document.querySelector('#editor'), {
                    ckfinder: {
                        uploadUrl: '/admin/Upload/uploadUrl'
                        //后端处理上传逻辑返回json数据,包括uploaded(选项true/false)和url两个字段
                    }
                }).then(editor => {
                    const toolbarContainer = document.querySelector('#toolbar-container');
                    toolbarContainer.appendChild(editor.ui.view.toolbar.element);
                    this.editor = editor //将编辑器保存起来，用来随时获取编辑器中的内容等，执行一些操作
                }).catch(error => {
                    console.error(error);
                });*/
                CKEditor.create( document.getElementById( 'editor' ) )
                    .then( editor => {
                        // ...
                    } )
                    .catch( error => {
                        console.error( error );
                    } );
            }
        }
    }
</script>

<style scoped>

</style>