<!--顶部 不做导航栏 就一横  留下名称、退出登录、改密码按钮 -->
<template>
  <div class="right">
    <!--  顶部区域-->
    <div class="header">
      <div class="myName">管理员：{{ name }}</div>
      <div class="changepassword">
        <el-button type="text" size="default" style="color: white"
          ><i
            class="iconfont icon-change"
            style="margin: 5px"
          />修改密码</el-button
        >
      </div>
      <div class="goout">
        <el-button
          type="text"
          size="default"
          style="color: white"
          @click="goout"
          ><i
            class="iconfont icon-tuichu"
            style="margin: 5px"
          />退出登录</el-button
        >
      </div>
    </div>
    <!--  内容区域-->
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script>
import store from "@/store";

export default {
  //在div被引用的时候必须是<v-menu></v-menu>  命名很重要不能有问题 否则导致引用失败 无语了
  name: "v-right-menu",
  methods: {
    goout() {
      this.$confirm("确定退出登录?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        store.dispatch("LOGOUT").then(() => {
          location.reload();
        });
      });
    },
  },
  data() {
    return {
      name: "",
    };
  },
  created() {
    this.name = this.$store.getters.getUser.name;
  },
};
</script>
<style xml:lang="less" scoped>
.right {
  /*宽度占满*/
  width: 100%;
}
.header {
  height: 50px;
  line-height: 50px;
  color: #ffffff;
  background: #1e78bf;
  /*使得header的子组件在一行*/
  display: flex;
}
.changepassword {
  position: fixed;
  right: 110px;
}
.goout {
  position: fixed;
  right: 10px;
}
</style>
