<template>
  <div>
<!--    title 弹窗标题-->
<!--    dialogVisible true 显示弹窗-->
<!--    v-slot:footer 弹窗底部区域-->
    <el-dialog title="添加BD账号" v-model="dialogVisible" width="50%">
      <span>这是一段信息</span>
      <template v-slot:footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false"
            >确 定</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "AddAccount",
  data() {
    return {
      dialogVisible: false,
    };
  },
};
</script>

<style scoped></style>
