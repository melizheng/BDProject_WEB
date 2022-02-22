<template>
  <div>
    <el-dialog
      title="修改公司信息"
      v-model="dialogVisible"
      width="600px"
      v-if="dialogVisible"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        label-position="center"
      >
        <el-form-item label="公司名称：" prop="company_name">
          <el-input v-model="ruleForm.company_name"></el-input>
        </el-form-item>

        <el-form-item label="公司地址：" prop="address"
          ><mymap
            :lat="ruleForm.latitude"
            :lng="ruleForm.longitude"
            @changeLatAndLng="changeLatAndLng"
          ></mymap
        ></el-form-item>
        <el-form-item label="详细地址：" prop="detail_address">
          <el-input v-model="ruleForm.detail_address"></el-input>
        </el-form-item>
        <el-form-item label="备注：" prop="remark">
          <el-input type="textarea" v-model="ruleForm.remark"></el-input>
        </el-form-item>
      </el-form>
      <template v-slot:footer>
        <span class="dialog-footer">
          <el-button @click="closeDialog">取 消</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >确 定</el-button
          >
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
  name: "EidtCustomMessage",
  components: {
    mymap,
  },
  data() {
    return {
      dialogVisible: false,
      ruleForm: {
        id: "",
        company_name: "",
        detail_address: "",
        address: "",
        remark: "",
        latitude: "",
        longitude: "",
        city_code: "",
        city_name:"",
      },
      rules: {
        company_name: [
          { required: true, message: "请输入公司名称", trigger: "blur" },
          { min: 3, max: 20, message: "请输入至少3~20个字符", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    changeLatAndLng(lat, lng) {
      this.ruleForm.latitude = lat;
      this.ruleForm.longitude = lng;
    },
    /**
     * 提交表单请求编辑接口
     */
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
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
                console.log(this.ruleForm);
                //请求接口修改公司信息
                api
                  .updateCustom({
                    id: this.ruleForm.id,
                    company_name: this.ruleForm.company_name,
                    address: this.ruleForm.address,
                    detail_address: this.ruleForm.detail_address,
                    remark: this.ruleForm.remark,
                    city_code: this.ruleForm.city_code,
                    city_name: this.ruleForm.city_name,
                    latitude: this.ruleForm.latitude,
                    longitude: this.ruleForm.longitude,
                  })
                  .then((resq) => {
                    if (resq.data.code === 1) {
                      this.$message({
                        type: "success",
                        message: "修改公司信息成功!",
                      });
                      //重置表单
                      this.$refs[formName].resetFields();
                      //关闭
                      this.closeDialog();
                      this.$parent.httpGetOneCustom();
                    } else {
                      //修改失败
                      ElMessageBox.confirm(resq.data.msg, "提示", {
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
        } else {
          console.log("没按规则输入内容！");
        }
      });
    },
    closeDialog() {
      this.dialogVisible = false;
    },
  },
};
</script>

<style scoped></style>
