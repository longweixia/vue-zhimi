<template>
  <div class="jm-template" id="code">
    <!-- 姓名和介绍 -->

    <div class="jm-base-name">
      <div
        style="position: relative;"
        class="jm-defult-line"
        :class="isBaseLine == 'name' ? 'jm-base-linehover0' : ''"
        @mouseenter="enterBase('name')"
        @mouseleave="leaveBase('name')">
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
    <!-- 年龄等基本信息 -->
    <!-- 头像 -->
    <div class="jm-head-pic">
      <headContent
        :formData="formData"
        :showHeadImg="showHeadImg"
      ></headContent>
    </div>
    <!-- isBaseLine=='age'这个判断优秀，减少新建不同的变量 -->
    <div class="jm-base-age">
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
        <span class="jm-age" v-for="(item, index) in baseInfoList" :key="index">
          <Icon class="jm-base-icon" :type="item.type" />
          <span class="jm-baseText" v-if="!item.inputText">{{
            item.baseText
          }}</span>
          <span class="jm-baseText" v-if="item.inputText">{{
            item.inputText
          }}</span>
          <span class="jm-border" v-if="index !== 3"></span>
        </span>
      </span>
    </div>
    <!-- 求职意向，教育背景等模块 -->
    <div>
      <mainContent :formData="formData"></mainContent>
    </div>
    <!-- 弹窗区域 -->
    <baseInfoModel
      :modalSkills="modalBaseInfo"
      :baseInfoList="baseInfoList"
      :baseObjC="baseObjC"
      v-on:changeSkillModel="changeSkillModel"
      v-on:saveBaseInfo="saveBaseInfo"
    />
  </div>
</template>

<script>
import jmUploadImg from "@/components/UploadImg";
import headContent from "@/components/HeadContent";
import baseInfoModel from "./BaseInfoModel";
import Bus from "@/assets/event-bus.js";
import mainContent from "./common/MainContent";
export default {
  name: "Template4",
  components: {
    jmUploadImg,
    baseInfoModel,
    headContent,
   mainContent
  },
  data() {
    return {
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
      },
      
    };
  },
  
  watch: {},
  methods: {
    // 基本信息相关
    // 关闭基本信息弹窗
    changeSkillModel(data) {
      // this.modalSkill = false;
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
    // // 确定日期
    // confirmDate() {
    //   this.jmDate = "jm-date";
    // },
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
    },
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
      console.log(data,"data")
      this.formData = data[0];
      this.baseInfoList = data[1];
      this.baseObjC=data[2]
    });

 
  },
  //  // 解决$on接收多次的问题
  // beforeDestroy(){
  //   Bus.$off("saveContentss")
  // }
};
</script>

<style lang="less" scoped>
.hasFocus /deep/textarea {
  resize: none;
}
.jm-template {
  position: relative;
  margin-bottom: 40px;
  background: #fff;
}
.jm-head-icon {
  position: absolute;
  top: 0;
  right: 0;
  color: #fff;
  background: #00c091;
  margin: 5px;
  z-index: 1;
  cursor: pointer;
}
.jm-base-name {
  position: relative;
  padding: 20px;
  padding-right: 200px;
  padding-bottom: 10px;
  background: #6b4b24;
  color: #fff;

  /deep/.ivu-input {
    border: none;
    color: #fff;
    background: #6b4b24;
  }
  .jm-name {
    /deep/.ivu-input {
      color: #fff;
      font-size: 30px;
    }
  }
}
.jm-base-linehover {
  border: 1px dashed #00c091;
}

.jm-base-age {
  height: 100px;
  line-height: 100px;
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 10px;
  padding-bottom: 10px;

  .jm-age-content {
    position: relative;
    padding: 10px;
    padding-right: 170px;
    /deep/.ivu-input {
      border: none;
      // color:#fff;
      // background: #6b4b24;
    }
  }
}



//基本信息
.jm-defult-line {
  border: 1px dashed transparent;
}
.jm-base-linehover0 {
  border: 1px dashed #00c091;
}
.jm-age {
  color: #747474;
  position: relative;
  height: 24px;
  line-height: 24px;
  .jm-baseText {
    margin-left: 5px;
  }
  .jm-base-icon {
    position: absolute;
    top: 2px;
    left: -12px;
  }
  .jm-border {
    border: 1px solid #747474;
    margin-left: 8px;
    margin-right: 20px;
  }
}
// 名字
.right-name {
  width: calc(100% - 45px);
  margin: 5px 40px 10px 5px;
  font-size: 30px;
}
.input-introduce {
  width: calc(100% - 20px);
  margin-left: 5px;
  margin-bottom: 5px;
  // 去掉textarea右下角的三角形
  /deep/ textarea {
    resize: none;
  }
}
// 头像
.jm-head-pic {
  position: absolute;
  z-index: 100;
  right: 10px;
  top: 10px;
}
</style>
