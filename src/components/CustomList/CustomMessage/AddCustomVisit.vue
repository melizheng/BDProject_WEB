<template>
  <div>
    <el-dialog
      title="新增拜访地址"
      v-model="dialogVisible"
      width="600px"
      v-if="dialogVisible"
    >
      <el-form
        :model="ruleForm"
        ref="ruleForm"
        label-width="130px"
        label-position="center"
      >
        <el-form-item label="公司地址：" prop="address"
          ><mymap
            ref="myMap"
            :lat="ruleForm.latitude"
            :lng="ruleForm.longitude"
            @changeLatAndLng="changeLatAndLng"
          ></mymap
        ></el-form-item>
        <el-form-item label="详细地址：" prop="detail_address">
          <el-input v-model="ruleForm.detail_address"></el-input>
        </el-form-item>
        <el-form-item label="对接人姓名：" prop="contract_name">
          <el-input v-model="ruleForm.contract_name"></el-input>
        </el-form-item>
        <el-form-item label="职位：" prop="position">
          <el-input v-model="ruleForm.position"></el-input>
        </el-form-item>
        <el-form-item label="联系方式：" prop="phone">
          <el-input v-model="ruleForm.phone"></el-input>
        </el-form-item>
      </el-form>
      <template v-slot:footer>
        <span class="dialog-footer">
          <el-button @click="closeDialog">取 消</el-button>
          <el-button type="primary" @click="submitForm">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import mymap from "@/components/common/Mymap";
import api from "@/api/api";
import { ElMessageBox } from "element-plus";
export default {
  name: "AddCustomVisit",
  components: {
    mymap,
  },
  props: {
    pageNow: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      dialogVisible: false,
      ruleForm: {
        custom_id: "",
        detail_address: "",
        address: "",
        latitude: "39.916527",
        longitude: "116.397128",
        city_code: "",
        city_name:"",
        contract_name: "",
        position: "",
        phone: "",
      },
    };
  },
  methods: {
    /**
     * 修改坐标
     * @param lat
     * @param lng
     */
    changeLatAndLng(lat, lng) {
      this.ruleForm.latitude = lat;
      this.ruleForm.longitude = lng;
    },
    /**
     * 提交表单请求编辑接口
     */
    submitForm() {
      //逆地址解析 从坐标得到具体地址位置
      api
        .getAddressByLocation({
          location: this.ruleForm.latitude + "," + this.ruleForm.longitude,
          key: "IJNBZ-LCLYW-FUURX-ONMIU-2NLR6-KAFGA",
        })
        .then((res) => {
          if (res.data.status === 0) {
            this.ruleForm.address = res.data.result.address;
            this.ruleForm.city_code = res.data.result.ad_info.city_code;
            this.ruleForm.city_name=res.data.result.address_component.city;
            api
              .addCustomVisit({
                custom_id: this.ruleForm.custom_id,
                address: this.ruleForm.address,
                detail_address: this.ruleForm.detail_address,
                city_code: this.ruleForm.city_code,
                city_name: this.ruleForm.city_name,
                latitude: this.ruleForm.latitude,
                longitude: this.ruleForm.longitude,
                contract_name: this.ruleForm.contract_name,
                phone: this.ruleForm.phone,
                position: this.ruleForm.position,
              })
              .then((res) => {
                if (res.data.code === 1) {
                  //修改成功提示
                  this.$message({
                    type: "success",
                    message: "修改拜访地址成功!",
                  });
                  this.closeDialog();
                  this.$parent.httpGetCustomVisitList(this.pageNow);
                } else {
                  ElMessageBox.confirm(res.data.msg, "提示", {
                    showCancelButton: false,
                    type: "warning",
                  });
                  return Promise.reject("error");
                }
              });
          } else {
            //解析地址失败
            ElMessageBox.confirm(res.data.message, "提示", {
              showCancelButton: false,
              type: "warning",
            });
            return Promise.reject("error");
          }
        });
    },
    /**
     * 关闭弹窗
     */
    closeDialog() {
      this.dialogVisible = false;
    },
  },
};
</script>

<style scoped></style>
