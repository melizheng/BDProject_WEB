<template>
  <div class="el-menu">
    <el-menu
      :router="true"
      :default-active="$route.path"
      background-color="#1b3554"
      text-color="#fff"
      active-text-color="#409EFF"
    >
      <el-menu-item index="bdlist">
        <i class="el-icon-menu"></i>
        <span>BD列表</span>
      </el-menu-item>
      <el-menu-item index="customlist">
        <i class="el-icon-menu"></i>
        <span>客户列表</span>
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
</style>
