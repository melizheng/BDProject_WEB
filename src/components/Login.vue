<template>
  <el-card>
    用户名:<input
      type="text"
      v-model="loginForm.username"
      placeholder="请输入用户名"
    />
    <br /><br />
    密码：
    <input
      type="password"
      v-model="loginForm.password"
      placeholder="请输入密码"
    />
    <br /><br />
    <el-button type="primary">el-button</el-button>
    <br /><br />
    <button v-on:click="login">登录</button>
    </el-card>
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
          this.$store.commit({
            type: "setId",
            id: successResponse.data.msg.id,
          });
          this.$store.commit({
            type: "setToken",
            token: successResponse.data.msg.token.toString(),
          });
          console.log(this.$store.getters.getId);
          console.log(this.$store.getters.getToken);
          this.$router.replace({ path: "/about" });
        } else {
          console.log("账号或密码错误");
        }
      });
    },
  },
};
</script>

<style></style>
