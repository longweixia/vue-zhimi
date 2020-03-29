<template>
  <div class="jm-header">
    <div>
      <span class="head-text">
        <router-link :to="{ name: 'home' }"> 首页</router-link>
      </span>
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
        <div class="tips-content">
        <Alert closable  v-if="showTip" type="success" show-icon @on-close="closeTips">
          保存成功，<a @click="getMOre">多主题展示</a>？
        </Alert>
        </div>
        <span @click="downImg">下载</span>
        
      </span>
      <span class="head-text">
        <span @click="toMyCenter">个人中心</span>
      </span>
      <recommendResume :modalTips="modalTips"></recommendResume>
    </div>


  </div>
</template>

<script>
import Bus from "@/assets/event-bus.js";
import RecommendResume from "./RecommendResume";

export default {
  name: "WriteIdeHeader",
  data() {
    return {
      showTip:false,
      modalTips:false
    };
  },
  components: {
    RecommendResume
  },
  methods: {
    closeTips(){
      this.showTip= false;
    },
    getMOre(){
      console.log(3)
      this.modalTips = true
      // 点击多主题展示的时候，需要挑选三个模板进行保存
      // 直接在recommendResume引入三个模板就行了
    },
    showMoreResumes(){
       Bus.$on("showMoreResume",()=>{
       this.showTip = true
      });
    },
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
      this.$router.push({ name: "myResume" });
    },

    // 下载
    downImg() {
      this.axios
        .post("resumes/downImg", {
          name: "截图1",
          headers: { "content-type": "multipart/form-data" }
        })
        .then(res => {
          if (res.data.status == "0") {
            // 下载功能
            var a = document.createElement("a");
            a.download = "截图1";
            // 设置地址
            a.href = res.data.msg;
            a.click();
          }
        })
        .catch(err => {});
    }
  },
  watch: {},

  mounted() {
    this.showMoreResumes();
     Bus.$on("closeModel",(data)=>{
       this.modalTips = data
     })
   
    
  },
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
.tips-content{
    position: absolute;
     left:685px;
     top: 45px;

  }
  .tips-content::after{
    display: block;
    content: "";
    height: 0;
    width:0;
    visibility: hidden;
    clear: both;
  }


</style>
