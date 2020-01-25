import Vue from 'vue'
import App from './App.vue'
import './../node_modules/bulma/css/bulma.css'
import './registerServiceWorker'
import titleMixin from './titleMixin'

Vue.config.productionTip = false
Vue.mixin(titleMixin);

new Vue({
  render: h => h(App),
}).$mount('#app')
