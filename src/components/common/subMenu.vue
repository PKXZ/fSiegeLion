<template>
    <a-sub-menu :title="111">
        <span slot="title">
            <i class="iconfont" :class="menuInfo.icon"></i>
        </span>
    </a-sub-menu>
    <!--<a-sub-menu :key="index">
        <span slot="title">
            <i class="iconfont" :class="menuInfo.icon"></i>
            <span :class="collapsed ? 'menuSpan0' : 'menuSpan1'">{{menuInfo.name}}</span>
        </span>
        <a-menu-item v-for="(itemChildren,indexs) in menuInfo.children" :key="indexs">{{itemChildren.name}}</a-menu-item>
        &lt;!&ndash;<sub-menu
            v-else
            :key="indexs"
            :menu-info="item">
        </sub-menu>&ndash;&gt;
    </a-sub-menu>-->


   <!--<a-sub-menu :key="index">
       {{menuInfo}}
        <span slot="title">
            <i class="iconfont" :class="menuInfo.icon"></i>
            <span>{{menuInfo.name}}</span>
        </span>
       <div v-for="(item,indexs) in menuInfo.children">
           <a-menu-item
               v-if="!item.children"
               :key="indexs">
               <i class="iconfont" :class="item.icon"></i>
               <span>{{ item.name }}</span>
           </a-menu-item>
           <sub-menu
               v-else
               :key="indexs"
               :menu-info="item">
           </sub-menu>
       </div>
   </a-sub-menu>-->
</template>
<script>
    export default {
        name: 'subMenu',
        data(){
            return{

            }
        },
        props: ['menuInfo','index','collapsed'],
    };
</script>


<style>

</style>