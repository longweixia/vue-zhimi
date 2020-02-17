<template>
  <div class="jm-template">
    <Row>
      <!-- {{modalSkill}} -->
      <!-- 左侧区域 -->
      <skillModal :modalSkills="modalSkill"  v-on:changeSkillModel="changeSkillModel" />
      <baseInfoModel :modalSkills="modalBaseInfo"  v-on:changeSkillModel="changeSkillModel" />
      <Col class="resume-left" span="8">
        <!-- 头像 -->
        <Row class="jm-headImg">
          <div
            :class="isHeadImg ? 'jm-headImg-lineIs' : ''"
            class="jm-headImg-line"
            @mouseenter="enter"
            @mouseleave="leave"
          >
            <div class="jm-upload-padding">
              <Icon
                v-show="isHeadImg"
                class="jm-head-icon"
                size="20"
                type="md-settings"
              />
              <jmUploadImg />
            </div>
          </div>
        </Row>
        <!-- 基本信息 -->
        <Row>
          <div
            class="jm-baseInfo"
            :class="isBase ? 'jm-headImg-lineIs' : ''"
            @mouseenter="enterBase"
            @mouseleave="leaveBase"
          >
            <Icon 
            @click="displaybaseModel"
              v-show="isBase"
              class="jm-head-icon"
              size="20"
              type="md-create"
            />
            <Row
              class="jm-age"
              v-for="(item, index) in baseInfoList"
              :key="index"
            >
              <Icon :type="item.type" />
              <span class="jm-baseText">{{ item.baseText }}</span>
            </Row>
          </div>
        </Row>
        <!-- 技能特长 -->
        <Row>
          <!-- mouseenter在Row中不生效，需要放在div中 -->
          <div
            class="jm-baseInfo"
            :class="isSkill ? 'jm-headImg-lineIs' : ''"
            @mouseenter="enterSkill"
            @mouseleave="leaveSkill"
          >
            <Icon @click="displaySkillModel"
              v-show="isSkill"
              class="jm-head-icon"
              size="20"
              type="md-create"
            />
            <Row class="jm-skill-title">
              <Icon size="25" type="md-checkbox-outline" />
              <span>技能特长</span></Row
            >
            <Row
              class="jm-age"
              v-for="(item, index) in baseInfoList"
              :key="index"
            >
              <Icon :type="item.type" />
              <span class="jm-baseText">{{ item.baseText }}</span>
            </Row>
          </div>
        </Row>
      </Col>
      <!-- 右侧区域 -->
      <Col span="16" class="resume-right"> 
      <!-- 名字和介绍 -->
      <Row>
        <!-- 名字 -->
        <Row>
        <Input class="jm-input" size="large" v-model="jmName" placeholder="请输入你的大名" clearable style="width: 200px" />
      </Row>
      <!-- 介绍 -->
      <Row>
        
      </Row>
      </Row>
      </Col>
    </Row>
  </div>
</template>

<script>
import jmUploadImg from "@/components/UploadImg";
import skillModal from "./SkillModal";
import baseInfoModel from "./BaseInfoModel";
export default {
  name: "WriteResumeTemplate3",
  components: {
    jmUploadImg,
    skillModal,
    baseInfoModel
  },
  data() {
    return {
      isHeadImg: false, //是否显示头像编辑框
      modalSkill:false,//默认技能弹窗不显示
      modalBaseInfo:false,//默认基本信息弹窗不显示
      baseInfoList: [
        //基本信息
        {
          type: "ios-contact",
          baseText: "年龄",
          inputText: ""
        },
        {
          type: "md-briefcase",
          baseText: "工作年限",
          inputText: ""
        },
        {
          type: "ios-call",
          baseText: "联系电话",
          inputText: ""
        },
        {
          type: "ios-mail",
          baseText: "电子邮箱",
          inputText: ""
        }
      ],
      isBase: false, //是否显示base编辑框
      isSkill: false, //是否显示base编辑框
      jmName:"龙伟",//简历名字
    };
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
    },
    // 鼠标悬浮基本信息
    enterBase() {
      this.isBase = true;
    },
    //鼠标离开基本信息
    leaveBase() {
      this.isBase = false;
    },
    // 鼠标悬浮技能特长
    enterSkill() {
      this.isSkill = true;
    },
    //鼠标离开技能特长
    leaveSkill() {
      this.isSkill = false;
    },
    // 显示技能弹窗
    displaySkillModel(){
      this.modalSkill = true;
    },
    // 显示基本信息弹窗
    displaybaseModel(){
      this.modalBaseInfo = true;
    },
    // 关闭技能弹窗，基本信息弹窗
    changeSkillModel(data) {
      this.modalSkill = false;
      this.modalBaseInfo = false;
    }
  },
  mounted() {},
  created() {}
};
</script>


<style lang="less" scoped>
 /deep/.ivu-input{
      border: none!important;
    }
// 悬浮显示头像图片编辑框
.jm-headImg-lineIs {
  border: 1px dashed #00c091 !important;
}
.jm-head-icon {
  position: absolute;
  top: 0;
  right: 0;
  color: #fff;
  background: #00c091;
}
body {
  min-width: 1240px;
}
.jm-template {
  .resume-left {
    width: 270px;
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
      .jm-upload-padding {
        background: #f5f7f9b7;
        padding: 3px;
      }
    }
  }

  // 基本信息
  .jm-baseInfo {
    padding: 20px 0 20px 4px;
    width: 210px;
    color: #fff;
    font-size: 14px;
    border: 1px dashed transparent;
    .jm-age {
      height: 24px;
      line-height: 24px;
      .jm-baseText {
        margin-left: 5px;
      }
    }
  }
  // 技能
  .jm-skill-title{
    font-size: 20px; 
    font-weight: bold;
  }
}
// 右侧信息
.resume-right{
  padding:10px 30px; 
  .ivu-input{
      border: none!important;
    }

}

</style>
