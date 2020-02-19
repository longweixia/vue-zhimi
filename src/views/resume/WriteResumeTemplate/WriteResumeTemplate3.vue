<template>
  <div class="jm-template">
    <Row>
      <!-- {{modalSkill}} -->
      <!-- 左侧区域 -->
      <skillModal
        :modalSkills="modalSkill"
        v-on:changeSkillModel="changeSkillModel"
        v-on:saveSkill="saveSkill"
      />
      <baseInfoModel
        :modalSkills="modalBaseInfo"
        v-on:changeSkillModel="changeSkillModel"
        v-on:saveBaseInfo="saveBaseInfo"
      />
      <Col class="resume-left" span="8">
        <!-- 头像 -->
        <Row class="jm-headImg">
          <div
            :class="isHeadImg ? 'jm-headImg-lineIs' : ''"
            class="jm-headImg-line"
            @mouseenter="enter('headImg')"
            @mouseleave="leave('headImg')"
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
            @mouseenter="enter('base')"
            @mouseleave="leave('base')"
          >
            <Icon
              @click="displayModelBase"
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
              <span class="jm-baseText">{{ item.inputText }}</span>
            </Row>
          </div>
        </Row>
        <!-- 技能特长 -->
        <Row>
          <!-- mouseenter在Row中不生效，需要放在div中 -->
          <div
            class="jm-baseInfo"
            :class="isSkill ? 'jm-headImg-lineIs' : ''"
            @mouseenter="enter('skill')"
            @mouseleave="leave('skill')"
          >
            <Icon
              @click="displaySkillModel"
              v-show="isSkill"
              class="jm-head-icon"
              size="20"
              type="md-create"
            />
            <Row class="jm-skill-title">
              <Icon size="25" type="md-checkbox-outline" />
              <span>技能特长</span>
            </Row>

            <Row class="jm-skill-content">
              <i-Circle
                 :size="70" 
                v-for="(item, index) in hasSkillList"
                :key="index"
                class="jm-circle"
                :percent="item.skillNumber"
              >
                <span class="demo-Circle-inner" style="font-size:24px">{{
                  item.skillNumber
                }}</span>
                <span class="jm-circle-text">{{ item.name }}</span>
              </i-Circle>
            </Row>
          </div>
        </Row>
      </Col>
      <!-- 右侧区域 -->
      <Col span="16" class="resume-right">
        <!-- 名字和介绍 -->
        <Row class="jm-base-name">
          <!-- 名字 -->
          <div
            style="position: relative;"
            class="jm-defult-line"
            :class="isBaseLine ? 'jm-base-linehover0' : ''"
            @mouseenter="enter('baseRight')"
            @mouseleave="leave('baseRight')"
          >
            <Icon
              v-show="isBaseLine"
              @click="displayModelBase"
              class="jm-head-icon"
              size="20"
              type="md-settings"
            />
            <div class="jm-name">
              <Input
                v-model="formData.name"
                placeholder="你的名字"
                clearable
                style="width:94%;margin:5px 3%;font-size: 30px;"
              />
            </div>
            <div v-if="formData.showDescribe" class="jm-name-introduce">
              <Input
                v-model="formData.wordDescribe"
                placeholder="一句话介绍自己，告诉HR为什么选择你而不是别人"
                clearable
                style="width:94%;margin:5px 3%"
              />
            </div>
          </div>

          <!-- 介绍 -->
          <Row> 
            <!-- 求职意向 -->
            <rightContent title="求职意向">
              <div slot="jobIntention">
                <Row class="jobList" v-for="(item,index) in jobIntentionList" :key="index">
                  <Icon :size="20" class="jobIcon" :type="item.type" />
                  <span class="jobText">{{item.baseText}}</span>
                </Row>
              </div>
            </rightContent>
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
import rightContent from "./RightContent";
export default {
  name: "WriteResumeTemplate3",
  components: {
    jmUploadImg,
    skillModal,
    baseInfoModel,
    rightContent
  },
  data() {
    return {
      isHeadImg: false, //是否显示头像编辑框
      modalSkill: false, //默认技能弹窗不显示
      modalBaseInfo: false, //默认基本信息弹窗不显示
      isBase: false, //是否显示base编辑框
      isSkill: false, //是否显示技能编辑框
      isBaseLine: false, //右边是否显示基本信息编辑框
      // isBaseLine: false, //悬浮显示基本信息
      formData: {}, //基本信息弹窗传过来的数据
      hasSkillList: [], //传过来的技能数组
      baseInfoList: [
        //基本信息
        {
          type: "ios-contact",
          baseText: "年龄",
          inputText: ""
        },
        {
          type: "md-briefcase",
          baseText: "工作经验",
          inputText: ""
        },
        {
          type: "ios-call",
          baseText: "电话",
          inputText: ""
        },
        {
          type: "ios-mail",
          baseText: "邮箱",
          inputText: ""
        }
      ],
       jobIntentionList: [
        //求职意向项
        {
          type: "ios-contact",
          baseText: "意向岗位",
          inputText: ""
        },
        {
          type: "md-briefcase",
          baseText: "意向城市",
          inputText: ""
        },
        {
          type: "ios-call",
          baseText: "薪资要求",
          inputText: ""
        },
        {
          type: "ios-mail",
          baseText: "入职时间",
          inputText: ""
        }
      ]
    };
  },
  watch: {},
  methods: {
    // 鼠标悬浮
    enter(flag) {
      switch (flag) {
        case "headImg":
          this.isHeadImg = true;
          break;
        case "base":
          this.isBase = true;
          break;
        case "skill":
          this.isSkill = true;
          break;
        case "baseRight":
          this.isBaseLine = true;
          break;
      }
    },
    //鼠标离开
    leave(flag) {
      switch (flag) {
        case "headImg":
          this.isHeadImg = false;
          break;
        case "base":
          this.isBase = false;
          break;
        case "skill":
          this.isSkill = false;
          break;
        case "baseRight":
          this.isBaseLine = false;
          break;
      }
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
    displaySkillModel() {
      this.modalSkill = true;
    },
    // 显示基本信息弹窗
    displayModelBase() {
      this.modalBaseInfo = true;
    },
    // 关闭技能弹窗，基本信息弹窗
    changeSkillModel(data) {
      this.modalSkill = false;
      this.modalBaseInfo = false;
    },
    // 点击基本信息保存
    saveBaseInfo(data) {
      for (let item in data) {
        switch (item) {
          case "birthday":
            this.baseInfoList.find(item => item.baseText == "年龄").inputText =
              data.age + "岁";
            break;
          case "work":
            this.baseInfoList.find(item => item.baseText == "工作经验").inputText =
              data.work;
            break;
          case "tel":
            this.baseInfoList.find(item => item.baseText == "电话").inputText =
              data.tel;
            break;
          case "mail":
            this.baseInfoList.find(item => item.baseText == "邮箱").inputText =
              data.mail;
            break;
        }
        this.formData = data;
      }
    },
    // 点击技能保存
    saveSkill(data) {
      this.hasSkillList = data;
    }
  },
  mounted() {},
  created() {}
};
</script>


<style lang="less" scoped>
/deep/.ivu-input {
  border: none !important;
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
  .jm-skill-title {
    font-size: 20px;
    font-weight: bold;
  }
  .jm-skill-content {
    .jm-circle {
      width: 80px;
      margin: 20px 10px 30px 10px;
      .jm-circle-text {
        top: 60px;
        left: 10px;
        position: absolute;
      }
    }
  }
}
// 右侧信息
.resume-right {
  padding: 10px 30px;
  .ivu-input {
    border: none !important;
  }
}
.jm-base-name {
  position: relative;
  /* border: 1px solid #254665;*/
  padding: 20px;
  padding-bottom: 15px;
  // background: #6b4b24;
  // color: #fff;
  .jm-defult-line {
    border: 1px dashed transparent;
  }
  .jm-base-linehover0 {
    border: 1px dashed #00c091;
  }

  /deep/.ivu-input {
    border: none;
    // color: #fff;
    // background: #6b4b24;
  }
  .jm-name {
    /deep/.ivu-input {
      // color: #fff;
      font-size: 30px;
    }
  }
}
.jm-base-linehover {
  border: 1px dashed #00c091;
}
// 求职意向
.jobList{
  width:25%;
  display: inline-block;
  padding: 20px 5px;
  .jobIcon{
    color: #747474;
    margin-top: -2.5px;
  }
  .jobText{
    color: #747474;
    font-size: 14px;
  }
}
</style>
