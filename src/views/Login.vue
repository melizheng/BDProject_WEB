<template>
  <body id="poster">
    <el-form
      class="login-container"
      label-position="left"
      label-width="50px"
      :rules="rules"
      :model="loginForm"
      ref="loginFormref"
    >
      <div class="login_title">
        <img :src="logo" style="margin-bottom: 20px" />
        <h3>BD管理系统</h3>
      </div>
      <div class="mima_titile">
        <h4>密码登录</h4>
        <el-divider></el-divider>
      </div>
      <el-form-item prop="phone">
        <el-input
          class="phone"
          v-model.number="loginForm.phone"
          autocomplete="off"
          placeholder="输入账号"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          class="password"
          type="password"
          v-model="loginForm.password"
          autocomplete="off"
          placeholder="输入密码"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="loginbutton" v-on:click="login">登录</el-button>
      </el-form-item>
    </el-form>
  </body>
  >
</template>

<script>
import { login } from "@/assets/js/login";
import logo from "@/assets/logo.png";
export default {
  name: "Login",
  data() {
    return {
      logo: logo,
      loginForm: {
        phone: "",
        password: "",
      },
      responseResult: [],
      rules: {
        phone: [
          { required: true, message: "账号不能为空", trigger: "change" },
          { type: "number", message: "账号输入数字", trigger: "blur" },
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "change" },
          { min: 6, message: "密码长度大于6", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    login,
  },
};
</script>

<style>
@import "../assets/css/demologin.css";
</style>
