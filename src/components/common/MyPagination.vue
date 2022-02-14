<template>
  <div class="getPage" style="text-align: center; margin: 20px">
    <el-pagination
      background
      layout="total,prev, pager, next,jumper"
      :total="currentCount"
      :page-size="10"
      @current-change="changePage"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "MyPagination",
  props: {
    currentCount: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    changePage(page) {
      this.$emit("changePage", page);
    },
  },
};
</script>

<style scoped></style>
