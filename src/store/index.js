import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    token: null
  },
  getters: {
    token: state => {
      return state.token
    }
  },
  mutations: {
    increment (state,token) {
      state.token=token
    }
  },
  actions: {
    logion (context) {
       let token="admin"
      context.commit('increment',token)
      localStorage.setItem("token",token)
    }
  }
})

export default store