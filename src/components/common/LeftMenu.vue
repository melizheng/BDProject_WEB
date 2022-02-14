<template>
  <div class="el-menu">
    <h2 class="logo">管理系统</h2>
    <el-menu
      :router="true"
      :default-active="$route.path"
      background-color="#1b3554"
      text-color="#fff"
      active-text-color="#fff"
    >
      <el-menu-item index="/bdlist">
        <i class="el-icon-menu"></i>
        <span>BD列表</span>
      </el-menu-item>
      <el-menu-item index="/customlist">
        <i class="el-icon-menu"></i>
        <span>客户列表</span>
      </el-menu-item>
      <el-menu-item index="/pandingapproval">
        <i class="el-icon-menu"></i>
        <span>合作审批</span>
      </el-menu-item>
      <el-menu-item index="/visitslist">
        <i class="el-icon-menu"></i>
        <span>拜访记录</span>
      </el-menu-item>
      <el-menu-item index="/reportlist">
        <i class="el-icon-menu"></i>
        <span>汇报记录</span>
      </el-menu-item>
      <el-menu-item index="/adminlist">
        <i class="el-icon-menu"></i>
        <span>管理员</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "v-left-menu",
};
</script>

<style xml:lang="less" scoped>
.el-menu {
  width: 200px;
}
.el-menu-item.is-active {
  background: #1e71bf !important;
}
.logo {
  color: #fff;
  margin: 20px;
  size: 20px;
}
</style>
