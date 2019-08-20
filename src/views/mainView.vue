<template>
    <a-layout class="mainContent">
        <a-layout-sider
            :trigger="null"
            collapsible
            v-model="collapsed">
            <div class="logo">
                <i class="iconfont" :class="projectLogo"></i>
                <span v-if="!collapsed">{{projectName}}</span>
            </div>
            <a-menu
                :defaultSelectedKeys="['1']"
                :defaultOpenKeys="['sub1']"
                mode="inline"
                theme="dark"
                :inlineCollapsed="collapsed"
                @click="clickMenu"
                class="mainMenu"
                v-for="(item, index) in menu" :key="index">
                <a-menu-item :key="index" v-if="item.children.length <= 0">
                    <i class="iconfont" :class="item.icon"></i>
                    <span :class="collapsed ? 'menuSpan0' : 'menuSpan1'">{{item.name}}</span>
                </a-menu-item>
                <a-sub-menu :key="index" v-if="item.children.length > 0">
                    <span slot="title">
                        <i class="iconfont" :class="item.icon"></i>
                        <span :class="collapsed ? 'menuSpan0' : 'menuSpan1'">{{item.name}}</span>
                    </span>
                    <a-menu-item v-for="(itemChildren,indexs) in item.children" :key="indexs">{{itemChildren.name}}</a-menu-item>
                </a-sub-menu>
            </a-menu>
        </a-layout-sider>
        <a-layout>
            <a-layout-header class="headers">
                <a-icon
                    class="trigger"
                    :type="collapsed ? 'menu-unfold' : 'menu-fold'"
                    @click="()=> collapsed = !collapsed"/>
            </a-layout-header>
            <a-breadcrumb class="breadCrumbs">
                <a-breadcrumb-item v-for="(item, index) in breadCrumbs">{{item.name}}</a-breadcrumb-item>
            </a-breadcrumb>
            <a-layout-content class="contents">
                Content
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>

<script>
    export default {
        name: "mainView",
        data(){
            return{
                projectLogo: "icon-shizizuo",
                projectName: "FSiegeLion",
                collapsed: false,
                menu: [
                    {
                        id: 1,
                        name: '主页',
                        path: 'homeView',
                        icon: 'icon-zhihuitiku',
                        children: []
                    },{
                        id: 2,
                        name: '题库管理',
                        path: '',
                        icon: 'icon-tiku',
                        children: [
                            {
                                id: 21,
                                name: '题库列表',
                                path: 'questionListView',
                                icon: '',
                                chidren: []
                            },{
                                id: 22,
                                name: '试题列表',
                                path: 'examinationListView',
                                icon: '',
                                chidren: []
                            }
                        ]
                    },{
                        id: 3,
                        name: '用户管理',
                        path: '',
                        icon: 'icon-yonhu',
                        children: [
                            {
                                id: 31,
                                name: '用户列表',
                                path: 'userListView',
                                icon: '',
                                chidren: []
                            },{
                                id: 32,
                                name: '用户角色',
                                path: 'userRoleView',
                                icon: '',
                                chidren: []
                            }
                        ]
                    },{
                        id: 4,
                        name: '互动交流',
                        path: '',
                        icon: 'icon-gonggao',
                        children: [
                            {
                                id: 41,
                                name: '公告列表',
                                path: 'noticeListView',
                                icon: '',
                                chidren: []
                            },{
                                id: 42,
                                name: '公告分类',
                                path: 'noticeCatagoryView',
                                icon: '',
                                chidren: []
                            }
                        ]
                    },{
                        id: 5,
                        name: '系统设置',
                        path: '',
                        icon: 'icon-xitongshezhi',
                        children: [
                            {
                                id: 51,
                                name: '系统配置',
                                path: 'systemConfigView',
                                icon: '',
                                chidren: []
                            },{
                                id: 52,
                                name: '系统日志',
                                path: 'systemLogView',
                                icon: '',
                                chidren: []
                            },{
                                id: 53,
                                name: '关于软件',
                                path: 'aboutSoftwareView',
                                icon: '',
                                chidren: []
                            }
                        ]
                    },
                ],
                breadCrumbs: []
            }
        },
        watch:{
            breadCrumbs:{
                handler(newVal, oldVal){
                    this.breadCrumbs = newVal;
                },
                deep: true
            }
        },
        methods:{
            clickMenu(item){
                debugger
                let breadCrumbs = [];
                for(let i = 0; i < item.keyPath.length; i++){
                    breadCrumbs = this.menu[item.keyPath[i]];
                }
                this.breadCrumbs = breadCrumbs;
            }
        }
    }
</script>

<style>

</style>