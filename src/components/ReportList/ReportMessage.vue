<template>
  <div class="ReportMessage">
    <!--    面包屑导航部分-->
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/reportlist' }"
          >汇报记录</el-breadcrumb-item
        >
        <el-breadcrumb-item>汇报详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </div>
  <div class="content">
    <!--    基础信息-->
    <div class="basic-information">
      <div class="basic-information-head">
        <div class="basic-information-head-name">记录上报</div>
      </div>
      <el-divider></el-divider>
      <div class="line">
        <div class="dataBD">
          <div class="column">BD名称：</div>
          <div class="value">{{ ReportMessage.reporter_name }}</div>
        </div>
        <div class="data">
          <div class="column">汇报对象：</div>
          <div class="value">{{ ReportMessage.director_name }}</div>
        </div>
      </div>
      <div class="line">
        <div class="data">
          <div class="column">汇报频率：</div>
          <div class="value">
            <span v-if="ReportMessage.report_rate == 'W'">每周</span>
            <span v-else-if="ReportMessage.report_rate == 'D'">每天</span>
            <span v-else-if="ReportMessage.report_rate == 'M'">每月</span>
            <span v-else>每年</span>
          </div>
        </div>
        <div class="data">
          <div class="column">汇报周期 ：</div>
          <div class="value">
            {{ timeFormat1(ReportMessage.start_time) }}至{{
              timeFormat1(ReportMessage.end_time)
            }}
          </div>
        </div>
        <div class="data">
          <div class="column">截止时间：</div>
          <div class="value">{{ timeFormat(ReportMessage.deadline) }}</div>
        </div>
      </div>
      <div class="line">
        <div class="column">图片：</div>
        <span v-if="ReportMessage.img_url === null">-</span>
        <span v-else-if="ReportMessage.img_url === ''">-</span>
        <span v-else-if="picture.length === 0">-</span>
        <span v-else>
          <div class="images" v-viewer>
            <img
              loading="lazy"
              v-for="item in picture"
              :src="item"
              :key="item"
              style="
                width: 50px;
                height: 50px;
                margin-right: 5px;
                margin-bottom: 5px;
              "
            />
          </div>
        </span>
      </div>
      <div class="line">
        <div class="column">工作总结：</div>
        <div class="value">{{ ReportMessage.work_summary }}</div>
      </div>
      <div class="line">
        <div class="column">遇到的问题：</div>
        <div class="value">{{ ReportMessage.problem }}</div>
      </div>
    </div>
    <!--    表格-->
    <div class="visit-information">
      <div class="basic-information-head">
        <div class="basic-information-head-name">打卡记录</div>
      </div>
      <el-divider></el-divider>
      <div class="wrapper">
        <el-table
          :data="tableData"
          style="width: 100%"
          :header-cell-style="{ background: '#FAFAFA' }"
        >
          <el-table-column prop="company_name" label="拜访对象" min-width="10%">
          </el-table-column>
          <el-table-column
            prop="address"
            label="拜访地址"
            min-width="25%"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="create_time"
            label="拜访时间"
            min-width="15%"
            :formatter="createtimeFormat"
          >
          </el-table-column>
          <el-table-column prop="status" label="打卡状态" min-width="10%">
            <template v-slot="scope">
              <span v-if="scope.row.status === 2"
                ><i
                  class="iconfont icon-status"
                  style="color: lightgreen; margin-right: 5px"
                />正常</span
              >
              <span v-else
                ><i
                  class="iconfont icon-status"
                  style="color: red; margin-right: 5px"
                />异常</span
              >
            </template>
          </el-table-column>
          <el-table-column
            prop="remark"
            label="备注"
            min-width="10%"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column prop="url" label="图片" min-width="15%">
            <template v-slot="scope">
              <span v-if="scope.row.url == null">-</span>
              <span v-else>
                <div class="images" v-viewer>
                  <img
                    loading="lazy"
                    v-for="item in scope.row.picture"
                    :src="item"
                    :key="item"
                    style="
                      width: 50px;
                      height: 50px;
                      margin-right: 5px;
                      margin-bottom: 5px;
                    "
                  />
                </div>
              </span>
            </template>
          </el-table-column>
        </el-table>
        <!--分页区域-->
        <my-pagination
          :currentCount="count"
          @changePage="changePage"
          :pageSize="pageSize"
          :currentPage="pageNow"
        />
      </div>
    </div>
  </div>
</template>

<script>
import myPagination from "@/components/common/MyPagination";
import api from "@/api/api";
import { formatDate } from "@/assets/js/date";
export default {
  name: "ReportMessage",
  components: {
    myPagination,
  },
  data() {
    return {
      ReportMessage: {
        reporter_id: "",
        reporter_name: "",
        director_name: "",
        report_rate: "",
        start_time: "",
        end_time: "",
        deadline: "",
        work_summary: "",
        problem: "",
        img_url: "",
        visit_total: "",
      },
      item: "",
      picture: [],
      tableData: [],
      pageNow: 1,
      pageSize: 1,
      count: 0,
    };
  },
  methods: {
    /**
     * 拜访时间格式化
     * @param row
     * @returns {*}
     */
    createtimeFormat(row) {
      const date = new Date(row.create_time);
      return formatDate(date, "yyyy-MM-dd hh:mm");
    },
    /**
     * 时间格式
     * @param time
     * @returns {*}
     */
    timeFormat(time) {
      const date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm");
    },
    /**
     * 时间格式
     * @param time
     * @returns {*}
     */
    timeFormat1(time) {
      const date = new Date(time);
      return formatDate(date, "yyyy-MM-dd");
    },
    /**
     * 得到汇报详情
     */
    httpGetReport() {
      api.getReportRecord({ id: this.$route.query.id }).then((res) => {
        if (res.data.code === 1) {
          this.ReportMessage = res.data.msg;
          if (res.data.msg.img_url && res.data.msg.img_url != "") {
            this.picture = res.data.msg.img_url.split(",");
          }
          this.httpGetVisits(this.pageNow);
        }
      });
    },
    httpGetVisits(page) {
      api
        .getVisitList({
          page: page,
          size: this.pageSize,
          atime: this.ReportMessage.start_time,
          btime: this.ReportMessage.end_time,
          user_id: this.ReportMessage.reporter_id,
        })
        .then((res) => {
          if (res.data.code === 1) {
            this.tableData = res.data.msg.data;
            this.count = res.data.msg.count;
            if (this.count > 0) {
              for (var i = 0; i < this.tableData.length; i++) {
                if (this.tableData[i].url)
                  this.tableData[i].picture = this.tableData[i].url.split(",");
              }
            }
          }
        });
    },
    changePage(page) {
      this.pageNow = page;
      this.httpGetVisits(this.pageNow);
    },
  },
  created() {
    this.httpGetReport();
  },
};
</script>

<style scoped>
.ReportMessage {
  margin: 10px;
}
.title {
  padding: 10px;
  margin-bottom: 10px;
}
.basic-information {
  padding: 20px;
  background: white;
  margin-bottom: 15px;
  border: 1px solid #e7eaed;
  border-radius: 4px;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.04);
}
.basic-information-head {
  padding-left: 5px;
  height: 10px;
  display: flex;
}
.basic-information-head-name {
  font-size: 16px;
  font-family: PingFangSC, PingFangSC-Medium;
  font-weight: 550;
  text-align: left;
  color: rgba(0, 0, 0, 0.8);
  line-height: 24px;
}
.line {
  display: flex;
  margin-left: 10px;
  margin-bottom: 10px;
}
.dataBD {
  display: flex;
  margin-right: 300px;
}
.data {
  display: flex;
  margin-right: 150px;
}
.column {
  font-size: 14px;
  font-family: PingFangSC, PingFangSC-Regular;
  font-weight: 500;
  text-align: left;
  color: rgba(0, 0, 0, 0.5);
  line-height: 30px;
}
.value {
  display: flex;
  font-size: 14px;
  font-family: PingFangSC, PingFangSC-Regular;
  font-weight: 500;
  text-align: left;
  color: rgba(0, 0, 0, 0.8);
  line-height: 30px;
}
.visit-information {
  padding: 20px;
  background: white;
  margin-bottom: 15px;
  border: 1px solid #e7eaed;
  border-radius: 4px;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.04);
}
.wrapper {
  margin: 20px 0;
  border: 1px solid #eeeeee;
}
</style>
