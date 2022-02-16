<template>
  <div class="custom-message">
    <!--    面包屑导航部分-->
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/customlist' }"
          >客户列表</el-breadcrumb-item
        >
        <el-breadcrumb-item>客户详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--    基础信息 包含编辑对接BD按钮-->
    <!--    拜访地址列表 修改等操作-->
    <!--    拜访记录列表部分-->
  </div>
</template>

<script>
export default {
  name: "CustomMessage",
};
</script>

<style scoped>
.custom-message {
  margin: 10px;
}
.title {
  padding: 10px;
  background: white;
  border: 1px solid #eeeeee;
}
</style>
