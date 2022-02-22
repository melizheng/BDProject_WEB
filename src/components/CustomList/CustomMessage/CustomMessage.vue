<template>
  <div class="custom-message">
    <!--    面包屑导航部分-->
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/customlist' }"
          >客户列表</el-breadcrumb-item
        >
        <el-breadcrumb-item>客户详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content">
      <!--    基础信息 包含编辑-->
      <div class="basic-information">
        <edit-custom-message ref="editCustom"></edit-custom-message>
        <div class="basic-information-head">
          <div class="basic-information-head-name">客户信息</div>
          <div class="basic-information-head-name-edit">
            <el-button class="myButton" @click="editCustom"
              >编辑客户信息</el-button
            >
          </div>
        </div>
        <el-divider></el-divider>
        <div class="basic-information-content-nameAndAddress">
          <div class="basic-information-content-name">
            <div class="basic-information-content-column">公司名称：</div>
            <div class="basic-information-content-value">
              {{ CustomMessage.company_name }}
            </div>
          </div>
          <div class="basic-information-content-address">
            <div class="basic-information-content-column">公司地址：</div>
            <div class="basic-information-content-value">
              {{ CustomMessage.address }}{{ CustomMessage.detail_address }}
            </div>
          </div>
        </div>
        <div class="basic-information-content-name">
          <div class="basic-information-content-column">备注：</div>
          <div class="basic-information-content-value">
            <span v-if="CustomMessage.remark === ''">-</span>
            <span v-else> {{ CustomMessage.remark }}</span>
          </div>
        </div>
      </div>
      <!--    对接bd-->
      <div class="basic-bd">
        <edit-custom-b-d ref="editBD"></edit-custom-b-d>
        <div class="basic-information-head">
          <div class="basic-information-head-name">对接BD</div>
          <div class="basic-bd-head-edit">
            <el-button class="myButton" @click="editBD">修改对接BD</el-button>
          </div>
        </div>
        <el-divider></el-divider>
        <!--    表格区域-->
        <div class="wrapper">
          <el-table
            :data="tableBDData"
            style="width: 100%"
            :header-cell-style="{ background: '#FAFAFA' }"
          >
            <el-table-column prop="name" label="姓名" min-width="30%">
            </el-table-column>
            <el-table-column prop="phone" label="手机号" min-width="30%">
            </el-table-column>
            <el-table-column prop="cityName" label="城市" min-width="40%">
            </el-table-column>
          </el-table>
        </div>
      </div>
      <!--    拜访地址列表 修改等操作-->
      <div class="basic-customVisit">
        <edit-custom-visit
          ref="editCustomVisit"
          :pageNow="CustomVisitPageNow"
        ></edit-custom-visit>
        <add-custom-visit
          :pageNow="CustomVisitPageNow"
          ref="addCustomVisit"
        ></add-custom-visit>
        <div class="basic-information-head">
          <div class="basic-information-head-name">拜访地址</div>
          <div class="basic-customVisit-head-edit">
            <el-button class="myButton" @click="addCustomVisit"
              >新增地址</el-button
            >
          </div>
        </div>
        <el-divider></el-divider>
        <div class="wrapper">
          <el-table
            :data="tableCustomVisitData"
            style="width: 100%"
            :header-cell-style="{ background: '#FAFAFA' }"
          >
            <el-table-column prop="city_name" label="城市" min-width="15%">
            </el-table-column>
            <el-table-column prop="address" label="地址" min-width="30%">
            </el-table-column>
            <el-table-column
              prop="detail_address"
              label="详细地址"
              min-width="10%"
            >
              <template v-slot="scope">{{
                scope.row.detail_address ? scope.row.detail_address : "-"
              }}</template>
            </el-table-column>
            <el-table-column
              prop="contract_name"
              label="联系人姓名"
              min-width="12%"
              align="center"
            >
              <template v-slot="scope">{{
                scope.row.contract_name ? scope.row.contract_name : "-"
              }}</template>
            </el-table-column>
            <el-table-column
              prop="position"
              label="联系人职务"
              min-width="12%"
              align="center"
            >
              <template v-slot="scope">{{
                scope.row.position ? scope.row.position : "-"
              }}</template>
            </el-table-column>
            <el-table-column
              prop="phone"
              label="联系人手机号"
              min-width="15%"
              align="center"
            >
              <template v-slot="scope">{{
                scope.row.phone ? scope.row.phone : "-"
              }}</template>
            </el-table-column>
            <el-table-column label="操作" min-width="10%" align="center">
              <template v-slot="scope">
                <el-button
                  @click="handleClickDetailEditVisit(scope.row)"
                  type="text"
                  size="small"
                  >编辑</el-button
                >
                <el-button
                  @click="handleClickDetailDeleteVisit(scope.row)"
                  type="text"
                  size="small"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
        <my-pagination
          :currentCount="CustomVisitCount"
          :pageSize="pageSize"
          @changePage="changePage"
          :currentPage="CustomVisitPageNow"
        />
      </div>
      <!--    拜访记录列表部分-->
      <div class="basic-Visits">
        <div class="basic-information-head">
          <div class="basic-information-head-name">拜访记录</div>
        </div>
        <el-divider></el-divider>
        <visits></visits>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api/api";
import myPagination from "@/components/common/MyPagination";
import Visits from "@/components/CustomList/CustomMessage/Visits";
import EditCustomBD from "@/components/CustomList/CustomMessage/EditCustomBD";
import EditCustomMessage from "@/components/CustomList/CustomMessage/EidtCustomMessage";
import EditCustomVisit from "@/components/CustomList/CustomMessage/EditCustomVisit";
import addCustomVisit from "@/components/CustomList/CustomMessage/AddCustomVisit";
export default {
  name: "CustomMessage",
  components: {
    addCustomVisit,
    EditCustomVisit,
    EditCustomMessage,
    EditCustomBD,
    Visits,
    myPagination,
  },
  data() {
    return {
      CustomMessage: {
        company_name: "",
        address: "",
        detail_address: "",
        remark: "",
        latitude: "",
        longitude: "",
      },
      tableBDData: [{ name: "", phone: "", cityName: "" }],
      pageSize: 4,
      tableCustomVisitData: [],
      CustomVisitCount: 0,
      CustomVisitPageNow: 1,
    };
  },
  methods: {
    /**
     * 修改客户信息
     */
    editCustom() {
      this.$refs.editCustom.ruleForm.id = this.$route.query.id;
      this.$refs.editCustom.ruleForm.company_name =
        this.CustomMessage.company_name;
      this.$refs.editCustom.ruleForm.address = this.CustomMessage.address;
      this.$refs.editCustom.ruleForm.detail_address =
        this.CustomMessage.detail_address;
      this.$refs.editCustom.ruleForm.remark = this.CustomMessage.remark;
      this.$refs.editCustom.ruleForm.latitude = this.CustomMessage.latitude;
      this.$refs.editCustom.ruleForm.longitude = this.CustomMessage.longitude;
      this.$refs.editCustom.dialogVisible = true;
    },
    /**
     * 修改对接BD
     */
    editBD() {
      this.$refs.editBD.dialogVisible = true;
      this.$refs.editBD.ruleForm.id = this.$route.query.id;
    },
    /**
     * 增加拜访地址
     */
    addCustomVisit() {
      this.$refs.addCustomVisit.dialogVisible = true;
      this.$refs.addCustomVisit.ruleForm.custom_id = this.$route.query.id;
    },
    /**
     * 修改拜访地址
     * @param row
     */
    handleClickDetailEditVisit(row) {
      this.$refs.editCustomVisit.ruleForm.id = row.id;
      this.$refs.editCustomVisit.ruleForm.address = row.address;
      this.$refs.editCustomVisit.ruleForm.detail_address = row.detail_address;
      this.$refs.editCustomVisit.ruleForm.latitude = row.latitude;
      this.$refs.editCustomVisit.ruleForm.longitude = row.longitude;
      this.$refs.editCustomVisit.ruleForm.contract_name = row.contract_name;
      this.$refs.editCustomVisit.ruleForm.phone = row.phone;
      this.$refs.editCustomVisit.ruleForm.position = row.position;
      this.$refs.editCustomVisit.dialogVisible = true;
    },
    /**
     * 删除拜访地址
     */
    handleClickDetailDeleteVisit(row) {
      this.$confirm("此操作将永久删除该拜访地址, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //请求删除接口——
          api.deleteCustomVisit({ id: row.id }).then((res) => {
            if (res.data.code === 1) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.httpGetCustomVisitList(this.CustomVisitPageNow);
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
     * 修改拜访地址的页数
     * @param page
     */
    changePage(page) {
      this.CustomVisitPageNow = page;
      this.httpGetCustomVisitList(page);
    },
    /**
     * 封装得到拜访地址列表
     */
    httpGetCustomVisitList(page) {
      api
        .getCustomVisitList({
          id: this.$route.query.id,
          page: page,
          size: this.pageSize,
        })
        .then((res) => {
          if (res.data.code === 1) {
            this.tableCustomVisitData = res.data.msg.data;
            this.CustomVisitCount = res.data.msg.count;
          }
        });
    },
    /**
     * 封装得到客户信息
     */
    httpGetOneCustom() {
      api.getOneCustom({ id: this.$route.query.id }).then((res) => {
        if (res.data.code === 1) {
          this.CustomMessage = res.data.msg;
          this.httpGetOneBD(res.data.msg.user_id);
        }
      });
    },
    /**
     * 封装得到对接BD信息
     * @param id
     */
    httpGetOneBD(id) {
      api.getonebd({ id: id }).then((res) => {
        if (res.data.code === 1) {
          this.tableBDData[0] = res.data.msg;
          this.tableBDData[0].cityName = "";
          var i;
          for (i = 0; i < res.data.msg.city.length; i++) {
            this.tableBDData[0].cityName +=
              res.data.msg.city[i].city_name + " ";
          }
        }
      });
    },
  },
  created() {
    this.httpGetOneCustom();
    this.httpGetCustomVisitList(1);
  },
};
</script>

<style scoped>
.custom-message {
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
.basic-information-head-name-edit {
  position: absolute;
  right: 30px;
  top: 120px;
}
.basic-information-content-nameAndAddress {
  display: flex;
  margin-bottom: 20px;
}
.basic-information-content-name {
  display: flex;
}
.basic-information-content-address {
  position: absolute;
  left: 500px;
  display: flex;
}
.basic-information-content-column {
  font-size: 14px;
  font-family: PingFangSC, PingFangSC-Regular;
  font-weight: 500;
  text-align: left;
  color: rgba(0, 0, 0, 0.5);
  line-height: 30px;
}
.basic-information-content-value {
  display: flex;
  font-size: 14px;
  font-family: PingFangSC, PingFangSC-Regular;
  font-weight: 500;
  text-align: left;
  color: rgba(0, 0, 0, 0.8);
  line-height: 30px;
}
.basic-bd {
  padding: 20px;
  background: white;
  margin-bottom: 15px;
  border: 1px solid #e7eaed;
  border-radius: 4px;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.04);
}
.basic-bd-head-edit {
  position: absolute;
  right: 30px;
  top: 315px;
}
.wrapper {
  margin: 20px 0;
  border: 1px solid #eeeeee;
}
.basic-customVisit {
  padding: 20px;
  background: white;
  margin-bottom: 15px;
  border: 1px solid #e7eaed;
  border-radius: 4px;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.04);
}
.basic-customVisit-head-edit {
  position: absolute;
  right: 30px;
  top: 535px;
}
.basic-Visits {
  padding: 20px;
  background: white;
  margin-bottom: 15px;
  border: 1px solid #e7eaed;
  border-radius: 4px;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.04);
}
</style>
