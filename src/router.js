import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'loginView',
      component: () => import('./views/loginView.vue')
    },
    {
      path: '/registerView',
      name: 'registerView',
      component: () => import('./views/registerView.vue')
    },
    {
      path: '/mainView',
      name: 'mainView',
      component: () => import('./views/mainView.vue'),
      children:[
        {
          path: '/mainView/homeView',
          name: 'homeView',
          component: () => import('./views/homeView.vue')
        },{
          path: '/mainView/questionListView',
          name: 'questionListView',
          component: () => import('./views/questionListView.vue')
        },{
          path: '/mainView/examinationListView',
          name: 'examinationListView',
          component: () => import('./views/examinationListView.vue')
        },{
          path: '/mainView/userListView',
          name: 'userListView',
          component: () => import('./views/userListView.vue')
        },{
          path: '/mainView/userRoleView',
          name: 'userRoleView',
          component: () => import('./views/userRoleView.vue')
        },{
          path: '/mainView/noticeListView',
          name: 'noticeListView',
          component: () => import('./views/noticeListView.vue')
        },{
          path: '/mainView/noticeCatagoryView',
          name: 'noticeCatagoryView',
          component: () => import('./views/noticeCatagoryView.vue')
        },{
          path: '/mainView/systemConfigView',
          name: 'systemConfigView',
          component: () => import('./views/systemConfigView.vue')
        },{
          path: '/mainView/systemLogView',
          name: 'systemLogView',
          component: () => import('./views/systemLogView.vue')
        },{
          path: '/mainView/aboutSoftwareView',
          name: 'aboutSoftwareView',
          component: () => import('./views/aboutSoftwareView.vue')
        }
      ]
    }
  ]
})
