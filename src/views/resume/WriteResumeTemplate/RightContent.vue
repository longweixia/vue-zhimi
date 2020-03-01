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
    <!-- 主题按钮 -->
    <Icon
      v-show="isBaseLine"
      @click="changeTheme"
      class="jm-theme-icon"
      size="20"
      type="ios-color-fill"
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
       <div class="title">
              <!-- <Icon type="ios-wine" size="32"/> -->
              <div class="jm-title-top" :class="[themeList.textDirection]">
                <!-- 标题图标 -->
                <Icon size="30" style="display:inline-block" :type="themeList.icon" v-if="themeList.isIcon" />
                <!-- 标题前线 -->
                <span v-if="themeList.lineIcon" :class="themeList.lineLeft"></span>
               <!-- 标题前图标 -->
                <span v-if="themeList.lineIcon" class="line-icon-sides-left">
                     <Icon type="md-wine" />
                </span>
             <!-- 标题 -->
              <Input
                class="title-row"
                :class="themeList.lineIcon"
                v-model="title"
              />
              <!-- 标题后图标 -->
              <span v-if="themeList.lineIcon" class="line-icon-sides-right">
                     <Icon type="md-wine" />
              </span>
              <!-- 标题线 -->
               <span v-if="themeList.lineIcon"  :class="themeList.lineRight"></span>
              </div>
              <!-- <Icon type="ios-wine" /> -->
            </div>
      <!-- <Col>
        <Icon style="margin-top:3px;" size="25" type="md-list-box" />
        <div class="title">
          <Input class="title-row" v-model="title" />222
        </div>
      </Col> -->
    </Row>
    <!-- WriteResumeTemplate3的插槽 -->
    <slot name="slotRight"></slot>
    <!-- 求职意向弹窗 -->
    <modal3
      :modalShow="modalJob"
      flag="jobIntention"
      v-on:savaMsg="savaMsg"
      v-on:closeModel="closeModel"
      title="编辑求职意向">
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
    <!-- 换肤主题弹窗 -->
    <modal3
      :modalShow="modalTheme"
      flag="theme"
      v-on:savaMsg="savaMsg"
      v-on:closeModel="closeModel"
      title="更换样式">
      <div class="jm-job" slot="jobModal">
        <!-- <Row class="jm-row"> -->
       <theme3>

       </theme3>
         
        <!-- </Row> -->
      </div>
    </modal3>
  </div>
</template>
<script>
import Bus from "@/assets/event-bus.js";
import modal3 from "./Modal3";
import theme3 from "./Template3/Theme3";
export default {
  name: "rightContent",
  props: ["name", "title", "jobIntentionLists"], //基本信息的弹窗标识
  components: {
    modal3,
    theme3
  },
  data() {
    return {
      themeList:{},//主题数据
      // 表单输入框的值
      isBaseLine: false, //右边编辑框是否显示
      isIconAdd: false, //是否显示教育背景悬浮后的添加按钮
      modalJob: false, //是否求职意向弹窗
      modalTheme: false, //是否显示主题换肤弹窗
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
      salaryList1: [
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
      // 工作年限数组
      workYearList: ["1年", "2年", "3年"],
      // 头像状态数组
      headPicList: ["显示", "隐藏"]
    };
  },
  watch: {
    // 如果父元素传递过来的数组不实时更新，就加个监听
    jobIntentionLists: {
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.JobIntentionList.choseJob = this.jobIntentionLists[0].baseText;
          this.JobIntentionList.city = this.jobIntentionLists[1].baseText;
          this.JobIntentionList.entryTime = this.jobIntentionLists[2].baseText;
          // 拿到薪资中的数字，拆分成数组
          var numArr = this.jobIntentionLists[3].baseText.match(/\d+/g);
          this.JobIntentionList.salary0 = Number(numArr[0]) - 10;
          this.JobIntentionList.salary1 = Number(numArr[1]) - 10;
        }
      },
      deep: true
    }
  },
  methods: {
    // modal3传过来的，点击取消
    closeModel(value) {
      if (value == "jobIntention") {
        this.modalJob = false;
      } else if (value == "theme") {
        this.modalTheme = false;
      }
    },
    // 点击取消
    cancelModel() {
      this.$emit("closeModel", false);
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
      this.modalJob = true;
    },
    // 改变薪资
    choseSalarys() {
      this.salaryList1 = this.salaryList0.slice(this.JobIntentionList.salary0);
    },
    // 保存求职意向信息,传递给WriteResumeTemplate3.vue
    savaMsg() {
      this.$emit("savaJobIntention", this.JobIntentionList);
    },
    // 点击教育背景的添加按钮
    addEdu() {
      this.$emit("addEdus");
    },
    // 点击换肤按钮，切换主题
    changeTheme() {
      this.modalTheme = true;
    }
  },
  mounted(){
    this.closeModel("theme")
    // var that = this
    Bus.$on("closeTheme", () => {
      this.modalTheme = false
    })
       // 解决父组件多次传值的问题
    Bus.$off("saveTheme")
    // 点击主题的保存，传递过来主题数据
    Bus.$on("saveTheme", (themeList) => {
      console.log(themeList,"子")
      this.themeList = themeList
    })
      
  },
  
  // beforeDestroy(){
  //   Bus.$off("saveTheme")
  // }
};
</script>
<style lang="less" scoped>
.jm-job {
  position: relative;
  border: 1px solid transparent;
  // padding: 20px 5px;
  .jm-row {
    display: inline-block;
    // width: 200px;
    margin-left: 40px;
    padding-bottom: 20px;
  }
  // 右侧悬浮时的小按钮
  .jm-head-icon {
    z-index:100;
    position: absolute;
    top: 0;
    right: 0;
    color: #fff;
    background: #00c091;
  }
  .jm-add-icon {
    z-index:100;
    position: absolute;
    top: 0;
    right: 60px;
    color: #fff;
    background: #00c091;
    border-radius: 10px;
  }
  .jm-theme-icon {
    position: absolute;
    z-index:100;
    top: 0;
    right: 30px;
    color: #fff;
    background: #00c091;
    border-radius: 10px;
  }
  // .title {
  //   width: 400px;
  //   display: inline-block;
  //   .title-row {
  //     border-bottom: 1px solid #254665;
  //     /deep/ .ivu-input {
  //       width:100px;
  //       color: #254665;
  //       font-size: 20px;
  //       font-weight: bold;
  //     }
  //   }
  // }
}
.jm-base-linehover0 {
  border: 1px dashed #00c091;
}





 .title {
    width: 524px;
    // margin-top:-30px;
    // margin-left:30px;
    display: inline-block;
    .jm-title-top{
      display:inline-block;
      width:524px;
      position: relative;
    }
    // 标题下面的线，长线
    .line-bottom {
      border-bottom: 1px solid #254665;
    }
    // 标题下面的线，短线
    .line-bottom-sort {
      border-bottom: 1px solid #254665;
    }
  
    // input,标题文字
    .title-row {
      width: 100px;
      display: inline-block;
      
      // margin-left:212px;
      position: relative;
      /deep/ .ivu-input {
        color: #254665;
        font-size: 20px;
        font-weight: bold;
      }
    }
    // 文字方向
    .center {
     
        text-align: center;
      
    }
    .right {
        text-align: right;
    }
    .left {
        text-align: left;
    }
  }
  // 标题前后的线
  .both-sides-left{
    width:167px;
    display: inline-block;
    content: "";
    border-color: #254665;
    position: absolute;
    z-index: 100;
    // left: 0;
    // right: 172px;
    top: 50%;
    margin-top: -1px;
    border-bottom: 1px solid;
  }
  .both-sides-right{
    width:167px;
    display: inline-block;
    content: "";
    border-color: #254665;
    position: absolute;
    z-index: 100;
    // left: 0;
    right: 0;
    top: 50%;
    margin-top: -1px;
    border-bottom: 1px solid;
  }
  // .both-sides-left::after {
  //   width:172px;
  //   content: "";
  //   border-color: #254665;
  //   position: absolute;
  //   // left: 70%;
  //   right: 0;
  //   top: 50%;
  //   margin-top: -1px;
  //   border-bottom: 1px solid;
  // }


// 前后两线上的图标
.line-icon-sides-left{
  display: inline-block;
  margin-left:172px;
  text-align: center;
  width: 30px;
}
.line-icon-sides-right{
  display: inline-block;
  // margin-right:172px;
  text-align: center;
  width: 30px;
}
.jm-theme-hover{
  /deep/.ivu-input {
  border: none;
  // color: #fff;
background: #e0e0e0;
// opacity: .2;
}
}
.jm-theme-hover::before{
    content: "";
    position: absolute;
    top: -20px;
    left: -20px;
    width: 564px;
    height: 135px;
    background: #666;
    opacity: .2;
}
  .jm-save-btn {
    position: absolute;
      background-color: #00c190;
      color: white;
      border-radius: 4px;
      border: none;
      width: 60px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      vertical-align: middle;
      left:50%;
      margin-left: -30px;
      top: 50px;
      z-index: 1000;
      cursor: pointer;
    }
</style>