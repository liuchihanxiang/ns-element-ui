import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import NS from './../packages/index'
Vue.use(ElementUi, {
  size: 'medium'
})
Vue.config.productionTip = false
Vue.use(NS, {
  isInternational: false
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
