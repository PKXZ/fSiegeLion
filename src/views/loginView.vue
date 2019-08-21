<template>
    <!--登录界面-->
    <div class="mainContent loginContext">
        <img src="../assets/img/login2_5D.png" class="loginImg"/>
        <div class="loginBox">
            <div class="loginName">
                <i class="iconfont" :class="projectLogo"></i>
                <span>{{projectName}}</span>
            </div>
            <p class="loginDescipt">{{projectDescrpt}}</p>
            <a-tabs defaultActiveKey="1" @change="tabsFun" class="loginTabs">
                <a-tab-pane tab="账户密码登录" key="1">
                    <a-form
                        :form="passwordForm"
                        class="login-form passwordForm"
                        @submit="passwordLogin">
                        <a-form-item>
                            <a-input
                                v-decorator="[
                                  'userName',
                                  { rules: [{ required: true, message: '请输入您的账号' }] }
                                ]"
                                placeholder="账号">
                                <a-icon
                                    slot="prefix"
                                    type="user"
                                    style="color: rgba(0,0,0,.25)"/>
                            </a-input>
                        </a-form-item>
                        <a-form-item>
                            <a-input
                                v-decorator="[
                                  'password',
                                  { rules: [{ required: true, message: '请输入您的密码' }] }
                                ]"
                                type="password"
                                placeholder="密码">
                                <a-icon
                                    slot="prefix"
                                    type="lock"
                                    style="color: rgba(0,0,0,.25)"/>
                            </a-input>
                        </a-form-item>
                        <a-form-item>
                            <a-checkbox
                                v-decorator="[
                                  'remember',
                                  {
                                    valuePropName: 'checked',
                                    initialValue: true,
                                  }
                                ]">
                                自动登录
                            </a-checkbox>
                            <a class="login-form-forgot" href="#">忘记密码？</a>
                            <a-button type="primary" html-type="submit" size="large" class="login-form-button">登录</a-button>
                        </a-form-item>
                        <a-form-item>
                            <div class="loginOther">
                            <label>其他登录方式</label>
                            <i class="iconfont icon-qq"></i>
                            <i class="iconfont icon-weixin"></i>
                        </div>
                            <a class="registerLabel" href="#" @click="register">注册账户</a>
                        </a-form-item>
                    </a-form>
                </a-tab-pane>
                <a-tab-pane tab="手机号登录" key="2" forceRender>
                    <a-form
                            :form="phoneForm"
                            class="login-form passwordForm"
                            @submit="phoneLogin">
                        <a-form-item>
                            <a-input
                                    v-decorator="[
                                  'phone',
                                  { rules: [{ required: true, message: '请输入您的手机号' }] }
                                ]"
                                    placeholder="手机号">
                                <a-icon
                                    slot="prefix"
                                    type="user"
                                    style="color: rgba(0,0,0,.25)"/>
                            </a-input>
                        </a-form-item>
                        <a-form-item>
                            <a-row :gutter="24">
                                <a-col :span="16">
                                    <a-input
                                        v-decorator="[
                                          'code',
                                          { rules: [{ required: true, message: '请输入您的验证码' }] }
                                        ]"
                                        placeholder="验证码">
                                        <a-icon
                                            slot="prefix"
                                            type="message"
                                            style="color: rgba(0,0,0,.25)"/>
                                    </a-input>
                                </a-col>
                                <a-col :span="8">
                                    <a-button @click="getCode">获取验证码</a-button>
                                </a-col>
                            </a-row>
                        </a-form-item>
                        <a-form-item>
                            <a-checkbox
                                v-decorator="[
                                  'remembers',
                                  {
                                    valuePropName: 'checked',
                                    initialValue: true,
                                  }
                                ]">
                                自动登录
                            </a-checkbox>
                            <a class="login-form-forgot" href="#">忘记密码？</a>
                            <a-button type="primary" html-type="submit" size="large" class="login-form-button">登录</a-button>
                        </a-form-item>
                        <a-form-item>
                            <div class="loginOther">
                                <label>其他登录方式</label>
                                <i class="iconfont icon-qq"></i>
                                <i class="iconfont icon-weixin"></i>
                            </div>
                            <a class="registerLabel" href="#" @click="register">注册账户</a>
                        </a-form-item>
                    </a-form>
                </a-tab-pane>
            </a-tabs>
        </div>
        <footers></footers>
    </div>
</template>

<script>
    import footers from '@/components/common/footers'
    export default {
        name: "loginView",
        data(){
            return{
                projectLogo: "icon-shizizuo",
                projectName: "FSiegeLion",
                projectDescrpt: 'FSiegeLion是为了前端开发者攻克问题的题库网站',
                passwordForm: this.$form.createForm(this),
                phoneForm: this.$form.createForm(this),
            }
        },
        mounted(){
        },
        methods:{
            tabsFun(key){
                console.log(key)
            },
            passwordLogin(e){
                e.preventDefault();
                console.log(this.passwordForm);
                this.passwordForm.validateFields((err, values) => {
                    if (!err) {
                        console.log('Received values of form: ', values);
                        this.$router.push({name: 'mainView'});
                    }
                });
            },
            phoneLogin(e){
                e.preventDefault();
                this.phoneForm.validateFields((err, values) => {
                    if (!err) {
                        console.log('Received values of form: ', values);
                        this.$router.push({name: 'mainView'});
                    }
                });
            },
            getCode(){
                //获取验证码
                console.log('获取验证码');
            },
            register(){
                //注册账户
                this.$router.push({name: 'registerView'})
            }
        },
        components:{
            footers
        }
    }
</script>

<style>

</style>