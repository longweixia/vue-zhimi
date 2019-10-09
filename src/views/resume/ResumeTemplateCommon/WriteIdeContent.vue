<template>
  <div class="jm-container">
    <!-- <WriteResumeTemplate3/> -->
    <WriteResumeTemplate4/>
  </div>
</template>

<script>
import WriteResumeTemplate3 from "@/views/resume/WriteResumeTemplate/WriteResumeTemplate3";
import WriteResumeTemplate4 from "@/views/resume/WriteResumeTemplate/WriteResumeTemplate4";
export default {
  name: "WriteIdeContent",
  data() {
    return {};
  },
  components: {
      WriteResumeTemplate3,
      WriteResumeTemplate4
  },
  watch: {},

  mounted() {},
  created() {}
};
</script>

<style lang="less" scoped>
.jm-container {
  // position: fixed;
  // width: 70px;
  background: #fff;
  margin-right: 5px;
  margin-left:100px;
  margin-top: 30px;
  
}
</style>
