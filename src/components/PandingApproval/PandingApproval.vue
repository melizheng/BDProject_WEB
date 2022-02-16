<template>
  <div class="PandingApproval">
    <!--    面包屑导航部分-->
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>合作审批</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--    总内容导航部分-->
    <div class="content">
      <span>客户列表</span>
      <el-divider></el-divider>
      <!--    搜索与添加区域-->
      <div class="search">
        <el-input
          class="inputType"
          v-model="input"
          placeholder="请输入查询的公司名称、BD姓名、手机号"
          @change="searchInput"
        ></el-input>
        <el-button
          @click="searchInput"
          style="color: cornflowerblue; border: 1px solid cornflowerblue"
          >查询</el-button
        >
      </div>
      <!--    表格区域-->
      <div class="wrapper">
        <el-table
          :data="tableData"
          style="width: 100%"
          :header-cell-style="{ background: '#FAFAFA' }"
        >
          <el-table-column prop="name" label="申请人" min-width="20%">
          </el-table-column>
          <el-table-column prop="company_name" label="公司名称" min-width="60%">
          </el-table-column>
          <el-table-column label="操作" min-width="20%" align="center">
            <template v-slot="scope">
              <span v-if="scope.row.status === 1"
                ><i class="iconfont icon-status"  style="color: lightgreen;margin-right: 5px"/>已通过</span
              >
              <span v-else-if="scope.row.status === 2"
                ><i class="iconfont icon-status"  style="color: red;margin-right: 5px"/>已驳回</span
              >
              <span v-else
                ><el-button
                  @click="accessAudit(scope.row)"
                  style="color: yellowgreen; border: 1px solid yellowgreen"
                  >通过</el-button
                >
                <el-button
                  @click="refuseAudit(scope.row)"
                  style="
                    color: mediumvioletred;
                    border: 1px solid mediumvioletred;
                  "
                  >驳回</el-button
                ></span
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!--分页区域-->
      <MyPagination :currentCount="count" @changePage="changePage" />
    </div>
  </div>
</template>

<script>
import api from "@/api/api";
import MyPagination from "@/components/common/MyPagination";
export default {
  name: "PandingApproval",
  components: {
    MyPagination,
  },
  data() {
    return {
      input: "",
      tableData: [],
      count: 0,
      changestatus: 0,
      pageNow: 1,
    };
  },
  methods: {
    accessAudit(row) {
      this.$confirm("确认通过" + row.company_name + "的合作审核?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.changestatus = 1;
        this.changeAudit(row.id, this.changestatus);
      });
    },
    refuseAudit(row) {
      this.$confirm("确认拒绝" + row.company_name + "的合作审核?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.changestatus = 2;
        this.changeAudit(row.id, this.changestatus);
      });
    },
    /**
     * 封装审核操作的语句
     * @param id
     * @param status
     */
    changeAudit(id, status) {
      api
        .updateAudit({
          audit_id: id,
          status: status,
        })
        .then(() => {
          this.$message({
            type: "success",
            message: "审核成功!",
          });
          this.http(this.pageNow);
        });
    },
    /**
     * 封装汇报记录列表的获取
     * @param page
     * @param input
     * @param citycode
     */
    http(page, input) {
      api
        .findAuditList({
          page: page,
          size: "10",
          input: input,
        })
        .then((res) => {
          this.tableData = res.data.msg.data;
          this.count = res.data.msg.count;
        });
    },
    /**
     * 修改页码时进行分页查找 带上搜索的数据 输入框输入、城市属性
     * @param page
     */
    changePage(page) {
      this.pageNow = page;
      this.http(this.pageNow, this.input);
    },
    /**
     * 条件修改进行搜索-页面强制为1
     */
    searchInput() {
      this.http(1, this.input);
    },
  },
  //生命周期方法
  created() {
    this.http(1);
  },
};
</script>

<style xml:lang="less" scoped>
.PandingApproval {
  margin: 20px;
}
.title {
  margin-bottom: 15px;
}
.content {
  padding: 20px;
  background: white;
  border: 1px solid #e7eaed;
  border-radius: 4px;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.04);
}
.search {
  display: flex;
}
.inputType {
  margin-right: 20px;
  margin-left: 10px;
}
.wrapper {
  margin: 20px 0;
  border: 1px solid #eeeeee;
}
</style>
