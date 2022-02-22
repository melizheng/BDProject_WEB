<template>
  <div class="EditPassword">
    <el-dialog title="修改密码" v-model="dialogVisible" width="35%">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        label-position="left"
      >
        <el-form-item label="修改密码：" prop="password">
          <el-input v-model="ruleForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码：" prop="password2">
          <el-input v-model="ruleForm.password2" type="password"></el-input>
        </el-form-item>
      </el-form>
      <template v-slot:footer>
        <span class="dialog-footer">
          <el-button @click="closeDialog('ruleForm')">取 消</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >确 定</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import api from "@/api/api";
import { ElMessageBox } from "element-plus";
import hex_md5 from "@/assets/js/MD5";

export default {
  name: "EditPassword",
  data() {
    return {
      dialogVisible: false,
      ruleForm: {
        password: "",
        password2: "",
      },
      rules: {
        password: [
          { required: true, message: "请输入修改密码", trigger: "blur" },
          { min: 6, message: "请输入至少6个字符", trigger: "blur" },
        ],
        password2: [
          { required: true, message: "请输入确认密码", trigger: "blur" },
          { min: 6, message: "请输入至少6个字符", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    /**
     * 提交表单请求接口
     */
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.ruleForm.password2 !== this.ruleForm.password) {
            ElMessageBox.confirm("二次输入密码不同", "提示", {
              showCancelButton: false,
              type: "warning",
            });
            return Promise.reject("error");
          } else {
            //请求修改密码
            api
              .updatePassw({ password: hex_md5(this.ruleForm.password) })
              .then((res) => {
                if (res.data.code === 1) {
                  this.$message({
                    type: "success",
                    message: "修改密码成功!",
                  });
                  this.closeDialog(formName);
                }
              });
          }
        } else {
          console.log("没按规则输入内容！");
        }
      });
    },
    /**
     * 关闭弹窗
     */
    closeDialog(formName) {
      this.dialogVisible = false;
      //重置表单
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped></style>
