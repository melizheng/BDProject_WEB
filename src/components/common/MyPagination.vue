<template>
  <div class="getPage" style="text-align: center; margin: 20px">
    <el-pagination
      background
      layout="total,prev, pager,next,jumper"
      :total="currentCount"
      :page-size="pageSize"
      :current-page="currentPage"
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
    pageSize: {
      type: Number,
      default: 10,
    },
    currentPage:{
      type: Number,
      default: 1,
    }
  },
  methods: {
    changePage(page) {
      this.$emit("changePage", page);
    },
  },
};
</script>

<style scoped></style>
