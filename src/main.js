// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import './plugins/axios'
import './plugins/vue-mq'
import './plugins/vue-bootstrap'
import store from './store'

Vue.config.productionTip = false

// store.dispatch('auth/CHECK')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // components: { App },
  render: h => h(App),
  store,
  template: '<App/>'
})
