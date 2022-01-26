import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-plus";
import "element-plus/dist/index.css";

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (store.state.user.token) {
      next();
    } else {
      next({
        path: "login",
        query: { redirect: to.fullPath },
      });
    }
  } else {
    next();
  }
});

createApp(App).use(store).use(router).use(ElementUI).mount("#app");
