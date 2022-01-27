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
      <h3 class="login_title">BD管理系统</h3>
      <el-form-item prop="phone">
        <el-input
          v-model.number="loginForm.phone"
          autocomplete="off"
          placeholder="账号"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          v-model="loginForm.password"
          autocomplete="off"
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
import { login } from "@/assets/js/login";
export default {
  name: "Login",
  data() {
    return {
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
