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
    <!--    基础信息 包含编辑按钮-->
    <div class="basic-information">
      <div class="message">
        <div>姓名：{{ bdMessage.name }}</div>
        <div>手机号：{{ bdMessage.phone }}</div>
        <div>城市权限：{{ bdMessage.city }}</div>
      </div>
      <div class="editmessage">编辑按钮</div>
    </div>
    <!--    统计部份 公司数目，合作数目，拜访次数 汇报次数-->
    <div class="efficiency">
      <div class="customcount">
        <div>公司库：{{ bdMessage.customcount }}</div>
        <div>合作库：{{ bdMessage.customcooperatecount }}</div>
      </div>
      <div class="reportscount">
        <div>拜访次数：{{ bdMessage.visitscount }}</div>
        <div>汇报次数：{{ bdMessage.reportscount }}</div>
      </div>
    </div>
    <!--    公司列表部分-->
  </div>
</template>

<script>
import api from "@/api/api";

export default {
  name: "BDMessage",
  data() {
    return {
      bdMessage: {
        name: "",
        phone: "",
        visitscount: 0,
        reportscount: 0,
        customcount: 0,
        customcooperatecount: 0,
        city: [],
      },
    };
  },
  methods: {},
  //生命周期函数
  created() {
    api.getonebd({ id: this.$route.query.id }).then((res) => {
      if (res.data.code === 1) {
        this.bdMessage = res.data.msg;
      }
    });
  },
};
</script>

<style scoped>
.bd-message {
  margin: 10px;
}
.title {
  padding: 10px;
  /*background: white;*/
  /*border: 1px solid #eeeeee;*/
  margin-bottom: 10px;
}
.basic-information {
  display: flex;
  padding: 100px;
  background: white;
  border: 1px solid #eeeeee;
  margin-bottom: 20px;
}
.message {
  position: absolute;
  top: 120px;
  left: 220px;
}
.editmessage {
  position: absolute;
  top: 120px;
  right: 15px;
}
.efficiency {
  display: flex;
  padding: 100px;
  background: white;
  border: 1px solid #eeeeee;
}
.customcount {
  position: absolute;
  top: 340px;
  left: 220px;
}
.reportscount {
  position: absolute;
  top: 340px;
  right: 15px;
}
</style>
