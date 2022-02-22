import { createRouter, createWebHashHistory } from "vue-router";
import BDList from "@/components/BDlist/BDList";
import CustomList from "@/components/CustomList/CustomList";
import VisitsList from "@/components/VisitsList/VisitsList";
import ReportList from "@/components/ReportList/ReportList";
import AdminList from "@/components/AdminList/AdminList";
import PandingApproval from "@/components/PandingApproval/PandingApproval";

//存放url  requireAuth：true需要通过登录拦截器先查看
//children是继承关系，之后不访问/，只访问index，继承了父layout的两个布局  需要有这两个布局的页面都在该children里声明
const routes = [
  {
    path: "/",
    component: () => import("../views/Layout"),
    // /为布局并不需要被访问，访问则重定向到bdlist网页上
    redirect: "/bdlist",
    children: [
      {
        path: "/bdList",
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
      {
        path: "/pandingapproval",
        name: "PandingApproval",
        component: PandingApproval,
        meta: {
          requireAuth: true,
        },
      },
      {
        path: "/visitslist",
        name: "VisitsList",
        component: VisitsList,
        meta: {
          requireAuth: true,
        },
      },
      {
        path: "/reportlist",
        name: "ReportList",
        component: ReportList,
        meta: {
          requireAuth: true,
        },
      },
      {
        path: "/adminlist",
        name: "AdminList",
        component: AdminList,
        meta: {
          requireAuth: true,
        },
      },
      {
        path: "/bdmessage",
        name: "BDMessage",
        component: () => import("../components/BDlist/BDMessage/BDMessage"),
        meta: {
          requireAuth: true,
        },
      },
      {
        path: "/custommessage",
        name: "CustomMessage",
        component: () =>
          import("../components/CustomList/CustomMessage/CustomMessage"),
        meta: {
          requireAuth: true,
        },
      },
      {
        path: "/reportmessage",
        name: "ReportMessage",
        component: () => import("../components/ReportList/ReportMessage"),
        meta: {
          requireAuth: true,
        },
      },
    ],
  },
  {
    path: "/testmymap",
    name: "Mymap",
    component: () => import("../components/common/Mymap"),
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
