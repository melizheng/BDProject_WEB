<template>
  <div class="Report">
    <!--    面包屑导航部分-->
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>汇报记录</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--    总内容部分-->
    <div class="content">
      <span>汇报记录</span>
      <el-divider></el-divider>
      <!--    搜索与添加区域-->
      <div class="search">
        <my-date-picker @changeTime="changeTime" />
        <el-input
          class="inputType"
          v-model="input"
          placeholder="请输入查询汇报的BD姓名、手机号"
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
          <el-table-column prop="reporter_name" label="汇报BD" min-width="10%">
          </el-table-column>
          <el-table-column prop="rule_name" label="汇报规则" min-width="10%">
          </el-table-column>
          <el-table-column prop="work_summary" label="汇报内容" min-width="40%">
          </el-table-column>
          <el-table-column prop="visit_total" label="打卡总数" min-width="10%">
          </el-table-column>
          <el-table-column
            prop="submittime"
            label="提交时间"
            min-width="11%"
            :formatter="submittimeFormat"
          >
          </el-table-column>
          <el-table-column
            prop="deadline"
            label="截止时间"
            min-width="11%"
            :formatter="deadtimeFormat"
          >
          </el-table-column>
          <el-table-column prop="status" min-width="2%">
            <template v-slot="scope">
              <span
                v-if="statusFormat(scope.row) === '未提交'"
                style="color: darkorange"
                ><i class="iconfont icon-status"
              /></span>
              <span
                v-else-if="statusFormat(scope.row) === '提交未读'"
                style="color: lightgreen"
                ><i class="iconfont icon-status"
              /></span>
              <span
                v-else-if="statusFormat(scope.row) === '提交已读'"
                style="color: skyblue"
                ><i class="iconfont icon-status"
              /></span>
              <span
                v-else-if="statusFormat(scope.row) === '未开始'"
                style="color: #cdcdcd"
                ><i class="iconfont icon-status"
              /></span>
              <span v-else style="color: red"
                ><i class="iconfont icon-status"
              /></span>
            </template>
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态"
            min-width="10% "
            :formatter="statusFormat"
          >
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
  </div>
</template>

<script>
import api from "@/api/api";
import MyPagination from "@/components/common/MyPagination";
import MyDatePicker from "@/components/common/MyDatePicker";
import { formatDate } from "@/assets/js/date";
export default {
  name: "ReportList",
  components: {
    MyPagination,
    MyDatePicker,
  },
  data() {
    return {
      input: "",
      tableData: [],
      count: 0,
      startTime: null,
      endTime: null,
    };
  },
  methods: {
    statusFormat(row) {
      if (row.status === 1) return "提交未读";
      if (row.status === 2) return "提交已读";
      if (row.status === 0) {
        const date = new Date();
        const submittime = new Date(row.submittime);
        const deadline = new Date(row.deadline);
        if (date < submittime) {
          return "未开始";
        } else if (date > deadline) {
          return "已逾期";
        } else return "未提交";
      }
    },
    submittimeFormat(row) {
      const date = new Date(row.submittime);
      return formatDate(date, "yyyy-MM-dd hh:mm");
    },
    deadtimeFormat(row) {
      const date = new Date(row.deadline);
      return formatDate(date, "yyyy-MM-dd hh:mm");
    },
    /**
     * 查看汇报记录详情
     * @param index
     * @param row
     */
    handleClickDetail(index, row) {
      console.log("查看按钮", index, row);
    },
    /**
     * 封装汇报记录列表的获取
     * @param page
     * @param input
     * @param citycode
     */
    http(page, input, starttime, endtime) {
      api
        .getReportRecordList({
          page: page,
          size: "10",
          input: input,
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
      this.http(page, this.input, this.startTime, this.endTime);
    },
    /**
     * 条件修改进行搜索-页面强制为1
     */
    searchInput() {
      this.http(1, this.input, this.startTime, this.endTime);
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
.Report {
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
