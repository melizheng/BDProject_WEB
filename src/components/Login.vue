<template>
  <body id="poster">
    <el-form class="login-container" label-position="left" label-width="50px">
      <h3 class="login_title">BD管理系统</h3>
      <el-form-item>
        <el-input
          type="text"
          v-model="loginForm.username"
          autocomplete="on"
          placeholder="账号"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          type="password"
          v-model="loginForm.password"
          autocomplete="on"
          placeholder="密码"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width: 100%" v-on:click="login"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </body>
  >
</template>

<script>
import Axios from "axios";
Axios.defaults.baseURL = "/api";
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      },
      responseResult: [],
    };
  },
  methods: {
    login() {
      Axios.post("/userlogin", {
        phone: this.loginForm.username,
        password: this.loginForm.password,
        account_type: 1,
      }).then((successResponse) => {
        if (successResponse.data.code === 1) {
          console.log(successResponse.data.msg);
          this.$store.commit("setUser", successResponse.data.msg);
          var path = this.$route.query.redirect;
          this.$router.replace({
            path: path === "/" || path === undefined ? "/" : path,
          });
        } else {
          console.log("账号或密码错误");
        }
      });
    },
  },
};
</script>

<style>
@import "../assets/css/demologin.css";
</style>
