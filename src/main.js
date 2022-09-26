// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

//导入ElementUI模块
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//导入Echarts
import  * as echarts from 'echarts'

//导入路由模块和路由配置表
import Router from 'vue-router'
import router from './router'

//使用ElementUI
Vue.use(ElementUI);
//使用路由模块
Vue.use(Router)
Vue.config.productionTip = false

//使用Echarts
Vue.prototype.$echarts = echarts

/* eslint-disable no-new */
new Vue({
  el: '#app',
  //配置路由项
  router,
  components: { App },
  template: '<App/>'
})
