import { createStore } from "vuex";

export default createStore({
  state: {
    user: {
      id:
        window.localStorage.getItem("user") == null
          ? ""
          : JSON.parse(window.localStorage.getItem("user")).id,
      token:
        window.localStorage.getItem("user") == null
          ? ""
          : JSON.parse(window.localStorage.getItem("user")).token,
      name:
        window.localStorage.getItem("user") == null
          ? ""
          : JSON.parse(window.localStorage.getItem("user")).name,
    },
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
      window.localStorage.setItem("user", JSON.stringify(user));
    },
  },
  actions: {
    LOGOUT(state) {
      state.user = null;
      window.localStorage.clear();
    },
  },
  getters: {
    getUser(state) {
      return state.user;
    },
  },
});
