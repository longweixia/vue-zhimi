<template>
  <!-- 简历模板3右侧模块 -->
    <div
            class="jm-job"
            :class="isBaseLine ? 'jm-base-linehover0' : ''"
            @mouseenter="enter"
            @mouseleave="leave"
          >
           <Icon
              v-show="isBaseLine"
              @click="displayModelBase"
              class="jm-head-icon"
              size="20"
              type="md-settings"
            />
            <Row>
              <Col>
               <Icon style="margin-top:-5px;"
              size="25"
              type="md-list-box"
            />
            <div class="title">{{title}}</div>
            </Col>
            </Row>
            <!-- 求职意向模块 -->
            <slot name="jobIntention"></slot>
            <!-- 求职意向弹窗 -->
            <modal3 :modalSkills="true" title="编辑求职意向">
              <div class="jm-job" slot="jobModal">
                <Row class="jm-row">
                  <Row>意向职位</Row>
                  <Select v-model="choseJob" style="width:200px">
                    <Option v-for="(item,index) in choseJobList" :key="index.value" :value="item.value">
                      {{item.label}}
                    </Option>
                  </Select>
                </Row>
                <Row class="jm-row">
                  <Row>意向城市</Row>
                  <Select v-model="city" style="width:200px">
                    <Option v-for="(item,index) in cityList" :key="index.value" :value="item.value">
                      {{item.label}}
                    </Option>
                  </Select>
                </Row>
                <Row class="jm-row">
                  <Row>工作经验</Row>
                  <Select v-model="entryTime" style="width:200px">
                    <Option v-for="(item,index) in entryTimeList" :key="index.value" :value="item.value">
                      {{item.label}}
                    </Option>
                  </Select>
                </Row>
                <Row class="jm-row">
                  <Row>意向薪资</Row>
                  <Select @on-change="choseSalarys" v-model="salary0" style="width:80px">
                    <Option v-for="(item,index) in salaryList0" :key="index.value" :value="item.value">
                      {{item.label}}
                    </Option>
                  </Select> ~ 
                  <Select v-model="salary1" style="width:80px">
                    <Option v-for="(item,index) in salaryList1" :key="index.value" :value="item.value">
                      {{item.label}}
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
  props: ["modalSkills","title"], //基本信息的弹窗标识
  components:{
modal3
  },
  data() {
    return {
      // 表单输入框的值
      isBaseLine:false,//右边编辑框是否显示
      formData: {
        name: "",
        birthday: "",
        age: 0, //年龄
        tel: "",
        mail: "",
        work: "", //工作年限
        headPic: "", //是否显示头像
        wordDescribe: "", //一句话描述
        showDescribe: true//是否开启隐藏按钮
      },
        // 求职意向项
        // jobIntentionList:[
        //   {
        //   type: "ios-contact",
        //   baseText: "意向岗位",
        //   inputText: ""
        // },
        // {
        //   type: "md-briefcase",
        //   baseText: "意向城市",
        //   inputText: ""
        // },
        // {
        //   type: "ios-call",
        //   baseText: "入职时间",
        //   inputText: ""
        // },
        // {
        //   type: "ios-mail",
        //   baseText: "薪资要求",
        //   inputText: ""
        // }
        // ],
        choseJobList:[{
          value:"qd",label:"前端"
        }],
        choseJob:"",
        cityList:[{
          value:"bj",label:"北京"
        }],
        city:"",
        entryTimeList:[{
          value:"jt",label:"今天"
        }],
        entryTime:"",
        salaryList0:[
          {value:0,label:"10k"},
          {value:1,label:"11k"},
          {value:2,label:"12k"},
          {value:3,label:"13k"},
          ],
        salary0:"",
        salaryList1:[],
        salary1:"",

  
      // 工作年限数组
      workYearList: ["1年", "2年", "3年"],

      // 头像状态数组
      headPicList: ["显示", "隐藏"]
    };
  },
  watch: {},
  methods: {
    // 点击取消
    cancelModel() {
      this.$emit("changeSkillModel", false);
    },
    // 点击保存
    save() {
      this.cancelModel();
    },
    enter(){
      this.isBaseLine = true
    },
    leave(){
      this.isBaseLine = false
    },
    // 显示编辑框
    displayModelBase(){

    },
    // 改变薪资
    choseSalarys(){
      this.salaryList1 = this.salaryList0.slice(this.salary0+1)
    }


  }
};
</script>
 <style lang="less" scoped>
.jm-job{
  border: 1px solid transparent;
  padding: 20px 5px;
  .jm-row{
    display: inline-block;
    width: 200px;
    margin-left: 40px;
    padding-bottom: 20px;
  }
  .jm-head-icon{
    position: absolute;
    top: 0;
    right:0 ;
    color:#fff;
    background: #00c091;
  }
  .title{
    width: 400px;
    color: #254665;
    font-size: 20px;
    font-weight: bold;
    border-bottom: 1px solid #254665;
    display: inline-block;
  }
}
.jm-base-linehover0{
  border: 1px dashed #00c091; 
}
</style>