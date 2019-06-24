import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    anchor: sessionStorage.getItem('anchor')
  },
  getters: {
    anchor: state => {
      return state.anchor
    }
  },
  mutations: {
    SET_ANCHOR: (state, anchor) => {
      state.anchor = anchor
      sessionStorage.setItem('anchor', anchor)
    }
  },
  actions: {
    setAnchor({ commit }, anchor) {
      commit('SET_ANCHOR', anchor)
    }
  }
})
