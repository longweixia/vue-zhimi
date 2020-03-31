<template>
  <div class="jm-template" id="code">
    <!-- 表格区，姓名和介绍 -->
    <div class="resume-top">
      <!-- 头像 -->
      <div class="resume-head">
        <headContent
          :formData="formData"
          :showHeadImg="showHeadImg"
        ></headContent>
      </div>
      <!-- 名字 -->
      <div class="resume-name">
        <div class="jm-base-name">
          <div
            style="position: relative;"
            class="jm-defult-line"
            :class="isBaseLine == 'name' ? 'jm-base-linehover0' : ''"
            @mouseenter="enterBase('name')"
            @mouseleave="leaveBase('name')"
          >
            <Icon
              v-show="isBaseLine == 'name'"
              class="jm-head-icon"
              size="20"
              type="md-settings"
              @click="displayModelBase('name')"
            />
            <div class="jm-name">
              <Input
                v-model="formData.name"
                placeholder="你的名字"
                clearable
                class="right-name"
              />
            </div>
            <div v-if="formData.showDescribe" class="jm-name-introduce">
              <Input
                v-model="formData.wordDescribe"
                placeholder="一句话介绍自己，告诉HR为什么选择你而不是别人"
                clearable
                autosize
                type="textarea"
                class="input-introduce"
              />
            </div>
          </div>
        </div>
      </div>
      <!-- 年龄基本信息 -->
      <div class="resume-name">
        <div class="jm-base-name">
          <span
            @mouseenter="enterBase('age')"
            @mouseleave="leaveBase('age')"
            class="jm-age-content jm-defult-line"
            :class="isBaseLine == 'age' ? 'jm-base-linehover0' : ''"
          >
            <!-- 基本信息 -->
            <Icon
              class="jm-head-icon"
              @click="displayModelBase('name')"
              v-show="isBaseLine == 'age'"
              size="20"
              type="md-create"
            />
            <div>
              <div class="age-row">
                <span class="age-left"> 年龄：</span>
                <span class="age-right"> 年龄：</span>
              </div>
              <div class="age-row float-r">
                <span class="age-left"> 年龄：</span>
                <span class="age-right"> 年龄：</span>
              </div>
            </div>

            <div>
              <div class="age-row">
                <span class="age-left"> 年龄：</span>
                <span class="age-right"> 年龄：</span>
              </div>
              <div class="age-row float-r">
                <span class="age-left"> 年龄：</span>
                <span class="age-right"> 年龄：</span>
              </div>
            </div>
          </span>
        </div>
      </div>
    </div>
    <!-- 求职模块 -->
    <div class="resume-bottom">
      <div class="jobIntention">
        <div class="jobIntention-text">求职意向</div>
        <div class="jobIntention-content">
          <jobIntention
            :themeList="jobThemeList"
            themeFlag="jobIntention"
            key="1"
            :jobIntentionLists="jobIntentionList"
            name="jobIntention"
            v-on:savaJobIntention="savaJobIntention"
            title=""
          >
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
          </jobIntention>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import jmUploadImg from "@/components/UploadImg";
import headContent from "@/components/HeadContent";
import baseInfoModel from "./BaseInfoModel";
import Bus from "@/assets/event-bus.js";
import mainContent from "./common/MainContent";
import jobIntention from "./common/JobIntention";
export default {
  name: "Template4",
  components: {
    jmUploadImg,
    baseInfoModel,
    headContent,
    mainContent,
    jobIntention
  },
  data() {
    return {
      jobThemeList: {}, //求职意向主题数据
      eduThemeList: {}, //教育背景主题数据
      workThemeList: {}, //工作主题数据
      ThemeAppraiseList: {}, //评价主题数据
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
      textWork1: "",
      isBaseLine: "", //baseLine对应悬浮模板的名称
      name: "",
      introduce: "",
      eduText: "",
      // jmDate: "jm-date", //是否显示日期选择框的笑图标
      eduDate: "",
      eduschool: "",
      eduMajor: "",
      workDate: "",
      workName: "",
      workMajor: "",
      workText: "",
      project: "", //项目
      showHeadImg: true, //是否显示头像
      selfEvaluation: "", //自我评价
      inFocus: false, //textarea是否在聚焦
      // 基本信息弹窗
      modalBaseInfo: false, //默认基本信息弹窗不显示
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
      baseObjC: {}, //传递获取接口的数据到基本数据弹窗的数据
      formData: {
        showDescribe: true //默认显示描述
      }
    };
  },
  props: ["showFind"],
  watch: {},
  methods: {
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
      // this.postMainDatas();
    },
    transformImage() {
      let doms = document.getElementById("code");
      this.common.transformImage(doms).then(dataUrl => {
        this.$router.push({ name: "preview", params: { dataUrl: dataUrl } });
      });
    },
    // 基本信息相关
    // 关闭基本信息弹窗
    changeSkillModel(data) {
      this.modalBaseInfo = false;
    },
    // 弹出基本信息框
    displayModelBase(name) {
      if (name == "name") {
        this.modalBaseInfo = true;
      }
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
        if (data.headPic == "显示") {
          this.showHeadImg = true;
        } else if (data.headPic == "隐藏") {
          this.showHeadImg = false;
        }
        this.formData = data;
      }
    },
    // 鼠标悬浮头像
    enterBase(name) {
      this.isBaseLine = name;
    },
    //鼠标离开头像
    leaveBase(name) {
      this.isBaseLine = "";
    },
    // 输入域聚焦
    focusInput() {
      console.log(0);
      this.inFocus = true;
    },
    //输入域失去焦点
    blurInput() {
      console.log(1);
      this.inFocus = false;
    }
  },
  mounted() {
    //隐藏还是显示头像
    Bus.$on("getShowHeadImg", value => {
      if (value == "显示") {
        this.showHeadImg = true;
      } else if (value == "隐藏") {
        this.showHeadImg = false;
      }
    });
    // 获取头像的数据
    Bus.$on("postPhotoBase64", ImgBase64 => {
      this.formData.ImgBase64 = ImgBase64;
    });

    // 获取基本信息数据
    Bus.$on("getFormData", data => {
      console.log(data, "data");
      this.formData = data[0];
      this.baseInfoList = data[1];
      this.baseObjC = data[2];
    });

    Bus.$on("previews", () => {
      this.transformImage();
    });
  }
  //  // 解决$on接收多次的问题
  // beforeDestroy(){
  //   Bus.$off("saveContentss")
  // }
};
</script>

<style lang="less" scoped>
.jm-template {
  height: 1160px;
  min-height: 1160px;
  background: #fff;
  position: relative;
  width: 820px;
  box-sizing: border-box;
  .resume-top {
    position: relative;
    padding: 128px 46px 25px;
    background: #fff;
    .resume-head {
      width: 174px;
      height: 200px;
      position: absolute;
      right: 36px;
      bottom: 1px;
      top: 128px;
      right: 30px;
      border: 1px solid #292929;
      margin: -1px;
      border-radius: 0;
    }
    .resume-name {
      border: 1px solid #292929;
      border-bottom: none;
      margin: -1px;
      margin-right: 174px;
      border-radius: 0;
      height: 85px;
      width: 573px;
      color: #000;
      .jm-base-name {
        position: relative;
        /deep/ .ivu-input {
          border: none;
        }
        .jm-name {
          /deep/ .ivu-input {
            font-size: 30px;
          }
          .right-name {
            width: calc(100%-45px);
            margin: 5px 40px 10px 5px;
            font-size: 30px;
          }
        }
        // 年龄
        .jm-age-content{
          height: 112px;
          display: block;
          border-bottom: 1px solid #292929;
          border-left: 1px solid #292929;
          .age-row{
            width: 50%;
            height: 40px;
            border: 1px solid #292929;
            margin-left: -1px!important;
            margin-top: -1px;
            position: relative;
            display: inline-block;
            float: left;
            border-left: 0;
            .age-left{
              text-align: center;
              width: 84px;
              display: inline-block;
              padding-right: 8px;
              margin-right: 2px;
              line-height: 38px;
              padding-left: 5px;
              border-right:  1px solid #292929;
              border-left: none;
            }
            .age-right{
              border-right:0;
              display: inline-block;
              text-align: center;
            }
          }
          .float-r{
            float: right;
            border-right:0;
          }

        }
      }
    }
    .resume-age-content{
      border-left: none;
    }
  }
  // 求职模块
  .resume-bottom{
    margin-left: 9px;
    width: 818px;
    padding-right: 36px;
    padding-left: 36px;
    .jobIntention{
      position: relative;
      border-radius: 0;
      border:  1px solid #292929;
      background: #fff;
      color: #747474;
      height: 100%;
      .jobIntention-text{
        height: 100%;
        width: 83px;
        border-right:  1px solid #292929;
        padding: 0 16px;
        font-size: 20px;
        word-break: break-word;
        font-weight: bold;
        display: inline-block;
        text-align: justify;
        text-align-last: justify;
        vertical-align: middle;
      }
      .jobIntention-content{
        display: inline-block;
        width: 657px;
        .jobList{
          width: 25%;
          display: inline-block;
          padding: 20px 5px;
          .jobIcon{
            color:#747474;
            margin-top: -2.5px;
          }
          .jobText{
            color: #747474;
            font-size: 14px;
          }
        }
      }
    }
  }
  .resume-top::before{
    content: "个人简历";
    display: block;
    position: absolute;
    top: 40px;
    left: 0;
    right: 0;
    line-height: 1.2;
    font-size: 36px;
    text-align: center;
  }
}
.jm-base-linehover{
  border: 1px dashed #00c091;

}
.jm-head-icon{
  position: absolute;
  top: 0;
  right: 0;
  color: #fff;
  background: #00c091;
  margin: 5px;
  z-index: 1;
  cursor: pointer;
}
// /deep/ .textarea{

// }
 /deep/textarea {
  resize: none;
}
/deep/ .ivu-input:focus{
box-shadow: none;
background: #eaeaea;
border: none;
}
// .jm-template {
//   width: 814px;
//   margin: 0 auto;
//   position: relative;
//   margin-bottom: 40px;
//   background: #fff;
// }
// .jm-head-icon {
//   position: absolute;
//   top: 0;
//   right: 0;
//   color: #fff;
//   background: #00c091;
//   margin: 5px;
//   z-index: 1;
//   cursor: pointer;
// }
// .jm-base-name {
//   position: relative;
//   padding: 20px;
//   padding-right: 200px;
//   padding-bottom: 10px;
//   // background: #6b4b24;
//   color: #fff;

//   /deep/.ivu-input {
//     border: none;
//     color: #fff;
//     // background: #6b4b24;
//   }
//   .jm-name {
//     /deep/.ivu-input {
//       color: #fff;
//       font-size: 30px;
//     }
//   }
// }
// .jm-base-linehover {
//   border: 1px dashed #00c091;
// }

// .jm-base-age {
//   height: 100px;
//   line-height: 100px;
//   margin-left: 20px;
//   margin-right: 20px;
//   margin-top: 10px;
//   padding-bottom: 10px;

//   .jm-age-content {
//     position: relative;
//     padding: 10px;
//     padding-right: 170px;
//     /deep/.ivu-input {
//       border: none;
//       // color:#fff;
//       // background: #6b4b24;
//     }
//   }
// }

// //基本信息
// .jm-defult-line {
//   border: 1px dashed transparent;
// }
// .jm-base-linehover0 {
//   border: 1px dashed #00c091;
// }
// .jm-age {
//   color: #747474;
//   position: relative;
//   height: 24px;
//   line-height: 24px;
//   .jm-baseText {
//     margin-left: 5px;
//   }
//   .jm-base-icon {
//     position: absolute;
//     top: 2px;
//     left: -12px;
//   }
//   .jm-border {
//     border: 1px solid #747474;
//     margin-left: 8px;
//     margin-right: 20px;
//   }
// }
// // 名字
// .right-name {
//   width: calc(100% - 45px);
//   margin: 5px 40px 10px 5px;
//   font-size: 30px;
// }
// .input-introduce {
//   width: calc(100% - 20px);
//   margin-left: 5px;
//   margin-bottom: 5px;
//   // 去掉textarea右下角的三角形
//   /deep/ textarea {
//     resize: none;
//   }
// }
// // 头像
// .jm-head-pic {
//   position: absolute;
//   // z-index: 100;
//   right: 10px;
//   top: 10px;
// }
</style>
