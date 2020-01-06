import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import Config from '../Config'
Vue.use(Router)
const LOGIN_PAGE_PATH = '/login'
const routers = [
  {
    path: '*',
    redirect: '/login'
  },
  {
    path: '/order',
    name: '订单列表',
    // meta: { keepAlive: true },
    component: (resolve) => require(['@/view/order/order-list.vue'], resolve),
  },
  {
    path: '/details',
    name: '订单详情',
    // meta: { keepAlive: true },
    component: (resolve) => require(['@/view/order/order.vue'], resolve),
  },
  {
    path: '/login',
    name: '登录',
    component: (resolve) => require(['@/view/login/login.vue'], resolve),
  },
  {
    path: '/my',
    name: '我的信息',
    component: (resolve) => require(['@/view/my/my.vue'], resolve),
  },
  {
    path: '/mySet',
    name: '设置我的信息',
    component: (resolve) => require(['@/view/my/set.vue'], resolve),
  },
  {
    path: '/scheduling',
    name: '排班表',
    component: (resolve) => require(['@/view/scheduling/scheduling.vue'], resolve),
  },
  {
    path: '/aptitude',
    name: '选着资质',
    component: (resolve) => require(['@/view/aptitude/aptitude.vue'], resolve),
  },
  {
    path: '/compile',
    name: '编辑信息',
    component: (resolve) => require(['@/view/compile/compile.vue'], resolve),
  },
  {
    path: '/live',
    name: '日常生活能力评定',
    component: (resolve) => require(['@/view/questionary/live.vue'], resolve),
  },
  {
    path: '/mentality',
    name: '简易精神状态量表',
    component: (resolve) => require(['@/view/questionary/mentality.vue'], resolve),
  },
  {
    path: '/tumble',
    name: '跌倒风险评估量表',
    component: (resolve) => require(['@/view/questionary/tumble.vue'], resolve),
  },
  {
    path: '/first_assessment',
    name: '首次评估表',
    component: (resolve) => require(['@/view/questionary/first-assessment.vue'], resolve),
  },
  {
    //健康档案
    path: '/health',
    name: 'health',
    component: (resolve) => require(['@/view/questionary/health.vue'], resolve),
  },
  {
    //护理记录
    path: '/record',
    name: 'record',
    component: (resolve) => require(['@/view/questionary/record.vue'], resolve),
    // component: (resolve) => require(['@/view/questionary/record(old).vue'], resolve),
  },
  {
    //再次预约
    path: '/subscribe',
    name: 'subscribe',
    component: (resolve) => require(['@/view/order/subscribe.vue'], resolve),
  },
  {
    //宣教
    path: '/publicity',
    name: 'publicity',
    component: (resolve) => require(['@/view/order/publicity.vue'], resolve),
  },
	{
		//历史记录
		path: '/history',
		name: '历史记录',
		component: (resolve) => require(['@/view/order/history.vue'], resolve),
	},
]
const router = new Router({
  // mode: 'history', //后端支持可开
  mode:'hash',
  routes: routers
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem(Config.tokenName)
  // console.log(token)
  if (!token && to.path !== LOGIN_PAGE_PATH) {
      next({
        path: LOGIN_PAGE_PATH // 跳转到登录页
      })
  } else if (!token && to.path === LOGIN_PAGE_PATH) {
    // 未登陆且要跳转的页面是登录页
    next() // 跳转
  } else if (token && to.path === LOGIN_PAGE_PATH) {
    // 已登录且要跳转的页面是登录页
    next({
      path: '/order' // 跳转到订单列表页
    })
  } else {
    if (!store.state.user.hasGetInfo) {
      store.dispatch('getUserInfo')
      store.dispatch('findAreaList')
    }
    next() // 跳转
  }
})
export default router
