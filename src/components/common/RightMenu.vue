<!--顶部 不做导航栏 就一横  留下名称、退出登录、改密码按钮 -->
<template>
  <div class="right">
    <!--  顶部区域-->
    <div class="header">
      <div class="my">
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            <i class="iconfont icon-touxiang"></i>
            {{ name }} <i class="iconfont icon-xiala" />
          </span>
          <template v-slot:dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="a">修改密码</el-dropdown-item>
              <el-dropdown-item command="b">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
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
    handleCommand(command) {
      if (command === "a") {
        this.$message("修改密码");
      } else this.goout();
    },
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
  width: 100%;
  background: #ffffff;
  box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.05),
    0px 1px 2px 0px rgba(0, 0, 0, 0.05);
}
.my {
  position: absolute;
  right: 13px;
  top: 20px;
  cursor: pointer;
  color: #409eff;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
</style>
