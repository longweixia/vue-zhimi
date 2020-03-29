<template>
  <!-- 求职意向，教育背景等主要区域 -->
  <div>
    <vuedraggable class="wrapper">
      <rightContent1
        :themeList="jobThemeList"
        themeFlag="jobIntention"
        key="1"
        :jobIntentionLists="jobIntentionList"
        name="jobIntention"
        v-on:savaJobIntention="savaJobIntention"
        title="求职意向"
      >
        <div slot="slotRight">
          <Row
            class="jobList"
            v-for="(item, index) in jobIntentionList"
            :key="index">
            <Icon :size="20" class="jobIcon" :type="item.type" />
            <span class="jobText">{{ item.baseText }}</span>
          </Row>
        </div>
      </rightContent1> 
      <!-- 教育背景 -->
       <rightContent1
        :themeList="eduThemeList"
        themeFlag="edu"
        :key="2"
        name="edu"
        v-on:addEdus="addEdus('edu')"
        title="教育背景"
      >
        <div slot="slotRight">
          <Row v-for="(item, index) in eduList" :key="index">
            <Row>
              <Row class="edu-row"> 
                <Col v-if="settingObj.isShowJobTime" :span="8" class="jm-edu-col">
                  <Input
                    v-model="item.eduDate"
                    placeholder="请填写时间如:2016/08-2017/09"
                  />
                </Col>
                <Col :span="8" class="jm-edu-col">
                  <Input v-model="item.schooName" placeholder="学校名字" />
                </Col>
               
                <Col :span="8" class="jm-edu-col">
                  <Input v-model="item.majorName" placeholder="请填写专业" />
                </Col>
            
              </Row>
              <!-- <Row>
                <Col :span="18" class="jm-edu-col">
                  <Input v-model="item.majorName" placeholder="请填写专业" />
                </Col>
              </Row> -->
            </Row>
            <Row class="edu-row">
              <Col class="jm-edu-col">
                <Input
                  v-model="item.eduContent"
                  type="textarea"
                  clearable
                  autosize
                  class="input-introduce"
                  placeholder="请填写内容"
                />
              </Col>
            </Row>
          </Row>
        </div>
      </rightContent1> 
      <!-- 工作经验 -->
     <rightContent1
        :themeList="workThemeList"
        themeFlag="work"
        key="3"
        name="edu"
        v-on:addEdus="addEdus('experience')"
        title="工作经验"
      >
        <div slot="slotRight">
          <Row v-for="(item, index) in experienceList" :key="index">
            <Row class="edu-row">
              <Col :span="8" class="jm-edu-col">
                <Input
                  v-model="item.date"
                  placeholder="请填写时间如:2016/08-2017/09"
                />
              </Col>
              <Col :span="8" class="jm-edu-col">
                <Input v-model="item.name" placeholder="公司名字" />
              </Col>
                <Col :span="8" class="jm-edu-col">
                <Input v-model="item.positionName" placeholder="请填写职位" />
              </Col>
            </Row>
            <!-- <Row>
              <Col :span="18" class="jm-edu-col">
                <Input v-model="item.positionName" placeholder="请填写职位" />
              </Col>
            </Row> -->
            <Row class="edu-row">
              <Col class="jm-edu-col">
                <Input
                  v-model="item.content"
                  clearable
                  autosize
                  type="textarea"
                  class="input-introduce"
                  placeholder="请填写内容"
                />
              </Col>
            </Row>
          </Row>
        </div>
      </rightContent1>
      <!-- 自我评价 -->
      <rightContent1
        :themeList="ThemeAppraiseList"
        themeFlag="appraise"
        key="4"
        name="appraise"
        title="自我评价"
      >
        <div slot="slotRight">
          <Row class="edu-row">
            <Col class="jm-edu-col">
              <Input
                v-model="selfEvaluation"
                placeholder="请填写内容，字数不超过500字"
                clearable
                autosize
                type="textarea"
                class="input-introduce"
              />
            </Col>
          </Row>
        </div>
      </rightContent1>
    </vuedraggable>
    <div v-if="showFind!=='true'">
      <FindResumeModal :modal2="modal2" :modal_loading="modal_loading"></FindResumeModal>
      </div>
  </div>
</template>
<script>
import vuedraggable from "vuedraggable";
import rightContent1 from "./RightContent1";
import Bus from "@/assets/event-bus.js";
import FindResumeModal from "./FindResumeModal";
export default {
  name: "mainContent",
  components: {
    vuedraggable,
    rightContent1,
    FindResumeModal
  },
  props:["formData","showFind"],
 
  data() {
    return {
      modal2: false,
      modal_loading: false,
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
          name: "",
          positionName: "",
          content: ""
        }
      ],
      // 自我评价
      selfEvaluation: "",
       settingObj: {
        isShowJobTime: true
      }, //设置数据
      // nameId:0,//模板id
    };
  },
  watch: {},
  methods: {
       // 点击主题的保存，传递过来主题数据
    saveThemes(){
       Bus.$on("saveTheme", themeList => {
      var flags = themeList[1]; //判断是哪项的标识
      console.log(themeList, "子");
      if (flags == "jobIntention") {
        this.jobThemeList = themeList[0];
      } else if (flags == "edu") {
        this.eduThemeList = themeList[0];
      } else if (flags == "work") {
        this.workThemeList = themeList[0];
      } else if (flags == "appraise") {
        this.ThemeAppraiseList = themeList[0];
      }
    });
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
      // this.postMainDatas();
      
    },
    // 将主要数据传递到商城模板上
//     postMainDatas(){
//       Bus.$emit("postMainData",{
// jobIntentionList:this.jobIntentionList
//       }
        
//       )
//     },
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
          name: "",
          positionName: "",
          content: ""
        };
        this.experienceList.push(objExperience);
      }
    },
    // 获取设置数据
    getSetting() {
      Bus.$on("changeSetting", settingObj => {
        this.settingObj = settingObj;
      });
    },
     // 点击保存按钮，提交填写好的简历
     saveContent(nameId){
       console.log(this.formData, "====");
      //  拿到了父组件的id，拿到模板的dom
        let doms = document.getElementById("code")
       this.common.transformImage(doms).then(dataUrl=>{
      // 组装要提交的信息
      var content = {
        userName: localStorage.getItem("userName"), //简历名称
        hasCommonResume: false, //是否有基础简历的信息
        resumeTemplate: [
          //模板简历
          {
            TemplateId: nameId, //模板ID
            img:{
              url:dataUrl,
              name:nameId
            },
            resumeContent: {
              //简历内容
              baseInfoList: this.formData, //基本信息
              // SkillList: this.hasSkillList, //技能特长
              jobIntentionList: this.jobIntentionList, //求职意向
              eduList: this.eduList, //教育背景
              experienceList: this.experienceList, //工作经验
              selfEvaluation: this.selfEvaluation //自我评价
            }
          }
        ]
      };

      this.axios
        .post("resumeTemplates/resumeTemplates", { 
          content: content,
          TemplateId:nameId
           })
        .then(res => {
          if (res.data.status == "0") {
            // this.$Message.success("保存成功");
            Bus.$emit("showMoreResume")
          }
        })
        .catch(err => {
          console.log("err", err);
        });
      })

     },
    //  点击IDE上方的保存按钮
     saveContentss(){
        Bus.$on("saveContents", () => {
          this.saveContent(this.$route.query.id)
        })
       
     },
     // 获取简历信息
    // 调用接口，判断获取该模板中是否已经填写过内容，如果是，直接将数据回填
    getTemplatesResume(){
      this.axios
        .get("resumeTemplates/getTemplatesResume", {
          params: {
         userName: localStorage.getItem("userName"), //暂时写死，到时候用vuex
         TemplateId:this.$route.query.id
        }
        })
        .then(res => {
          if (res.data.status == "0") {
            this.modal_loading = false;
            this.modal2 = false;
           var result = res.data.result;
          //  如果获取不到数据，就不执行，防止后面获取属性值：null.xxx报错
           if(!result){
             return
           }
           this.getTemplatesResumes(result)
          }
        })
        .catch(err => {});
    },
     // 获取简历信息
    getTemplatesResumes(result){
      var content = result.resumeContent;
      if (content.baseInfoList.headPic == "显示") {
        this.showHeadImg = true;
      } else if (content.baseInfoList.headPic == "隐藏") {
        this.showHeadImg = false;
      }

      console.log(content, "====");
      // 组装基本数据，传递到基本数据弹窗
      this.baseObjC = {
        name: content.baseInfoList.name,
        birthday: content.baseInfoList.birthday,
        age: content.baseInfoList.age, //年龄
        tel: content.baseInfoList.tel,
        mail: content.baseInfoList.mail,
        work: content.baseInfoList.work, //工作年限
        headPic: content.baseInfoList.headPic, //是否显示头像
        wordDescribe: content.baseInfoList.wordDescribe, //一句话描述
        showDescribe: content.baseInfoList.showDescribe //是否开启隐藏按钮
      };
      // 获取数据，回填到表单
      let baseInfoList = [
        //基本信息
        {
          type: "ios-contact",
          baseText: "年龄",
          inputText: content.baseInfoList.age || ""
        },
        {
          type: "md-briefcase",
          baseText: "工作经验",
          inputText: content.baseInfoList.work || ""
        },
        {
          type: "ios-call",
          baseText: "电话",
          inputText: content.baseInfoList.tel || ""
        },
        {
          type: "ios-mail",
          baseText: "邮箱",
          inputText: content.baseInfoList.mail || ""
        }
      ]
      // console.log(this.baseInfoList,"this.baseInfoList")
        Bus.$emit("getFormData",[content.baseInfoList,baseInfoList,this.baseObjC])
        // (this.formData = content.baseInfoList);
      this.hasSkillList = content.SkillList;
      this.jobIntentionList = content.jobIntentionList;
      this.eduList = content.eduList;
      this.experienceList = content.experienceList;
      this.selfEvaluation = content.selfEvaluation;
 
    },
    // 查询是否有该简历
      findHasResume() {
      this.axios
        .get("resumeTemplates/findHasResume", {
          params: {
            userName: localStorage.getItem("userName"), //暂时写死，到时候用vuex
            TemplateId: this.$route.query.id
          }
        })
        .then(res => {
          if (res.data.status == "0") {
            this.modal2 = true;
          }
        })
        .catch(err => {
          this.modal2 = false;
        });
    }
  },
  mounted(){
        this.findHasResume()
        Bus.$on("showFindModal",data=>{
      this.modal2 = false
    })
   
    Bus.$on("getResumes",()=>{
      // 查询该模板下是否已有保存过的简历
    this.getTemplatesResume();
    })
    // 获取简历信息
    // this.getTemplatesResume();
        // 点击主题的保存，传递过来主题数据
   this.saveThemes();
   this.getSetting();
   this.saveContentss();
  //  点击简历推荐的保存
     Bus.$on("saveRecommend",(id)=>{
     if(id==4){
       this.saveContent(4)
     }
   })
  },
   // 解决$on接收多次的问题
  beforeDestroy(){
    Bus.$off("saveContentss")
  }
};
</script>
<style lang="less" scoped> 
 
// 求职意向
.jobList {
  text-align: center;
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
// .jobList:last-child{
// margin-right: 0;
// }

// .border-none{
//       /deep/ .ivu-input{
//         border: none;
//     }
// /depp/ .ivu-input:focus{
//         box-shadow:none;
//         background: #efeeee;
//     } 
// }
.jm-edu-col {
  margin-top: 10px;
}
.input-introduce {
//   width: calc(100% - 20px);
//   padding:0 10px;
  margin-bottom: 20px;
  // 去掉textarea右下角的三角形
  /deep/ textarea {
    resize: none;
  }
}
.edu-row{
    padding: 0 10px;
    /deep/ .ivu-input:focus{
        box-shadow:none;
        background: #eaeaea;
        border: none;
    } 
    // 设置input的样式
  /deep/ .ivu-input{
        border: none;
    }
}
</style>