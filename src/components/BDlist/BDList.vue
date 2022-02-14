<template>
  <div class="bd">
    <!--    搜索与添加区域-->
    <div class="search">
      <MyDropdown style="width: 150px" @chooseCity="chooseCity" />
      <el-input
        v-model="input"
        placeholder="请输入查询的BD手机号、名称"
        @change="searchInputWithPageAndCity"
      ></el-input>
      <el-button @click="searchInputWithPageAndCity" type="primary"
        >查询</el-button
      >
      <el-button @click="addAccount" type="primary">添加</el-button>
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
              @click="handleClickDetail(scope.$index, scope.row)"
              type="text"
              size="small"
              >详情</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--分页区域-->
    <MyPagination :currentCount="count" @changePage="changePage" />
    <!--弹窗增加BD用户-->
    <AddAccount ref='AddAccountDialog'/>
  </div>
</template>

<script>
import api from "@/api/api";
import MyPagination from "@/components/common/MyPagination";
import MyDropdown from "@/components/common/MyCityCodeDropdown";
import AddAccount from "@/components/common/AddAccount";
export default {
  name: "BDlist",
  components: {
    MyPagination,
    MyDropdown,
    AddAccount,
  },
  data() {
    return {
      input: "",
      tableData: [],
      count: 0,
      city_code: null,
    };
  },
  methods: {
    /**
     * 增加BD账号
     */
    addAccount(){
      console.log("增加按钮");
      //修改子组件实例的dialogVisible
      this.$refs.AddAccountDialog.dialogVisible=true;
    },
    /**
     * 查看BD详情
     * @param index
     * @param row
     */
    handleClickDetail(index, row) {
      console.log("查看按钮", index, row);
    },
    /**
     * 封装BD列表的获取
     * @param page
     * @param input
     * @param citycode
     */
    http(page, input, citycode) {
      api
        .getBdList({ page: page, size: "10", input: input, citycode: citycode })
        .then((res) => {
          console.log(res.data);
          this.tableData = res.data.msg.data;
          this.count = res.data.msg.count;
        });
    },
    /**
     * 修改页码时进行分页查找 带上搜索的数据 输入框输入、城市属性
     * @param page
     */
    changePage(page) {
      this.http(page, this.input, this.city_code);
    },
    /**
     * 条件修改进行搜索-页面强制为1
     */
    searchInputWithPageAndCity() {
      this.http(1, this.input, this.city_code);
    },
    /**
     * 禁用账号操作
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
        this.http(1, null);
      });
    },
    /**
     * 修改了城市并请求新数据
     * @param city
     */
    chooseCity(city) {
      this.city_code = city.city_code;
      this.searchInputWithPageAndCity();
    },
  },
  //生命周期方法
  created() {
    this.http(1, null, null);
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
