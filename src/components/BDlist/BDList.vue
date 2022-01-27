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
import Axios from "axios";
Axios.defaults.baseURL = "/api";
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
    const that=this;
    // const form = new FormData();
    const options = {
      method: "GET",
      url: "/getbd",
      params: { input: "", size: "2", page: "1" },
      headers: {
        "Content-Type":
          "multipart/form-data; boundary=---011000010111000001101001",
        token:
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJwaG9uZSI6IjExMjEyMTIxMTExIiwidHlwZSI6MSwiaWF0IjoxNjQ0NjU2NTk0LCJleHAiOjE2NDQ3NDI5OTR9.8TchxMJ3TjzqVOIkNmqL08AVFAMHSNuwWyWx6HKWWLrg_DpDme96LXWjprQnCG-y66D4hBCGya55kMIwySGuCQ",
      },
      // data: form,
    };

    Axios.request(options)
      .then(function (response) {
        console.log(response.data.msg);
        that.tableData=response.data.msg;
      })
      .catch(function (error) {
        console.error(error);
      });
  }
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
