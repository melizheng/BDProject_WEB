import Axios from "axios";
import store from "@/store";
import { ElMessageBox } from "element-plus";

const request = Axios.create({
  baseURL: "/api",
  timeout: 300000,
  // 链接超时  当发送时间超过300秒就不再发送了
  // 若网速过慢发送不成功就会报错
  headers: {},
});

// request请求拦截器  增加token
request.interceptors.request.use((config) => {
  // config.headers["token"] = store.state.user.token;
  config.headers["token"] =
    window.localStorage.getItem("user") == null
      ? ""
      : JSON.parse(window.localStorage.getItem("user")).token;
  return config;
});

//响应拦截器
request.interceptors.response.use((response) => {
  const code = response.status;
  if (code == 504) {
    ElMessageBox.confirm("网络请求超时", "提示", {
      showCancelButton: false,
      type: "warning",
    });
  }
  if (code < 200 || code > 300) {
    ElMessageBox.confirm(response.message, "提示", {
      showCancelButton: false,
      type: "warning",
    });
  } else {
    if (response.data.code == 1) {
      //正常情况且返回正常数据时
      return Promise.resolve(response);
    } else {
      if (response.data.code >= 30000 && response.data.code <= 30005) {
        //重定向网页 删除原来的localstage
        ElMessageBox.confirm(response.data.msg, "提示", {
          showCancelButton: false,
          type: "warning",
        }).then(() => {
          store.dispatch("LOGOUT").then(() => {
            location.reload();
          });
        });
      } else {
        ElMessageBox.confirm(response.data.msg, "提示", {
          showCancelButton: false,
          type: "warning",
        });
      }
    }
  }
  return Promise.reject("error");
});

export default request;
