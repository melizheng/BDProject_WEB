import { createRouter, createWebHashHistory } from "vue-router";
import BDList from "@/components/BDlist/BDList";
import CustomList from "@/components/CustomList/CustomList";

//存放url  requireAuth：true需要通过登录拦截器先查看
//children是继承关系，之后不访问/，只访问index，继承了父layout的两个布局  需要有这两个布局的页面都在该children里声明
const routes = [
  {
    path: "/",
    component: () => import("../views/Layout"),
    // 主界面页面并不需要被访问，访问则重定向到bdlist网页上
    redirect: "/bdlist",
    children: [
      {
        path: "/BDList",
        name: "BDList",
        component: BDList,
        meta: {
          requireAuth: true,
        },
      },
      {
        path: "/customlist",
        name: "CustomList",
        component: CustomList,
        meta: {
          requireAuth: true,
        },
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
