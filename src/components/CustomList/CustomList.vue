<template>
  <div class="Custom">
    <!--    搜索与添加区域-->
    <div class="search">
      <MyDropdown style="width: 120px" @chooseCity="chooseCity" />
      <my-custom-status-dropdown
        style="width: 120px"
        @chooseStatus="chooseStatus"
        class="el-button-status"
      ></my-custom-status-dropdown>
      <el-input
        class="inputType"
        v-model="input"
        placeholder="请输入查询的公司名称、对接BD姓名、手机号"
        @change="searchInput"
      ></el-input>
      <el-button @click="searchInput" type="primary">查询</el-button>
    </div>
    <!--    表格区域-->
    <div class="wrapper">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="company_name" label="公司名称" min-width="10%">
        </el-table-column>
        <el-table-column prop="address" label="公司地址" min-width="40%">
        </el-table-column>
        <el-table-column prop="status" label="合作状态" min-width="10%">
        </el-table-column>
        <el-table-column prop="name" label="对接BD" min-width="10%">
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
  </div>
</template>

<script>
import api from "@/api/api";
import MyPagination from "@/components/common/MyPagination";
import MyDropdown from "@/components/common/MyCityCodeDropdown";
import myCustomStatusDropdown from "@/components/CustomList/MyCustomStatusDropdown";
export default {
  name: "CustomList",
  components: {
    MyPagination,
    MyDropdown,
    myCustomStatusDropdown,
  },
  data() {
    return {
      input: "",
      tableData: [],
      count: 0,
      city_code: null,
      companyStatus: "",
    };
  },
  methods: {
    /**
     * 查看客户详情
     * @param index
     * @param row
     */
    handleClickDetail(index, row) {
      console.log("查看按钮", index, row);
    },
    /**
     * 封装客户列表的获取
     * @param page
     * @param input
     * @param citycode
     */
    http(page, input, citycode, companystatus) {
      api
        .getCustomList({
          page: page,
          size: "10",
          input: input,
          citycode: citycode,
          status: companystatus,
        })
        .then((res) => {
          this.tableData = res.data.msg.data;
          this.count = res.data.msg.count;
        });
    },
    /**
     * 修改页码时进行分页查找 带上搜索的数据 输入框输入、城市属性、合作状态
     * @param page
     */
    changePage(page) {
      this.http(page, this.input, this.city_code, this.companyStatus);
    },
    /**
     * 条件修改进行搜索-页面强制为1
     */
    searchInput() {
      this.http(1, this.input, this.city_code, this.companyStatus);
    },
    /**
     * 修改了城市并请求新数据
     * @param city
     */
    chooseCity(city) {
      this.city_code = city.city_code;
      this.searchInput();
    },
    /**
     * 修改了合作状态并请求新数据
     * @param city
     */
    chooseStatus(item) {
      this.companyStatus = item.status;
      this.searchInput();
    },
  },
  //生命周期方法
  created() {
    this.http(1, null, null);
  },
};
</script>

<style xml:lang="less" scoped>
.Custom {
  margin: 20px;
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
}
.el-button-status {
  margin-left: 10px;
}
</style>
