import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-plus";
import "element-plus/dist/index.css";
import locale from "element-plus/lib/locale/lang/zh-cn";
import "./assets/css/reset.css";
// import VueAMap from "vue-amap/src/lib";
//钩子函数判断是否拦截 router.beforeEach()，意思是在访问每一个路由前调用
router.beforeEach((to, from, next) => {
  //访问需要查看是否登录的页面时
  if (to.meta.requireAuth) {
    //已登录了则访问该网页
    if (store.state.user.token) {
      next();
    } else {
      //没有登录的情况则跳转到登录界面
      next({
        path: "login",
        query: { redirect: to.fullPath },
      });
    }
  } else {
    //访问不需要查看是否登录的页面时
    if (to.path == "/login") {
      //访问login界面且已登录
      if (store.state.user.token) {
        next({
          path: "/",
        });
      } else {
        //访问login界面且未登录
        next();
      }
    } else {
      next();
    }
  }
});
// VueAMap.initAMapApiLoader({
//   key:'754396d409e657c9dc56d7d2a0a51e7f',
//   plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
//   // 默认高德 sdk 版本为 1.4.4
//   v: '1.4.4'
// })

createApp(App)
  // .use(VueAMap)
  .use(store)
  .use(router)
  .use(ElementUI, { locale })
  .mount("#app");
