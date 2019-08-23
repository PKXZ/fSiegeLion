<template>
    <!-- bidirectional data binding（双向数据绑定） -->
    <!--<codemirror v-model="code" :options="cmOptions"></codemirror>-->
   <div>
       <codemirror
           ref="myCm"
           :value="code"
           :options="cmOptions"
           @ready="onCmReady"
           @focus="onCmFocus"
           @input="onCmCodeChange">
       </codemirror>
       <select v-for="(item,index) in modes" :key="index">
           <option :value="item.value">{{item.label}}</option>
       </select>
   </div>

</template>

<script>
    // language js
    import 'codemirror/mode/javascript/javascript.js'
    // theme css
    import 'codemirror/theme/base16-dark.css'
    // more codemirror resources
    // import 'codemirror/some-resource...'
    export default {
        data () {
            return {
                code: 'const a = 10',
                cmOptions: {
                    tabSize: 4,//缩进格式
                    mode: 'text/javascript',//默认语法类型
                    theme: 'base16-dark',
                    lineNumbers: true,//显示行号
                    line: true,//显示行号
                    indentWithTabs: true,
                    smartIndent: true,
                    matchBrackets: true,
                    //theme: theme,
                    // autofocus: true,
                    extraKeys: {'Ctrl': 'autocomplete'},//自定义快捷键
                    hintOptions: {//自定义提示选项
                        tables: {
                            users: ['name', 'score', 'birthDate'],
                            countries: ['name', 'population', 'size']
                        }
                    }
                    // more codemirror options, 更多 codemirror 的高级配置...
                },
                modes: [{
                    value: 'css',
                    label: 'CSS'
                }, {
                    value: 'javascript',
                    label: 'Javascript'
                }, {
                    value: 'html',
                    label: 'XML/HTML'
                }, {
                    value: 'x-java',
                    label: 'Java'
                }, {
                    value: 'x-objectivec',
                    label: 'Objective-C'
                }, {
                    value: 'x-python',
                    label: 'Python'
                }, {
                    value: 'x-rsrc',
                    label: 'R'
                }, {
                    value: 'x-sh',
                    label: 'Shell'
                }, {
                    value: 'x-sql',
                    label: 'SQL'
                }, {
                    value: 'x-swift',
                    label: 'Swift'
                }, {
                    value: 'x-vue',
                    label: 'Vue'
                }, {
                    value: 'markdown',
                    label: 'Markdown'
                }]
            }
        },
        methods: {
            onCmReady(cm) {
                console.log('the editor is readied!', cm)
            },
            onCmFocus(cm) {
                console.log('the editor is focus!', cm)
            },
            onCmCodeChange(newCode) {
                console.log('this is new code', newCode)
                this.code = newCode
            }
        },
        computed: {
            codemirror() {
                return this.$refs.myCm.codemirror
            }
        },
        mounted() {
            console.log('this is current codemirror object', this.codemirror)
            // you can use this.codemirror to do something...
        }
    }
</script>