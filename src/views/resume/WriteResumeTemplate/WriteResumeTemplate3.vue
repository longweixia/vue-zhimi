<template>
  <div class="jm-template">
    <Row>
      <!-- {{modalSkill}} -->
      <!-- 左侧区域 -->
      <skillModal
        :modalSkills="modalSkill"
        :hasSkillLists="hasSkillList"
        v-on:changeSkillModel="changeSkillModel"
        v-on:saveSkill="saveSkill"
      />
      <baseInfoModel
        :modalSkills="modalBaseInfo"
        :baseInfoList="baseInfoList"
        :baseObjC="baseObjC"
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
            <vuedraggable class="wrapper">
              <rightContent
                key="1"
                :jobIntentionLists="jobIntentionList"
                v-on:savaJobIntention="savaJobIntention"
                title="求职意向">
                <div slot="slotRight">
                  <Row
                    class="jobList"
                    v-for="(item, index) in jobIntentionList"
                    :key="index"
                  >
                    <Icon :size="20" class="jobIcon" :type="item.type" />
                    <span class="jobText">{{ item.baseText }}</span>
                  </Row>
                </div>
              </rightContent>
              <!-- 教育背景 -->
              <rightContent
                :key="2"
                name="edu"
                v-on:addEdus="addEdus('edu')"
                title="教育背景">
                <div slot="slotRight">
                  <Row v-for="(item, index) in eduList" :key="index">
                    <Row>
                      <Col :span="12" class="jm-edu-col">
                        <Input
                          v-model="item.eduDate"
                          placeholder="请填写时间如:2016/08-2017/09"
                        />
                      </Col>
                      <Col :span="12" class="jm-edu-col">
                        <Input
                          v-model="item.schooName"
                          placeholder="学校名字"
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col :span="18" class="jm-edu-col">
                        <Input
                          v-model="item.majorName"
                          placeholder="请填写专业"
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col :span="18" class="jm-edu-col">
                        <Input
                          v-model="item.eduContent"
                          type="textarea"
                          :autosize="{ minRows: 2, maxRows: 5 }"
                          placeholder="请填写内容"
                        />
                      </Col>
                    </Row>
                  </Row>
                </div>
              </rightContent>
              <!-- 工作经验 -->
              <rightContent
                key="3"
                name="edu"
                v-on:addEdus="addEdus('experience')"
                title="工作经验">
                <div slot="slotRight">
                  <Row v-for="(item, index) in experienceList" :key="index">
                    <Row>
                      <Col :span="12" class="jm-edu-col">
                        <Input
                          v-model="item.date"
                          placeholder="请填写时间如:2016/08-2017/09"
                        />
                      </Col>
                      <Col :span="12" class="jm-edu-col">
                        <Input v-model="item.name" placeholder="公司名字" />
                      </Col>
                    </Row>
                    <Row>
                      <Col :span="18" class="jm-edu-col">
                        <Input
                          v-model="item.positionName"
                          placeholder="请填写职位"
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col :span="18" class="jm-edu-col">
                        <Input
                          v-model="item.content"
                          type="textarea"
                          :autosize="{ minRows: 2, maxRows: 5 }"
                          placeholder="请填写内容"
                        />
                      </Col>
                    </Row>
                  </Row>
                </div>
              </rightContent>
              <!-- 自我评价 -->
              <rightContent key="4" name="edu" title="自我评价">
                <div slot="slotRight">
                  <Row>
                    <Col class="jm-edu-col">
                      <Input
                        v-model="selfEvaluation"
                        type="textarea"
                        :autosize="{ minRows: 2, maxRows: 5 }"
                        placeholder="请填写内容"
                      />
                    </Col>
                  </Row>
                </div>
              </rightContent>
            </vuedraggable>
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
import Bus from "@/assets/event-bus.js";
import vuedraggable from "vuedraggable";
export default {
  name: "WriteResumeTemplate3",
  components: {
    jmUploadImg,
    skillModal,
    baseInfoModel,
    rightContent,
    vuedraggable
  },
  data() {
    return {
      // themeList:{},//主题数据
      baseObjC: {}, //传递获取接口的数据到基本数据弹窗的数据
      // resumeTemplateObj: {}, //当该模板之前有提交过时，
      // wirteIdeContent.vue会将之前的值传过来传递过来
      isHeadImg: false, //是否显示头像编辑框
      modalSkill: false, //默认技能弹窗不显示
      modalBaseInfo: false, //默认基本信息弹窗不显示
      isBase: false, //是否显示base编辑框
      isSkill: false, //是否显示技能编辑框
      isBaseLine: false, //右边是否显示基本信息编辑框
      // isBaseLine: false, //悬浮显示基本信息
      formData: {
        showDescribe: true //默认显示描述
      }, //基本信息弹窗传过来的数据
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
          name: "choseJob"
        },
        {
          type: "md-briefcase",
          baseText: "意向城市",
          name: "city"
        },
        {
          type: "ios-mail",
          baseText: "入职时间",
          name: "entryTime"
        },
        {
          type: "ios-call",
          baseText: "薪资要求",
          name: "salary"
        }
      ],
      // 教育背景数据
      eduList: [
        {
          eduDate: "",
          schooName: "",
          majorName: "",
          eduContent: ""
        }
      ],
      // 工作经验数据
      experienceList: [
        {
          date: "",
          dame: "",
          positionName: "",
          content: ""
        }
      ],
      // 自我评价
      selfEvaluation: ""
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
      console.log(data, "data=====");
      for (let item in data) {
        switch (item) {
          case "birthday":
            this.baseInfoList.find(item => item.baseText == "年龄").inputText =
              data.age + "岁";
            break;
          case "work":
            this.baseInfoList.find(
              item => item.baseText == "工作经验"
            ).inputText = data.work;
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
    },
    // 意向职位传过去的事件
    savaJobIntention(val) {
      this.jobIntentionList.find(item => item.name == "choseJob").baseText =
        val.choseJob;
      this.jobIntentionList.find(item => item.name == "city").baseText =
        val.city;
      this.jobIntentionList.find(item => item.name == "entryTime").baseText =
        val.entryTime;
      this.jobIntentionList.find(item => item.name == "salary").baseText =
        val.salary0 + 10 + "k ~ " + (val.salary1 + 10) + "k";
      console.log(this.jobIntentionList);
    },
    // 点击教育添加按钮
    addEdus(name) {
      if (name == "edu") {
        var objEdu = {
          eduDate: "",
          schooName: "",
          majorName: "",
          eduContent: ""
        };
        this.eduList.push(objEdu);
      }
      if (name == "experience") {
        var objExperience = {
          date: "",
          dame: "",
          positionName: "",
          content: ""
        };
        this.experienceList.push(objExperience);
      }
    }
  },
  mounted() {
    // 获取简历信息
    Bus.$on("getTemplatesResume", resumeTemplateObj => {
      var resumeTemplateObj = resumeTemplateObj.resumeTemplate[0].resumeContent;
      console.log(resumeTemplateObj, "====");
      // 组装基本数据，传递到基本数据弹窗
      this.baseObjC = {
        name: resumeTemplateObj.baseInfoList.name,
        birthday: resumeTemplateObj.baseInfoList.birthday,
        age: resumeTemplateObj.baseInfoList.age, //年龄
        tel: resumeTemplateObj.baseInfoList.tel,
        mail: resumeTemplateObj.baseInfoList.mail,
        work: resumeTemplateObj.baseInfoList.work, //工作年限
        headPic: resumeTemplateObj.baseInfoList.headPic, //是否显示头像
        wordDescribe: resumeTemplateObj.baseInfoList.wordDescribe, //一句话描述
        showDescribe: resumeTemplateObj.baseInfoList.showDescribe //是否开启隐藏按钮
      };
      // 获取数据，回填到表单
      (this.baseInfoList = [
        //基本信息
        {
          type: "ios-contact",
          baseText: "年龄",
          inputText: resumeTemplateObj.baseInfoList.age || ""
        },
        {
          type: "md-briefcase",
          baseText: "工作经验",
          inputText: resumeTemplateObj.baseInfoList.work || ""
        },
        {
          type: "ios-call",
          baseText: "电话",
          inputText: resumeTemplateObj.baseInfoList.tel || ""
        },
        {
          type: "ios-mail",
          baseText: "邮箱",
          inputText: resumeTemplateObj.baseInfoList.mail || ""
        }
      ]),
        (this.formData = resumeTemplateObj.baseInfoList);
      this.hasSkillList = resumeTemplateObj.SkillList;
      this.jobIntentionList = resumeTemplateObj.jobIntentionList;
      this.eduList = resumeTemplateObj.eduList;
      this.experienceList = resumeTemplateObj.experienceList;
      this.selfEvaluation = resumeTemplateObj.selfEvaluation;
    });
    // 点击保存按钮，提交填写好的简历
    Bus.$on("saveContents", () => {
      console.log(this.formData, "====");
      // 组装要提交的信息
      var content = {
        userName: localStorage.getItem("userName"), //简历名称
        hasCommonResume: false, //是否有基础简历的信息
        resumeTemplate: [
          //模板简历
          {
            TemplateId: 3, //模板ID
            resumeContent: {
              //简历内容
              baseInfoList: this.formData, //基本信息
              SkillList: this.hasSkillList, //技能特长
              jobIntentionList: this.jobIntentionList, //求职意向
              eduList: this.eduList, //教育背景
              experienceList: this.experienceList, //工作经验
              selfEvaluation: this.selfEvaluation //自我评价
            }
          }
        ]
      };

      this.axios
        .post("resumeTemplates/resumeTemplates", { content: content })
        .then(res => {
          if (res.data.status == "0") {
            this.$Message.success("保存成功");
          }
        })
        .catch(err => {
          console.log("err", err);
        });
    });
    //  // 解决父组件多次传值的问题
    // Bus.$off("saveTheme")
    // // 点击主题的保存，传递过来主题数据
    // Bus.$on("saveTheme", (themeList) => {
    //   console.log(themeList,"子")
    //   this.themeList = themeList
    // })
  },
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
    // height: 3480px;
    min-height: 1160px;
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
.jobList {
  width: 25%;
  display: inline-block;
  padding: 20px 5px;
  .jobIcon {
    color: #747474;
    margin-top: -2.5px;
  }
  .jobText {
    color: #747474;
    font-size: 14px;
  }
}
</style>
