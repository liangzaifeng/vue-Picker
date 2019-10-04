import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import FastClick from 'fastclick'

FastClick.attach(document.body);
new Vue({
  render: h => h(App),
}).$mount('#app')
