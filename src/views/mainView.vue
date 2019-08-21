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
                class="mainMenu"
                @click="clickMenu"
                :openKeys="openKeys"
                @openChange="onOpenChange">
                <template v-for="(item, index) in menu">
                    <a-menu-item :key="item.id" v-if="item.children.length <= 0">
                        <router-link :to="'/mainView/' + item.path">
                            <i class="iconfont" :class="item.icon"></i>
                            <span :class="collapsed ? 'menuSpan0' : 'menuSpan1'">{{item.name}}</span>
                        </router-link>
                    </a-menu-item>
                    <a-sub-menu :key="item.id" v-else>
                        <span slot="title">
                            <i class="iconfont" :class="item.icon"></i>
                            <span :class="collapsed ? 'menuSpan0' : 'menuSpan1'">{{item.name}}</span>
                        </span>
                        <a-menu-item v-for="(itemChildren,indexs) in item.children" :key="itemChildren.id">
                            <router-link :to="'/mainView/' + itemChildren.path">{{itemChildren.name}}</router-link>
                        </a-menu-item>
                    </a-sub-menu>
                </template>
            </a-menu>
        </a-layout-sider>
        <a-layout>
            <a-layout-header class="headers">
                <a-icon
                    class="trigger"
                    :type="collapsed ? 'menu-unfold' : 'menu-fold'"
                    @click="()=> collapsed = !collapsed">
                </a-icon>
                <ul>
                    <li>
                        <i class="iconfont icon-search searchIcon"></i>
                    </li>
                    <li class="messageIcon">
                        <a-badge :dot="true">
                            <i class="iconfont icon-xiaoxi"></i>
                        </a-badge>
                    </li>
                    <li class="userList">
                        <a-dropdown>
                            <a class="ant-dropdown-link" href="#">
                                <span>皮</span>
                                <p>pikXz</p>
                                <a-icon type="down" />
                            </a>
                            <a-menu slot="overlay">
                                <a-menu-item>
                                    <a href="javascript:;">个人信息</a>
                                </a-menu-item>
                                <a-menu-item>
                                    <a href="javascript:;">退出</a>
                                </a-menu-item>
                            </a-menu>
                        </a-dropdown>
                    </li>
                </ul>
            </a-layout-header>
            <a-breadcrumb class="breadCrumbs">
                <a-breadcrumb-item v-for="(item, index) in breadCrumbs" :key="index">{{item.name}}</a-breadcrumb-item>
            </a-breadcrumb>
            <a-layout-content class="contents">
                <router-view/>
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>

<script>
    import subMenu from '../components/common/subMenu'
    export default {
        name: "mainView",
        data(){
            return{
                projectLogo: "icon-shizizuo",
                projectName: "FSiegeLion",
                //菜单
                collapsed: false,
                rootSubmenuKeys: [1,2,3,4,5],
                openKeys: [],
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
                //面包屑
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
                /*@
                    已知只有两层所以不考虑后续的多层节点情况
                    如果选中的是第一层,面包屑只用添加这个
                    如果选中的是第二次,面包屑需要添加出父节点数据
                */
                let breadCrumbs = [];
                let menuIndex = parseInt(item.item.subMenuKey.split('-')[0]);
                if(menuIndex > 0){
                    menuIndex = menuIndex - 1;
                }
                const subIndex = item.item.index;
                if(item.item.level === 1){
                    //选择的是第一层
                    breadCrumbs.push(this.menu[menuIndex]);
                }else {
                    //选中的是第二层 面包屑需要添加出父节点
                    breadCrumbs.push(this.menu[menuIndex]);//父节点
                    breadCrumbs.push(this.menu[menuIndex].children[subIndex]);//当前子节点
                }
                this.breadCrumbs = breadCrumbs;
            },
            onOpenChange (openKeys) {
                const latestOpenKey = openKeys.find(key => this.openKeys.indexOf(key) === -1);
                if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
                    this.openKeys = openKeys
                } else {
                    this.openKeys = latestOpenKey ? [latestOpenKey] : []
                }
            },
        },
        components:{
            subMenu
        }
    }
</script>

<style>

</style>