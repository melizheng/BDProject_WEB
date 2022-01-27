<!--顶部 不做导航栏 就一横  留下名称、退出登录、改密码按钮 -->
<template>
  <div class="right">
    <!--  顶部区域-->
    <div class="header">
      <div class="changepassword">改密码按钮</div>
      <el-button type="danger" icon="el-icon-delete" circle></el-button>
    </div>
    <!--  内容区域-->
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  //在div被引用的时候必须是<v-menu></v-menu>  命名很重要不能有问题 否则导致引用失败 无语了
  name: "v-right-menu",
};
</script>
<style xml:lang="less" scoped>
.right {
  /*宽度占满*/
  width: 100%;
}
.header {
  width: 100%;
  height: 50px;
  line-height: 50px;
  color: #ffffff;
  background: #1e78bf;
  /*使得header的子组件在一行*/
  display: flex;
}
</style>
