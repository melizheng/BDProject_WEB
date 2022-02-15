<template>
  <div class="block">
    <el-date-picker
      v-model="value"
      type="daterange"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      @change="changeTime"
    >
    </el-date-picker>
  </div>
</template>

<script>
export default {
  name: "MyDatePicker",
  data() {
    return {
      value: "",
    };
  },
  methods: {
    changeTime(value) {
      if (null === this.value) {
        this.$emit("changeTime", null);
      } else {
        value[0] = this.value[0].getTime();
        value[1] = this.value[1].getTime() + 86399000;
        this.$emit("changeTime", value);
      }
    },
  },
};
</script>

<style scoped></style>
