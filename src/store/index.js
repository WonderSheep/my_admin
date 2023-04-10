import Vue from 'vue'
import Vuex from 'vuex'
import loginModule from './modules/loginModule'
import productModule from './modules/productModule'
import pubHeadModule from './modules/pubHeadModule'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    loginModule,
    productModule,
    pubHeadModule,
  }
})
