import { createStore } from "vuex";

export default createStore({
  state: {
    token: "",
    id: "",
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    setId(state, id) {
      state.id = id;
    },
    LOGOUT(state) {
      state.id = 0;
      state.token = null;
      sessionStorage.clear();
    },
  },
  getters: {
    getId(state) {
      return state.id;
    },
    getToken(state) {
      return state.token;
    },
  },
  actions: {},
  modules: {},
});
