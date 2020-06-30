import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from  'axios/lib/axios'
import './assets/css/global.css'
// 引入样式
import 'vue-easytable/libs/themes-base/index.css'
// 导入 table 和 分页组件
import {VTable,VPagination} from 'vue-easytable'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
// 注册到全局
Vue.component(VTable.name, VTable)
Vue.component(VPagination.name, VPagination)

Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.use(Mint)
Vue.use(ElementUI)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
