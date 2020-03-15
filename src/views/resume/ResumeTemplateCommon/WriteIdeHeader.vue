<template>
  <div class="jm-header">
    <div>
      <span class="head-text" @click="$router.back(-1)">
        返回
      </span>
      <span class="head-text">
        龙伟的简历
      </span>
      <span class="head-text">
        <span @click="preview">预览</span>
      </span>
      <span class="head-text">
        <span @click="saveContent">保存</span>
        <span @click="downImg">下载</span>
      </span>
      <span class="head-text">
        <span @click="toMyCenter">个人中心</span>
      </span>
    </div>
  </div>
</template>

<script>
import Bus from "@/assets/event-bus.js";
export default {
  name: "WriteIdeHeader",
  data() {
    return {};
  },
  components: {},
  methods: {
    // 保存
    saveContent() {
      Bus.$emit("saveContents");
    },
    // 预览
    preview() {
      Bus.$emit("previews");
    },
    // 个人中心
    toMyCenter() {
     this.$router.push({name:"myResume"})
    },

    // 下载
    downImg() {
      this.axios.post("resumes/downImg", {
        name: "截图1",
        headers: { "content-type": "multipart/form-data" }
      }).then(res=>{
        if(res.data.status=="0"){
          // 下载功能
          var a = document.createElement("a")
          a.download = "截图1"
          // 设置地址
          a.href = res.data.msg
          a.click()
        }
      }).catch(err=>{
        
      })
    }
  },
  watch: {},

  mounted() {},
  created() {}
};
</script>

<style lang="less" scoped>
.jm-header {
  height: 50px;
  text-align: center;
  padding-right: 50px;
  .head-text {
    padding-right: 100px;
    cursor: pointer;
  }

  /deep/.ivu-layout-header {
    height: 50px;
    line-height: 50px;
  }
}
</style>
