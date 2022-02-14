<template>
  <div class="bd">
    <!--    搜索区域-->
    <div class="search">
      <el-input
        v-model="input"
        placeholder="请输入查询的管理员手机号、名称"
        @change="searchInputWithPage"
      ></el-input>
      <el-button onclick="searchInputWithPage" type="primary">查询</el-button>
      <el-button type="primary">添加</el-button>
    </div>
    <!--    表格区域-->
    <div class="wrapper">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="name" label="姓名" min-width="10%">
        </el-table-column>
        <el-table-column prop="phone" label="手机号" min-width="60%">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          min-width="20%"
          align="center"
        >
          <template v-slot="scope">
            <el-switch
              @change="handleClickDetailDisable(scope.$index, scope.row)"
              v-model="scope.row.status"
              active-text="启用"
              inactive-text="禁用"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :active-value="1"
              :inactive-value="0"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="10%">
          <template v-slot="scope">
            <el-button
              @click="handleClickDetailEdit(scope.$index, scope.row)"
              type="text"
              size="small"
              >编辑</el-button
            >
            <el-button
              @click="handleClickDetailDelete(scope.$index, scope.row)"
              type="text"
              size="small"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--分页区域-->
    <MyPagination :currentCount="count" @changePage="changePage" />
  </div>
</template>

<script>
import api from "@/api/api";
import MyPagination from "@/components/common/MyPagination";
export default {
  name: "AdminList",
  components: { MyPagination },
  data() {
    return {
      input: "",
      tableData: [],
      count: 0,
    };
  },
  methods: {
    /**
     * 编辑管理员信息 修改城市属性
     */
    handleClickDetailEdit() {
      console.log("编辑按钮");
    },
    //禁用
    handleClickDetailDisable(index, row) {
      api.updateStatus({ id: row.id, status: row.status }).then((res) => {
        if (res.data.code === 1) {
          this.$message({
            type: "success",
            message: "修改状态成功!",
          });
        }
        this.http(1, null);
      });
    },
    //删除
    handleClickDetailDelete(index, row) {
      this.$confirm("此操作将永久删除该管理员, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //请求删除接口——
          api.deleteAccount({ id: row.id }).then((res) => {
            if (res.data.code === 1) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.http(1, null);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //封装Admin列表的获取
    http(page, input) {
      api.getAdminList({ page: page, size: "10", input: input }).then((res) => {
        console.log(res.data);
        this.tableData = res.data.msg.data;
        this.count = res.data.msg.count;
      });
    },
    //修改页码时进行分页查找
    changePage(page) {
      this.http(page, this.input);
    },
    //输入框搜索-页面强制为1
    searchInputWithPage() {
      this.http(1, this.input);
    },
  },
  created() {
    this.http(1, null);
  },
};
</script>

<style xml:lang="less" scoped>
.bd {
  margin: 20px;
}
.search {
  display: flex;
}
.wrapper {
  margin: 20px 0;
}
</style>
