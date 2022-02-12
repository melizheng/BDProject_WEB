<template>
  <div class="bd">
    <!--    搜索区域-->
    <div class="search">
      <el-input v-model="input" placeholder="请输入内容"></el-input>
      <el-button type="primary">查询</el-button>
      <el-button type="primary">添加</el-button>
    </div>
    <!--    表格区域-->
    <div class="wrapper">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="phone" label="手机号" width="1000">
        </el-table-column>
        <el-table-column prop="status" label="状态" width="100">
        </el-table-column>
        <el-table-column prop="id" label="操作">
          <template v-slot="scope">
            <el-button
              @click="handleClickDetail(scope.$index, scope.row)"
              type="text"
              size="small"
              >查看</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--    分页区域-->
    <div class="getpage"></div>
  </div>
</template>

<script>
import api from "@/api/api";
export default {
  name: "BDlist",
  data() {
    return {
      input: "",
      tableData: [],
    };
  },
  methods: {
    //查看详情操作
    handleClickDetail() {
      console.log("查看按钮");
    },
  },
  created() {
    api.getBdList({ page: "1", size: "10" }).then((res) => {
      this.tableData = res.data.msg;
    });
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
