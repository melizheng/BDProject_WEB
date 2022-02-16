<template>
  <div class="Visit">
    <!--    面包屑导航部分-->
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>拜访记录</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--    总内容导航部分-->
    <div class="content">
      <span>客户列表</span>
      <el-divider></el-divider>
      <!--    搜索与添加区域-->
      <div class="search">
        <my-date-picker @changeTime="changeTime" />
        <my-visits-status-dropdown
          style="width: 160px"
          @chooseStatus="chooseStatus"
          class="el-button-status"
        ></my-visits-status-dropdown>
        <el-input
          class="inputType"
          v-model="input"
          placeholder="请输入查询拜访的BD姓名、手机号、公司的名称"
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
          <el-table-column prop="user_name" label="拜访BD" min-width="10%">
          </el-table-column>
          <el-table-column prop="company_name" label="拜访对象" min-width="10%">
          </el-table-column>
          <el-table-column prop="remark" label="拜访记录" min-width="60%">
          </el-table-column>
          <el-table-column
            prop="create_time"
            label="拜访时间"
            min-width="11%"
            :formatter="createtimeFormat"
          >
          </el-table-column>
          <el-table-column prop="status" label="打卡状态" min-width="10%">
            <template v-slot="scope">
              <span v-if="scope.row.status === 2"
                ><i class="iconfont icon-status"  style="color: lightgreen;margin-right: 5px"/>正常</span
              >
              <span v-else
                ><i class="iconfont icon-status" style="color: red;margin-right: 5px"/>异常</span
              >
            </template>
          </el-table-column>
          <el-table-column label="操作" min-width="5%">
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
  </div>
</template>

<script>
import api from "@/api/api";
import MyPagination from "@/components/common/MyPagination";
import MyVisitsStatusDropdown from "@/components/VisitsList/MyVisitsStatusDropdown";
import MyDatePicker from "@/components/common/MyDatePicker";
import { formatDate } from "@/assets/js/date";
export default {
  name: "VisitsList",
  components: {
    MyPagination,
    MyVisitsStatusDropdown,
    MyDatePicker,
  },
  data() {
    return {
      input: "",
      tableData: [],
      count: 0,
      visitsStatus: "",
      startTime: null,
      endTime: null,
    };
  },
  methods: {
    createtimeFormat(row) {
      const date = new Date(row.create_time);
      return formatDate(date, "yyyy-MM-dd hh:mm");
    },
    /**
     * 查看拜访记录详情
     * @param index
     * @param row
     */
    handleClickDetail(index, row) {
      console.log("查看按钮", index, row);
    },
    /**
     * 封装拜访记录列表的获取
     * @param page
     * @param input
     * @param citycode
     */
    http(page, input, visitsstatus, starttime, endtime) {
      api
        .getVisitList({
          page: page,
          size: "10",
          input: input,
          status: visitsstatus,
          atime: starttime,
          btime: endtime,
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
      this.http(
        page,
        this.input,
        this.visitsStatus,
        this.startTime,
        this.endTime
      );
    },
    /**
     * 条件修改进行搜索-页面强制为1
     */
    searchInput() {
      this.http(1, this.input, this.visitsStatus, this.startTime, this.endTime);
    },
    /**
     * 修改了合作状态并请求新数据
     * @param item
     */
    chooseStatus(item) {
      this.visitsStatus = item.status;
      this.searchInput();
    },
    /**
     * 修改时间
     * @param value
     */
    changeTime(value) {
      if (null === value) {
        this.startTime = null;
        this.endTime = null;
      } else {
        this.startTime = value[0];
        this.endTime = value[1];
      }
      this.searchInput();
    },
  },
  //生命周期方法
  created() {
    this.http(1);
  },
};
</script>

<style xml:lang="less" scoped>
.Visit {
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
.el-button-status {
  margin-left: 10px;
}
</style>
