<template>
  <div class="Admin">
    <!--    面包屑导航部分-->
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>管理员</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--    总内容导航部分-->
    <div class="content">
      <span>管理员</span>
      <el-divider></el-divider>
      <!--    搜索区域-->
      <div class="search">
        <el-input
          class="inputType"
          v-model="input"
          placeholder="请输入查询的管理员手机号、名称"
          @change="searchInput"
        ></el-input>
        <el-button class="myButton" @click="searchInput">查询</el-button>
        <el-button @click="addAccount" class="myButton">添加</el-button>
      </div>
      <!--    表格区域-->
      <div class="wrapper">
        <el-table
          :data="tableData"
          style="width: 100%"
          :header-cell-style="{ background: '#FAFAFA' }"
        >
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
      <MyPagination
        :currentCount="count"
        @changePage="changePage"
        :pageSize="pageSize"
        :currentPage="pageNow"
      />
      <!--弹窗增加管理员用户-->
      <AddAccount ref="AddAccountDialog" />
      <!--弹窗编辑管理员用户-->
      <EditAccount ref="EditAccountDialog" />
    </div>
  </div>
</template>

<script>
import api from "@/api/api";
import MyPagination from "@/components/common/MyPagination";
import AddAccount from "@/components/common/AddAccount";
import EditAccount from "@/components/common/EditAccount";
export default {
  name: "AdminList",
  components: {
    MyPagination,
    AddAccount,
    EditAccount,
  },
  data() {
    return {
      ALLCITY: [],
      input: "",
      tableData: [],
      count: 0,
      pageNow: 1,
      pageSize: 8,
    };
  },
  methods: {
    /**
     * 更新信息
     */
    roload() {
      this.http(this.pageNow, this.input);
    },
    /**
     * 增加管理员账号
     */
    addAccount() {
      //修改子组件实例的dialogVisible
      this.$refs.AddAccountDialog.dialogVisible = true;
      this.$refs.AddAccountDialog.ruleForm.accountType = 1;
    },
    /**
     * 编辑管理员信息 修改城市属性
     */
    handleClickDetailEdit(index, row) {
      this.$refs.EditAccountDialog.dialogVisible = true;
      this.$refs.EditAccountDialog.ruleForm.id = row.id;
      this.$refs.EditAccountDialog.ruleForm.name = row.name;
      this.$refs.EditAccountDialog.ruleForm.phone = row.phone;
      api.getAccountAllCityCode({ id: row.id }).then((res) => {
        if (res.data.code === 1) {
          var i;
          var city_codes = [];
          for (i = 0; i < res.data.msg.length; i++) {
            city_codes[i] = res.data.msg[i].city_code;
          }
          this.$refs.EditAccountDialog.ruleForm.citySelected = city_codes;
        }
      });
    },
    /**
     * 禁用账号
     * @param index
     * @param row
     */
    handleClickDetailDisable(index, row) {
      api.updateStatus({ id: row.id, status: row.status }).then((res) => {
        if (res.data.code === 1) {
          this.$message({
            type: "success",
            message: "修改状态成功!",
          });
        }
        this.roload();
      });
    },
    /**
     * 删除账号
     * @param index
     * @param row
     */
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
              this.roload();
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
    /**
     * 封装Admin列表的获取
     * @param page
     * @param input
     */
    http(page, input) {
      api
        .getAdminList({ page: page, size: this.pageSize, input: input })
        .then((res) => {
          if (res.data.code === 1) {
            this.tableData = res.data.msg.data;
            this.count = res.data.msg.count;
          }
        });
    },
    /**
     * 修改页码时进行分页查找
     * @param page
     */
    changePage(page) {
      this.pageNow = page;
      this.http(this.pageNow, this.input);
    },
    /**
     * 输入框搜索-页面强制为1
     */
    searchInput() {
      this.pageNow = 1;
      this.http(this.pageNow, this.input);
    },
  },
  created() {
    this.http(1, null);
  },
};
</script>

<style xml:lang="less" scoped>
.Admin {
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
}
.wrapper {
  margin: 20px 0;
  border: 1px solid #eeeeee;
}
</style>
