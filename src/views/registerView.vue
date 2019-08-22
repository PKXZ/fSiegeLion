<template>
    <div class="mainContent">
        <div class="loginBox">
            <div class="loginName">
                <i class="iconfont" :class="projectLogo"></i>
                <span>{{projectName}}</span>
            </div>
            <p class="loginDescipt">{{projectDescrpt}}</p>
            <div class="loginTabs">
                <a-form
                    :form="passwordForm"
                    class="login-form passwordForm registerForm"
                    @submit="passwordLogin">
                    <a-form-item
                        v-bind="formItemLayout"
                        label="邮箱">
                        <a-input
                                v-decorator="[
                              'email',
                              {
                                rules: [{
                                  type: 'email', message: '请输入正确邮箱地址',
                                }, {
                                  required: true, message: '请输入邮箱地址!',
                                }]
                              }
                            ]"
                        />
                    </a-form-item>
                    <a-form-item
                        v-bind="formItemLayout"
                        label="密码">
                        <a-input
                            v-decorator="[
                              'password',
                              {
                                rules: [{
                                  required: true, message: '请输入密码',
                                }, {
                                  validator: validateToNextPassword,
                                }],
                              }
                            ]"
                            type="password"/>
                    </a-form-item>
                    <a-form-item
                        v-bind="formItemLayout"
                        label="确认密码">
                        <a-input
                            v-decorator="[
                              'confirm',
                              {
                                rules: [{
                                  required: true, message: '请确认密码',
                                }, {
                                  validator: compareToFirstPassword,
                                }],
                              }
                            ]"
                            type="password"
                            @blur="handleConfirmBlur"/>
                    </a-form-item>
                    <a-form-item
                        v-bind="formItemLayout"
                        label="手机号码">
                        <a-input
                            v-decorator="[
                              'phone',
                              {
                                rules: [{ required: true, message: '请输入手机号码' }],
                              }
                            ]"
                            style="width: 100%">
                            <a-select
                                slot="addonBefore"
                                v-decorator="[
                                    'prefix',
                                    { initialValue: '86' }
                                  ]"
                                style="width: 70px">
                                <a-select-option value="86">
                                    +86
                                </a-select-option>
                                <a-select-option value="87">
                                    +87
                                </a-select-option>
                            </a-select>
                        </a-input>
                    </a-form-item>
                    <a-form-item
                            v-bind="formItemLayout"
                            label="验证码">
                        <a-row :gutter="24">
                            <a-col :span="15">
                                <a-input
                                    v-decorator="[
                                      'captcha',
                                      {rules: [{ required: true, message: '请输入验证码' }]}
                                    ]"/>
                            </a-col>
                            <a-col :span="8">
                                <a-button>获取验证码</a-button>
                            </a-col>
                        </a-row>
                    </a-form-item>
                    <a-form-item v-bind="tailFormItemLayout">
                        <a-checkbox v-decorator="['agreement', {valuePropName: 'checked'}]">
                            我已经阅读了 <a href="">
                            协议
                        </a>
                        </a-checkbox>
                    </a-form-item>
                    <a-form-item>
                       <a-row class="registerRow" :gutter="24">
                           <a-col :span="14">
                               <a-button
                                   block
                                   type="primary"
                                   size="large"
                                   html-type="submit">
                                   注册
                               </a-button>
                           </a-col>
                           <a-col :span="10">
                               <a href="#" @click="loginView">使用已有账户登录</a>
                           </a-col>
                       </a-row>
                    </a-form-item>
                </a-form>
            </div>
        </div>
        <footers></footers>
    </div>
</template>

<script>
    import footers from '@/components/common/footers'
    export default {
        name: "registerView",
        data(){
            return{
                formItemLayout: {
                    labelCol: {
                        xs: { span: 24 },
                        sm: { span: 5 },
                    },
                    wrapperCol: {
                        xs: { span: 24 },
                        sm: { span: 19 },
                    },
                },
                tailFormItemLayout: {
                    wrapperCol: {
                        xs: {
                            span: 24,
                            offset: 0,
                        },
                        sm: {
                            span: 16,
                            offset: 8,
                        },
                    },
                },
                projectLogo: "icon-shizizuo",
                projectName: "FSiegeLion",
                projectDescrpt: 'FSiegeLion是为了前端开发者攻克问题的题库网站',
                passwordForm: this.$form.createForm(this),
            }
        },
        methods:{
            handleConfirmBlur  (e) {
                const value = e.target.value;
                this.confirmDirty = this.confirmDirty || !!value;
            },
            validateToNextPassword  (rule, value, callback) {
                const form = this.form;
                if (value && this.confirmDirty) {
                    form.validateFields(['confirm'], { force: true });
                }
                callback();
            },
            compareToFirstPassword  (rule, value, callback) {
                const form = this.form;
                if (value && value !== form.getFieldValue('password')) {
                    callback('Two passwords that you enter is inconsistent!');
                } else {
                    callback();
                }
            },
            passwordLogin(e){
                e.preventDefault();
                console.log(this.passwordForm);
                this.passwordForm.validateFields((err, values) => {
                    if (!err) {
                        console.log('Received values of form: ', values);
                    }
                });
            },
            loginView(){
                console.log('表单值');
                console.log(this.passwordForm.getFieldsValue());
                this.$router.push({name: 'loginView'});
            }
        },
        components:{
            footers
        }
    }
</script>

<style scoped>

</style>