<template>
  <div class="bd-message">
    <!--    面包屑导航部分-->
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/bdList' }"
          >BD列表</el-breadcrumb-item
        >
        <el-breadcrumb-item>BD详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content">
      <!--    基础信息 包含编辑按钮-->
      <div class="basic-information">
        <div class="basic-information-head">
          <div class="basic-information-head-name">BD信息</div>
          <div class="basic-information-head-name-edit">
            <el-button class="myButton" @click="handleClickDetailEdit"
              >编辑信息</el-button
            >
            <EditAccount ref="EditAccountDialog" />
          </div>
        </div>
        <el-divider></el-divider>
        <div class="basic-information-content-nameAndPhone">
          <div class="basic-information-content-name">
            <div class="basic-information-content-column">姓名：</div>
            <div class="basic-information-content-city">
              {{ bdMessage.name }}
            </div>
          </div>
          <div class="basic-information-content-phone">
            <div class="basic-information-content-column">手机号：</div>
            <div class="basic-information-content-city">
              {{ bdMessage.phone }}
            </div>
          </div>
        </div>
        <div class="basic-information-content-city">
          <div class="basic-information-content-column">城市权限：</div>
          <div class="basic-information-content-city">
            <p v-for="(item, i) in bdMessage.city" :key="item.city_code">
              {{ item.city_name }}
              <span v-if="i != bdMessage.city.length - 1">、</span>
            </p>
          </div>
        </div>
      </div>
      <!--    统计部份 公司数目，合作数目，拜访次数 汇报次数-->
      <!-- 统计部份 头 -->
      <div class="basic-efficiency">
        <div class="basic-information-head">
          <div class="basic-information-head-name">BD数据</div>
        </div>
        <el-divider></el-divider>
        <!--统计部份内容-->
        <div class="basic-efficiency-content">
          <div class="basic-efficiency-content-one">
            <div class="basic-efficiency-content-one-photo">
              <img :src="customimg" />
            </div>
            <div class="basic-efficiency-content-one-description">
              <div class="basic-efficiency-content-one-description-name">
                公司库
              </div>
              <div class="basic-efficiency-content-one-description-count">
                {{ bdMessage.customcount }}
              </div>
            </div>
          </div>
          <div class="basic-efficiency-content-one">
            <div class="basic-efficiency-content-one-photo">
              <img :src="customcooperateimg" />
            </div>
            <div class="basic-efficiency-content-one-description">
              <div class="basic-efficiency-content-one-description-name">
                合作库
              </div>
              <div class="basic-efficiency-content-one-description-count">
                {{ bdMessage.customcooperatecount }}
              </div>
            </div>
          </div>
          <div class="basic-efficiency-content-one">
            <div class="basic-efficiency-content-one-photo">
              <img :src="visitimg" />
            </div>
            <div class="basic-efficiency-content-one-description">
              <div class="basic-efficiency-content-one-description-name">
                拜访次数
              </div>
              <div class="basic-efficiency-content-one-description-count">
                {{ bdMessage.visitscount }}
              </div>
            </div>
          </div>
          <div class="basic-efficiency-content-one">
            <div class="basic-efficiency-content-one-photo">
              <img :src="reportimg" />
            </div>
            <div class="basic-efficiency-content-one-description">
              <div class="basic-efficiency-content-one-description-name">
                拜访次数
              </div>
              <div class="basic-efficiency-content-one-description-count">
                {{ bdMessage.reportscount }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--    拜访记录或者客户列表等部分-->
      <div class="basic-twoWrapper">
        <!--        head 单选 选择一个表格-->
        <div class="basic-information-head">
          <el-radio-group v-model="tableChoose">
            <el-radio-button
              class="myRadioButton"
              label="拜访记录"
            ></el-radio-button>
            <el-radio-button
              class="myRadioButton"
              label="客户列表"
            ></el-radio-button>
          </el-radio-group>
        </div>
        <el-divider style="margin-top: 30px"></el-divider>
        <!--    客户列表表格区域-->
        <span v-if="tableChoose === '客户列表'">
          <div class="search">
            <my-custom-status-dropdown
              style="width: 100px"
              @chooseStatus="chooseStatus"
              class="el-button-status"
            ></my-custom-status-dropdown>
            <el-input
              class="inputType"
              v-model="input"
              placeholder="请输入查询的公司名称"
              @change="searchInput"
              style="width: 300px; margin-right: 10px"
            ></el-input>
            <el-button
              @click="searchInput"
              class="myButton"
              style="width: 10px"
            >
              <i class="iconfont icon-sousuo"
            /></el-button>
          </div>
          <div class="wrapper">
            <el-table
              :data="tableCustomData"
              style="width: 100%"
              :header-cell-style="{ background: '#FAFAFA' }"
            >
              <el-table-column
                prop="company_name"
                label="公司名称"
                min-width="10%"
              >
              </el-table-column>
              <el-table-column prop="address" label="公司地址" min-width="40%">
              </el-table-column>
              <el-table-column prop="status" label="合作状态" min-width="10%">
                <template v-slot="scope">
                  <span v-if="scope.row.status === 1">已合作</span>
                  <span v-else-if="scope.row.status === 2">未合作</span>
                  <span v-else style="color: cadetblue">审核中</span>
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
          <MyPagination
            :currentCount="countCustom"
            :pageSize="pageSize"
            @changePage="changePage"
            :currentPage="pageCustomNow"
          />
        </span>
        <!--    拜访记录表格区域-->
        <span v-else>
          <div class="search">
            <my-date-picker
              @changeTime="changeTime"
              style="margin-right: 10px"
            />
            <my-visits-status-dropdown
              style="width: 160px"
              @chooseStatus="chooseStatus"
              class="el-button-status"
            ></my-visits-status-dropdown>
            <el-input
              class="inputType"
              v-model="input"
              placeholder="请输入查询拜访的公司名称"
              @change="searchInput"
              style="width: 300px; margin-right: 10px"
            ></el-input>
            <el-button class="myButton" @click="searchInput"
              ><i class="iconfont icon-sousuo"
            /></el-button>
          </div>

          <div class="wrapper">
            <el-table
              :data="tableVisitsData"
              style="width: 100%"
              :header-cell-style="{ background: '#FAFAFA' }"
            >
              <el-table-column prop="user_name" label="拜访BD" min-width="10%">
              </el-table-column>
              <el-table-column
                prop="company_name"
                label="拜访对象"
                min-width="10%"
              >
              </el-table-column>
              <el-table-column prop="address" label="拜访地址" min-width="30%">
              </el-table-column>
              <el-table-column
                prop="create_time"
                label="拜访时间"
                min-width="15%"
                :formatter="createtimeFormat"
              >
              </el-table-column>
              <el-table-column prop="status" label="打卡状态" min-width="15%">
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
              <el-table-column prop="remark" label="备注" min-width="10%">
              </el-table-column>
            </el-table>
          </div>
          <MyPagination
            :currentCount="countVisit"
            :pageSize="pageSize"
            @changePage="changePage"
            :currentPage="pageVisitNow"
          />
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api/api";
import EditAccount from "@/components/common/EditAccount";
import MyPagination from "@/components/common/MyPagination";
import visitimg from "@/assets/photo/visit.png";
import customimg from "@/assets/photo/custom.png";
import customcooperateimg from "@/assets/photo/customcooperate.png";
import reportimg from "@/assets/photo/report.png";
import myCustomStatusDropdown from "@/components/CustomList/MyCustomStatusDropdown";
import MyVisitsStatusDropdown from "@/components/VisitsList/MyVisitsStatusDropdown";
import MyDatePicker from "@/components/common/MyDatePicker";
import { formatDate } from "@/assets/js/date";
export default {
  name: "BDMessage",
  components: {
    EditAccount,
    MyPagination,
    myCustomStatusDropdown,
    MyVisitsStatusDropdown,
    MyDatePicker,
  },
  data() {
    return {
      tableChoose: "拜访记录",
      visitimg: visitimg,
      customimg: customimg,
      customcooperateimg: customcooperateimg,
      reportimg: reportimg,
      item: {},
      city_codes: [],
      bdMessage: {
        name: "",
        phone: "",
        visitscount: 0,
        reportscount: 0,
        customcount: 0,
        customcooperatecount: 0,
        city: [],
      },
      tableCustomData: [],
      tableVisitsData: [],
      pageSize: 5,
      pageCustomNow: 1,
      pageVisitNow: 1,
      countCustom: 0,
      countVisit: 0,
      input: "",
      companyStatus: "",
      visitsstatus: "",
      startTime: "",
      endTime: "",
    };
  },
  methods: {
    /**
     * 更新信息
     */
    roload() {
      location.reload();
    },
    /**
     * 展示时间的格式
     * @param row
     * @returns {*}
     */
    createtimeFormat(row) {
      const date = new Date(row.create_time);
      return formatDate(date, "yyyy-MM-dd hh:mm");
    },
    /**
     * 编辑bd信息
     */
    handleClickDetailEdit() {
      this.$refs.EditAccountDialog.dialogVisible = true;
      this.$refs.EditAccountDialog.ruleForm.id = this.$route.query.id;
      this.$refs.EditAccountDialog.ruleForm.name = this.bdMessage.name;
      this.$refs.EditAccountDialog.ruleForm.phone = this.bdMessage.phone;
      this.$refs.EditAccountDialog.ruleForm.citySelected = this.city_codes;
    },
    /**
     * 封装客户列表的获取
     * @param page
     * @param input
     * @param citycode
     */
    httpCustom(page, user_id, input, companystatus) {
      api
        .getCustomList({
          page: page,
          size: this.pageSize,
          input: input,
          user_id: user_id,
          status: companystatus,
        })
        .then((res) => {
          this.tableCustomData = res.data.msg.data;
          this.countCustom = res.data.msg.count;
        });
    },
    /**
     * 封装拜访记录列表的获取
     * @param page
     * @param input
     * @param citycode
     */
    httpVisits(page, user_id, input, visitsstatus, starttime, endtime) {
      api
        .getVisitList({
          page: page,
          size: this.pageSize,
          user_id: user_id,
          input: input,
          status: visitsstatus,
          atime: starttime,
          btime: endtime,
        })
        .then((res) => {
          this.tableVisitsData = res.data.msg.data;
          this.countVisit = res.data.msg.count;
        });
    },
    /**
     * 修改了页数
     * @param page
     */
    changePage(page) {
      if (this.tableChoose === "客户列表") {
        this.pageCustomNow = page;
        this.httpCustom(
          this.pageCustomNow,
          this.$route.query.id,
          this.input,
          this.companyStatus
        );
      } else {
        this.pageVisitNow = page;
        this.httpVisits(
          this.pageVisitNow,
          this.$route.query.id,
          this.input,
          this.visitsstatus,
          this.startTime,
          this.endTime
        );
      }
    },
    /**
     * 条件修改进行搜索-页面强制为1
     */
    searchInput() {
      if (this.tableChoose === "客户列表") {
        this.pageCustomNow = 1;
        this.httpCustom(
          1,
          this.$route.query.id,
          this.input,
          this.companyStatus
        );
      } else {
        this.pageVisitNow = 1;
        this.httpVisits(
          1,
          this.$route.query.id,
          this.input,
          this.visitsstatus,
          this.startTime,
          this.endTime
        );
      }
    },
    /**
     * 修改了状态
     * @param item
     */
    chooseStatus(item) {
      if (this.tableChoose === "客户列表") this.companyStatus = item.status;
      else this.visitsstatus = item.status;
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
    /**
     * 查看客户详情
     * @param index
     * @param row
     */
    handleClickDetail(index, row) {
      this.$router.push({ path: "/custommessage", query: { id: row.id } });
    },
  },
  //生命周期函数
  created() {
    api.getonebd({ id: this.$route.query.id }).then((res) => {
      if (res.data.code === 1) {
        this.bdMessage = res.data.msg;
        var i;
        for (i = 0; i < res.data.msg.city.length; i++) {
          this.city_codes[i] = res.data.msg.city[i].city_code;
        }
      }
    });
    this.httpCustom(1, this.$route.query.id);
    this.httpVisits(1, this.$route.query.id);
  },
};
</script>

<style scoped>
.bd-message {
  margin: 10px;
}
.title {
  padding: 10px;
  margin-bottom: 10px;
}
.basic-information {
  padding: 20px;
  background: white;
  height: 150px;
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
.basic-information-head-name-edit {
  position: absolute;
  right: 30px;
  top: 120px;
}
.basic-information-content-nameAndPhone {
  display: flex;
  margin-bottom: 20px;
}
.basic-information-content-name {
  display: flex;
}
.basic-information-content-phone {
  position: absolute;
  left: 1000px;
  display: flex;
}
.basic-information-content-city {
  display: flex;
  font-size: 14px;
  font-family: PingFangSC, PingFangSC-Regular;
  font-weight: 500;
  text-align: left;
  color: rgba(0, 0, 0, 0.8);
  line-height: 30px;
}
.basic-information-content-column {
  font-size: 14px;
  font-family: PingFangSC, PingFangSC-Regular;
  font-weight: 500;
  text-align: left;
  color: rgba(0, 0, 0, 0.5);
  line-height: 30px;
}
.basic-efficiency {
  height: 150px;
  padding: 20px;
  background: white;
  margin-bottom: 15px;
  border: 1px solid #e7eaed;
  border-radius: 4px;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.04);
}
.basic-efficiency-content {
  display: flex;
}
.basic-efficiency-content-one {
  padding-top: 10px;
  display: flex;
  margin-left: 5%;
  margin-right: 7%;
}
.basic-efficiency-content-one-photo {
  margin-right: 10px;
}
.basic-efficiency-content-one-description-name {
  font-size: 14px;
  font-family: PingFangSC, PingFangSC-Medium;
  font-weight: 600;
  text-align: left;
  color: rgba(0, 0, 0, 0.3);
  line-height: 22px;
  margin-bottom: 5px;
}
.basic-efficiency-content-one-description-count {
  font-size: 30px;
  font-family: DINAlternate, DINAlternate-Bold;
  font-weight: 700;
  text-align: left;
  color: rgba(0, 0, 0, 0.8);
  line-height: 28px;
}
.basic-twoWrapper {
  height: 100%;
  padding: 20px;
  background: white;
  border: 1px solid #e7eaed;
  border-radius: 4px;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.04);
}
.search {
  display: flex;
}
.el-button-status {
  margin-right: 10px;
}
.wrapper {
  margin: 20px 0;
  border: 1px solid #eeeeee;
}
</style>
