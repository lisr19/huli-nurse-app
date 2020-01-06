// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './common/less/reset.less'
import 'swiper/dist/css/swiper.css'
import 'lib-flexible/flexible.js'
import 'mint-ui/lib/style.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import store from './store'
import * as socketApi from '../src/lib/socket'
import exit from "./exit";//监听返回
import Toast from './components/toast/toast'
import Mint from 'mint-ui';
// import { DatetimePicker } from 'mint-ui';
import iview from 'iview';
import 'iview/dist/styles/iview.css';
// import 'babel-polyfill'
// import Es6Promise from 'es6-promise'
// require('es6-promise').polyfill()
// import plus from 'vue-html5plus'
// import mui from 'vue-awesome-mui'
// Es6Promise.polyfill()

Vue.use(Mint);
// Vue.component(DatetimePicker.name, DatetimePicker);
// Vue.use(mui)
// Vue.use(plus)
Vue.use(exit)
Vue.use(VueAwesomeSwiper)
Vue.use(Toast);
Vue.use(iview)
Vue.config.productionTip = false
Vue.prototype.socketApi = socketApi



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
// var onPlusReady = function (callback, context = this) {
//   if (window.plus) {
//     callback.call(context)
//   } else {
//     document.addEventListener('plusready', callback.bind(context))
//   }
// }
// Vue.mixin({
//   beforeCreate () {
//     onPlusReady(() => { this.plusReady = true }, this)
//   },
//   methods:{
//     onPlusReady: onPlusReady
//   }
// })
