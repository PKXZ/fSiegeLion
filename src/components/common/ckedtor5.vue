<template>
    <div>
        <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
    </div>
</template>

<script>
    import '@ckeditor/ckeditor5-build-classic/build/translations/zh-cn'
   /* import ClassicEditor from '@ckeditor/ckeditor5-build-classic/src/';
    import '@ckeditor/ckeditor5-build-classic/build/translations/zh-cn'
    //文本样式
    import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
    import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
    import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline';
    import Strikethrough from '@ckeditor/ckeditor5-basic-styles/src/strikethrough';
    import Code from '@ckeditor/ckeditor5-basic-styles/src/code';
    import Subscript from '@ckeditor/ckeditor5-basic-styles/src/subscript';
    import Superscript from '@ckeditor/ckeditor5-basic-styles/src/superscript';*/
    import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
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
   import Superscript from '@ckeditor/ckeditor5-basic-styles/src/superscript';
    export default {
        name: "ckedtor5",
        data(){
            return{
                editor: ClassicEditor,
                editorData: '<p>Content of the editor.</p>',
                editorConfig: {
                    plugins: [
                        EssentialsPlugin,
                        BoldPlugin,
                        ItalicPlugin,
                        LinkPlugin,
                        ParagraphPlugin,

                    ],
                    toolbar: {
                        items: [
                            'Bold',
                            'Italic',
                            'Underline',//下划线
                            'Strikethrough',//删除线
                            'Code',//代码
                            'Subscript',//下标
                            'Superscript',//上标
                        ]
                    }
                },
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
        },
        methods: {

        }
    }
</script>

<style scoped>

</style>