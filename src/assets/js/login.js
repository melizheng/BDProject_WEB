import Axios from "axios";
import { ElMessageBox } from "element-plus";
import hex_md5 from "@/assets/js/MD5";
Axios.defaults.baseURL = "/api";
function login() {
  this.$refs.loginFormref.validate((valid) => {
    //检查输入项是否符合规则
    if (valid) {
      Axios.post("/userlogin", {
        phone: this.loginForm.phone,
        password: hex_md5(this.loginForm.password),
        account_type: 1,
      }).then((successResponse) => {
        //如果接口返回的数据data的code为1
        if (successResponse.data.code === 1) {
          //console.log(successResponse.data.msg);
          //存储token，id
          this.$store.commit("setUser", successResponse.data.msg);
          //获取登录前页面的路径并跳转，如果该路径不存在，则跳转到首页
          var path = this.$route.query.redirect;
          this.$router.replace({
            path: path === "/" || path === undefined ? "/index" : path,
          });
        } else {
          //登录接口返回登录失败输出原因
          ElMessageBox.confirm(successResponse.data.msg, "提示", {
            showCancelButton: false,
            type: "warning",
          });
          return Promise.reject("error");
        }
      });
    } else {
      //输入项不符合规则的情况
      return false;
    }
  });
}

export { login };
