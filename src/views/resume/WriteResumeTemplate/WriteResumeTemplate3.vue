<template>
  <div class="jm-template">
    <Row>
      <!-- 左侧区域 -->
      <Col class="resume-left" span="8">
        <Row class="jm-headImg">
          <div :class="isHeadImg?'jm-headImg-lineIs':''" class="jm-headImg-line" @mouseenter="enter" @mouseleave="leave">
            <div class="jm-upload-padding">
                <Icon v-show="isHeadImg" class="jm-head-icon" size="20" type="md-settings" />
              <jmUploadImg />
            </div>
          </div>
        </Row>
      </Col>
      <!-- 右侧区域 -->
      <Col span="16"> </Col>
    </Row>
  </div>
</template>

<script>
import jmUploadImg from "@/components/UploadImg";
export default {
  name: "WriteResumeTemplate3",
  data() {
    return {
        isHeadImg:false,//是否显示头像编辑框
    };
  },
  components: {
    jmUploadImg
  },
  watch: {},
  methods: {
    // 鼠标悬浮头像
    enter() {
      this.isHeadImg = true;
    },
    //鼠标离开头像
    leave() {
       this.isHeadImg = false;
    }
  },
  mounted() {},
  created() {}
};
</script>

<style lang="less" scoped>
.jm-template {
  .resume-left {
    background: #254665;
    padding: 10px 30px;
  }
  //   头像
  .jm-headImg {
    text-align: center;
    padding: 10px 20px;
    .jm-headImg-line {
         position: relative;
      border: 1px solid #254665;
      padding: 20px;
      padding-bottom: 15px;
      .jm-upload-padding{
         
          background: #f5f7f9b7;
          padding:3px;
          .jm-head-icon{
              position: absolute;
              top:0;
              right: 0;
              color:#fff;
              background: #00c091;
          }
      }
    }
    // 悬浮显示头像图片编辑框
    .jm-headImg-lineIs{
        border: 1px dashed #00c091;
    }
  }
}
</style>
