<template>
  <!-- 简历模板3右侧模块 -->
  <div
    class="jm-job"
    :class="isBaseLine ? 'jm-base-linehover0' : ''"
    @mouseenter="enter(name)"
    @mouseleave="leave(name)"
  >
    <Icon
      v-show="isBaseLine"
      @click="displayModelBase"
      class="jm-head-icon"
      size="20"
      type="md-settings"
    />
    <!-- 教育背景的按钮-->
    <Icon
      v-show="isIconAdd"
      @click="addEdu"
      class="jm-add-icon"
      size="20"
      type="ios-add-circle-outline"
    />
    <Row>
      <Col>
        <Icon style="margin-top:3px;" size="25" type="md-list-box" />
        <div class="title">
          <Input class="title-row" v-model="title" />
        </div>
      </Col>
    </Row>
    <!-- 求职意向模块 -->
    <slot name="slotRight"></slot>
    <!-- 教育背景模块 -->
    <!-- <slot name="eduction"></slot> -->
    <!-- 教育背景模块 -->
    <!-- <slot name="experience"></slot> -->
    <!-- 教育背景模块 -->
    <!-- <slot name="selfEvaluation"></slot> -->
    <!-- 求职意向弹窗 -->
    <modal3
      :modalSkills="modalSkills"
      v-on:savaMsg="savaMsg"
      v-on:changeSkillModel="changeSkillModel"
      title="编辑求职意向"
    >
      <div class="jm-job" slot="jobModal">
        <Row class="jm-row">
          <Row>意向职位</Row>
          <Select v-model="JobIntentionList.choseJob" style="width:200px">
            <Option
              v-for="(item, index) in choseJobList"
              :key="index.value"
              :value="item.label"
            >
              {{ item.label }}
            </Option>
          </Select>
        </Row>
        <Row class="jm-row">
          <Row>意向城市</Row>
          <Select v-model="JobIntentionList.city" style="width:200px">
            <Option
              v-for="(item, index) in cityList"
              :key="index.value"
              :value="item.label"
            >
              {{ item.label }}
            </Option>
          </Select>
        </Row>
        <Row class="jm-row">
          <Row>工作经验</Row>
          <Select v-model="JobIntentionList.entryTime" style="width:200px">
            <Option
              v-for="(item, index) in entryTimeList"
              :key="index.value"
              :value="item.label"
            >
              {{ item.label }}
            </Option>
          </Select>
        </Row>
        <Row class="jm-row">
          <Row>意向薪资</Row>
          <Select
            @on-change="choseSalarys"
            v-model="JobIntentionList.salary0"
            style="width:80px"
          >
            <Option
              v-for="(item, index) in salaryList0"
              :key="index.value"
              :value="item.value"
            >
              {{ item.label }}
            </Option>
          </Select>
          ~
          <Select v-model="JobIntentionList.salary1" style="width:80px">
            <Option
              v-for="(item, index) in salaryList1"
              :key="index.value"
              :value="item.value"
            >
              {{ item.label }}
            </Option>
          </Select>
        </Row>
      </div>
    </modal3>
  </div>
</template>
<script>
import modal3 from "./Modal3";
export default {
  name: "rightContent",
  props: ["name", "title"], //基本信息的弹窗标识
  components: {
    modal3
  },
  data() {
    return {
      // 表单输入框的值
      isBaseLine: false, //右边编辑框是否显示
      isIconAdd: false, //是否显示教育背景悬浮后的添加按钮
      modalSkills: false, //是否显示编辑框
      formData: {
        name: "",
        birthday: "",
        age: 0, //年龄
        tel: "",
        mail: "",
        work: "", //工作年限
        headPic: "", //是否显示头像
        wordDescribe: "", //一句话描述
        showDescribe: true //是否开启隐藏按钮
      },
      choseJobList: [
        {
          value: "qd",
          label: "前端"
        }
      ],

      cityList: [
        {
          value: "bj",
          label: "北京"
        }
      ],

      entryTimeList: [
        {
          value: "jt",
          label: "今天"
        }
      ],

      salaryList0: [
        { value: 0, label: "10k" },
        { value: 1, label: "11k" },
        { value: 2, label: "12k" },
        { value: 3, label: "13k" },
        { value: 4, label: "14k" },
        { value: 5, label: "15k" },
        { value: 6, label: "16k" },
        { value: 7, label: "17k" },
        { value: 8, label: "18k" },
        { value: 9, label: "19k" },
        { value: 10, label: "20k" },
        { value: 11, label: "21k" },
        { value: 12, label: "22k" },
        { value: 13, label: "23k" },
        { value: 14, label: "24k" },
        { value: 15, label: "25k" }
      ],
      // 求职意向的值
      JobIntentionList: {
        choseJob: "",
        city: "",
        entryTime: "",
        salary0: "",
        salary1: ""
      },
      salaryList1: [],
      // 工作年限数组
      workYearList: ["1年", "2年", "3年"],
      // 头像状态数组
      headPicList: ["显示", "隐藏"]
    };
  },
  watch: {},
  methods: {
    // modal3传过来的，点击取消
    changeSkillModel(value) {
      this.modalSkills = false;
    },
    // 点击取消
    cancelModel() {
      this.$emit("changeSkillModel", false);
    },
    // 点击保存
    save() {
      this.cancelModel();
    },
    // 通过传过来的name标志来显示不同的按钮
    enter(name) {
      this.isBaseLine = true;
      if (name == "edu") {
        this.isIconAdd = true;
      }
    },
    leave(name) {
      this.isBaseLine = false;
      if (name == "edu") {
        this.isIconAdd = false;
      }
    },
    // 显示编辑框
    displayModelBase() {
      this.modalSkills = true;
    },
    // 改变薪资
    choseSalarys() {
      this.salaryList1 = this.salaryList0.slice(
        this.JobIntentionList.salary0 + 1
      );
    },
    // 保存求职意向信息,传递给WriteResumeTemplate3.vue
    savaMsg() {
      this.$emit("savaJobIntention", this.JobIntentionList);
    },
    // 点击教育背景的添加按钮
    addEdu() {
      this.$emit("addEdus");
    }
  }
};
</script>
 <style lang="less" scoped>
.jm-job {
  position: relative;
  border: 1px solid transparent;
  padding: 20px 5px;
  .jm-row {
    display: inline-block;
    width: 200px;
    margin-left: 40px;
    padding-bottom: 20px;
  }
  .jm-head-icon {
    position: absolute;
    top: 0;
    right: 0;
    color: #fff;
    background: #00c091;
  }
  .jm-add-icon {
    position: absolute;
    top: 0;
    right: 30px;
    color: #fff;
    background: #00c091;
    border-radius: 10px;
  }
  .title {
    width: 400px;
    display: inline-block;
    .title-row {
      border-bottom: 1px solid #254665;
      /deep/ .ivu-input {
        color: #254665;
        font-size: 20px;
        font-weight: bold;
      }
    }
  }
}
.jm-base-linehover0 {
  border: 1px dashed #00c091;
}
</style>