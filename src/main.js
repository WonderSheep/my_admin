import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './assets/css/common.css'
import './router/permission'
import './utils/eventbus'


Vue.config.productionTip = false


// if(localStorage.getItem('token')){
//   store.commit('loginModule/updateToken',JSON.parse(localStorage.getItem('token')).token);
//   store.commit('loginModule/updateUsername',JSON.parse(localStorage.getItem('token')).username);
// }

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
