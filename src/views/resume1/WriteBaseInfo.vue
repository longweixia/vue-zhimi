<template>
  <div>
    <div class="layout">
      <Layout>
        <!-- <Header class="zm-header"> -->
        <NavHeader></NavHeader>
        <!-- </Header> -->
        <Content class="zm">
          <div class="zm-content">
            <p>当前正在进行第 {{ current + 1 }} 步</p>
            <Steps :current="current">
              <Step title="基本信息"></Step>
              <Step title="专业技能"></Step>
              <Step title="教育背景"></Step>
              <Step title="工作经历"></Step>
              <Step title="开源或博客"></Step>
              <Step title="自我评价"></Step>
            </Steps>
            {{ current }}
            <!-- 基本信息 -->
            <div class="zm-table-content" v-if="step[0]">
              <Form
                ref="formValidate"
                :model="formValidate"
                :rules="ruleValidate"
                :label-width="80"
              >
                <FormItem label="姓名" prop="name">
                  <Input
                    v-model="formValidate.name"
                    placeholder="请输入你的姓名"
                  ></Input>
                </FormItem>
                <FormItem label="手机号" prop="tel">
                  <Input
                    v-model="formValidate.tel"
                    placeholder="请输入你的手机号"
                  ></Input>
                </FormItem>
                <FormItem label="Email" prop="email">
                  <Input
                    v-model="formValidate.email"
                    placeholder="请输入你的邮箱"
                  ></Input>
                </FormItem>

                <FormItem label="学历" prop="education">
                  <Select
                    v-model="formValidate.education"
                    placeholder="请选择你学历"
                  >
                    <Option value="beijing">初中</Option>
                    <Option value="shanghai">高中</Option>
                    <Option value="shenzhen">专科</Option>
                    <Option value="shenzhen">本科</Option>
                    <Option value="shenzhen">硕士</Option>
                    <Option value="shenzhen">博士</Option>
                    <Option value="shenzhen">博士后</Option>
                  </Select>
                </FormItem>
                <FormItem label="住址" prop="address">
                  <Input
                    v-model="formValidate.address"
                    placeholder="请输入你的住址，如：深圳龙华新区"
                  ></Input>
                </FormItem>
                <FormItem label="期望薪资" prop="salary">
                  <Input
                    v-model="formValidate.salary"
                    placeholder="请输入你的期望薪资，非必填，如：13k"
                  ></Input>
                </FormItem>
                <FormItem label="期望职位" prop="position">
                  <Input
                    v-model="formValidate.position"
                    placeholder="请输入你的期望职位，非必填，如：web前端"
                  ></Input>
                </FormItem>

                <!-- 按钮区 -->
              </Form>
           
              
              
              <!-- <Row>
                <Col span="2"><span class="zm-table-tip">姓名</span></Col>
                <Col span="8"><Input v-model="name"></Input></Col>
              </Row>
              <Row>
                <Col span="2"><span class="zm-table-tip">联系方式</span></Col>
                <Col span="8"
                  ><Input
                    v-model="tel"
                    οninput="value=value.replace(/[^\d]/g,'')"
                  ></Input
                ></Col>
              </Row>
              <Row>
                <Col span="2"><span class="zm-table-tip">Email</span></Col>
                <Col span="8"><Input v-model="email"></Input></Col>
              </Row>
              <Row>
                <Col span="2"><span class="zm-table-tip">学历</span></Col>
                <Col span="8"><Input v-model="education"></Input></Col>
              </Row>
              <Row>
                <Col span="2"><span class="zm-table-tip">地址</span></Col>
                <Col span="8"><Input v-model="address"></Input></Col>
              </Row>
              <Row>
                <Col span="2"><span class="zm-table-tip">期望薪资</span></Col>
                <Col span="8"><Input v-model="salary"></Input></Col>
              </Row> -->
            </div>
            <!-- 专业技能 -->
            <div class="zm-table-content" v-if="step[1]">
              <Row v-for="(item, index) in skillsList" :key="index">
                <Col span="2"
                  ><span class="zm-table-tip">（{{ item.num }}）</span></Col
                >
                <Col span="8"
                  ><Input
                    :placeholder="item.tip"
                    v-model="item.InputModal"
                  ></Input
                ></Col>
                <Col span="2" v-if="item.num > 4"
                  ><Button @click="reduceSkill(item.num)">-</Button></Col
                >
              </Row>

              <Row>
                <Col span="2"
                  ><span class="zm-table-tip"
                    ><Button type="info" @click="addSkill">+更多</Button></span
                  ></Col
                >
              </Row>
              <div></div>
            </div>
            <!-- 教育背景 -->
            <div class="zm-table-content" v-if="step[2]">
              <Row v-for="(item, index) in eduList" :key="index">
                <Col span="2"
                  ><span class="zm-table-tip">（{{ item.num }}）</span></Col
                >
                <Col span="8"
                  ><Input
                    :placeholder="item.tip"
                    v-model="item.InputTime"
                  ></Input
                ></Col>
                <Col span="8"
                  ><Input
                    :placeholder="item.tip"
                    v-model="item.InputModal"
                  ></Input
                ></Col>
                <Col span="2" v-if="item.num > 4"
                  ><Button @click="reduceEdu(item.num)">-</Button></Col
                >
              </Row>

              <Row>
                <Col span="2"
                  ><span class="zm-table-tip"
                    ><Button type="info" @click="addEdu">+更多</Button></span
                  ></Col
                >
              </Row>
              <div></div>
            </div>
            <!-- 工作经历 -->
            <div class="zm-table-content" v-if="step[3]">
              <div v-for="(item, index) in workList" :key="index">
                <Row>
                  <Col span="12">
                    <span class="zm-table-tip">{{ item.companyName }}</span>
                    <Input
                      :placeholder="item.companyTip"
                      v-model="item.companyModel"
                    ></Input>
                  </Col>
                  <Col span="12">
                    <span class="zm-table-tip">时间</span>
                    <Input
                      :placeholder="item.timeTip"
                      v-model="item.timeModel"
                    ></Input>
                  </Col>
                </Row>
                <Row>
                  <Col span="12">
                    <span class="zm-table-tip">{{ item.projectName }}</span>
                    <Input
                      v-model="item.projectModel"
                      :placeholder="item.projectTip"
                    ></Input>
                  </Col>
                  <Col span="12">
                    <span class="zm-table-tip">{{ item.tech }}</span>
                    <Input
                      v-model="item.techModel"
                      :placeholder="item.techTip"
                    ></Input>
                  </Col>
                </Row>
                <span class="zm-table-tip">{{ item.work }}</span>
                <Textarea
                  :placeholder="item.workTip"
                  v-model="item.workModel"
                ></Textarea>
              </div>
            </div>
            <!-- 开源或博客 -->
            <div class="zm-table-content" v-if="step[4]">
              <Row v-for="(item, index) in projectList" :key="index">
                <Col span="2"
                  ><span class="zm-table-tip">（{{ item.num }}）</span></Col
                >
                  <Col span="8"
                  ><Input
                    :placeholder="item.tip"
                    v-model="item.InputName"
                  ></Input
                ></Col>
                <Col span="8"
                  ><Input
                    :placeholder="item.tip"
                    v-model="item.InputModal"
                  ></Input
                ></Col>
                <Col span="2" v-if="item.num > 4"
                  ><Button @click="reduceEdu(item.num)">-</Button></Col
                >
              </Row>

              <Row>
                <Col span="2"
                  ><span class="zm-table-tip"
                    ><Button type="info" @click="addEdu">+更多</Button></span
                  ></Col
                >
              </Row>
              <div></div>
            </div>
            <div class="zm-table-content" v-if="step[5]">
             <Row v-for="(item, index) in evaluateList" :key="index">
                <Col span="2"
                  ><span class="zm-table-tip">（{{ item.num }}）</span></Col
                >
                
                <Col span="8"
                  ><Input
                    :placeholder="item.tip"
                    v-model="item.InputModal"
                  ></Input
                ></Col>
                <Col span="2" v-if="item.num > 4"
                  ><Button @click="reduceEdu(item.num)">-</Button></Col
                >
              </Row>

              <Row>
                <Col span="2"
                  ><span class="zm-table-tip"
                    ><Button type="info" @click="addEdu">+更多</Button></span
                  ></Col
                >
              </Row>
              <div></div>
            </div>
           <div style="margin-top:20px;">
                  <Button
                    class="zm-next-btn-pre"
                    type="primary"
                    @click="pre"
                    v-if="current > 0"
                    >上一步</Button
                  >
                  <Button
                    @click="handleReset('formValidate')"
                    style="margin-left: 8px"  v-if="current == 5"
                    >重置</Button
                  >

                  <Button
                    class="zm-next-btn-next"
                    type="primary"
                    @click="next"
                    v-if="current < 5"
                    >下一步</Button
                  >
                  <Button
                    class="zm-next-btn-next"
                    type="primary"
                    @click="complete"
                    v-if="current == 5"
                    >完成</Button
                  >
            </div>
          </div>
        </Content>
        <Footer>
          <!-- <NavFooter></NavFooter> -->
        </Footer>
      </Layout>
    </div>
  </div>
</template>

<script>
import NavHeader from "@/components/NavHeader";
import NavFooter from "@/components/NavFooter";

export default {
  name: "WriteBaseInfo",
  data() {
    return {
      current: 0,
      step: [true, false, false, false, false, false],
      // 专业技能
      skillsList: [
        {
          num: 1,
          tip: "Web开发： Javascript(精通)/xxx/xxxx/xxxxxx/xxxxx",
          InputModal: ""
        },
        {
          num: 2,
          tip: "前端： HTML(5)/xxxxx/xxxxxx/xxxxxx/xxxxx/xxxxxxx",
          InputModal: ""
        },
        { num: 3, tip: "数据库： MySQL/xxxx", InputModal: "" },
        { num: 4, tip: "服务器相关： 熟悉Linux基本命令/xxxxx", InputModal: "" }
      ],
      // 教育背景
      eduList: [
        {
          num: 1,
          tip: "大学： 湖南科技学院",
          InputTime: "",
          InputModal: ""
        },
        {
          num: 2,
          tip: "高中： 正源中学",
            InputTime: "",
          InputModal: ""
        },
        { num: 3, tip: "初中：正源中学",   InputTime: "",InputModal: "" },
        { num: 4, tip: "小学： 白沙完小",   InputTime: "",InputModal: "" }
      ],
     // 开源或博客
      projectList: [
        {
          num: 1,
          tip: "项目：详情",
          InputName: "",
          InputModal: ""
        },
        {
          num: 2,
         tip: "项目：详情",
            InputName: "",
          InputModal: ""
        },
        { num: 3,  tip: "项目：详情",   InputName: "",InputModal: "" },
        { num: 4,  tip: "项目：详情",   InputName: "",InputModal: "" }
      ],
     // 兴趣爱好
      evaluateList: [
        {
          num: 1,
          tip: "喜欢学习新东西，善于折腾",
          InputModal: ""
        },
        {
          num: 2,
         tip: "喜欢学习新东西，善于折腾",
          InputModal: ""
        },
        { num: 3,  tip: "喜欢学习新东西，善于折腾",  InputModal: "" },
        { num: 4,  tip: "喜欢学习新东西，善于折腾", InputModal: "" }
      ],
      // 工作经历
      workList: [
        {
          // 公司名
          companyName: "公司名",
          companyTip: "例如：百度",
          companyModel: "",
          // 时间
          time: "时间",
          timeTip: "例如：2019/07-2019/08",
          timeModel: "",
          // 项目名
          projectName: "项目名",
          projectTip: "例如：旅游网站项目",
          projectModel: "",
          // 技术栈
          tech: "技术栈",
          techTip: "例如：js,css",
          techModel: "",
          // 工作内容
          work: "工作内容",
          workTip: "例如：2019/07-2019/08",
          workModel: ""
        },
        {
          // 公司名
          companyName: "公司名",
          companyTip: "例如：百度",
          companyModel: "",
          // 时间
          time: "时间",
          timeTip: "例如：2019/07-2019/08",
          timeModel: "",
          // 项目名
          projectName: "项目名",
          projectTip: "例如：旅游网站项目",
          projectModel: "",
          // 技术栈
          tech: "技术栈",
          techTip: "例如：js,css",
          techModel: "",
          // 工作内容
          work: "工作内容",
          workTip: "例如：2019/07-2019/08",
          workModel: ""
        }
      ],
      skillNum: 4, //加的输入框为第几个开始,工作技能
      EduNum: 4, //加的输入框为第几个开始,教育背景

      baseFlag: false, //基本信息验证是否通过
      // 表单内容
      formValidate: {
        // 基本信息
        name: "",
        tel: "",
        email: "",
        education: "",
        address: "",
        // salary:"",
        // position:"",
        // gender: "",
        // interest: [],
        // date: "",
        // time: "",
        // desc: ""
      },
      // 验证规则
      ruleValidate: {
        name: [
          {
            required: true,
            message: "姓名不能为空！",
            trigger: "blur"
          }
        ],
        tel: [
          {
            required: true,
            message: "手机号不能为空",
            trigger: "blur"
          }
        ],
        email: [
          {
            required: true,
            message: "邮箱不能为空",
            trigger: "blur"
          },
          { type: "email", message: "Incorrect email format", trigger: "blur" }
        ],
        education: [
          {
            required: true,
            message: "学历不能为空",
            trigger: "change"
          }
        ],
        address: [
          {
            required: true,
            message: "住址不能为空",
            trigger: "change"
          }
        ],
        // salary: [
        //   {
        //     required: true,
        //     message: "薪资确定不填写吗",
        //     trigger: "change"
        //   }
        // ],
        // position: [
        //   {
        //     required: true,
        //     message: "职位确定不填写吗",
        //     trigger: "change"
        //   }
        // ],
        // gender: [
        //   { required: true, message: "Please select gender", trigger: "change" }
        // ],
        // interest: [
        //   {
        //     required: true,
        //     type: "array",
        //     min: 1,
        //     message: "Choose at least one hobby",
        //     trigger: "change"
        //   },
        //   {
        //     type: "array",
        //     max: 2,
        //     message: "Choose two hobbies at best",
        //     trigger: "change"
        //   }
        // ],
        // date: [
        //   {
        //     required: true,
        //     type: "date",
        //     message: "Please select the date",
        //     trigger: "change"
        //   }
        // ],
        // time: [
        //   {
        //     required: true,
        //     type: "string",
        //     message: "Please select time",
        //     trigger: "change"
        //   }
        // ],
        // desc: [
        //   {
        //     required: true,
        //     message: "Please enter a personal introduction",
        //     trigger: "blur"
        //   },
        //   {
        //     type: "string",
        //     min: 20,
        //     message: "Introduce no less than 20 words",
        //     trigger: "blur"
        //   }
        // ]
      }
      // name: "", //姓名
      // tel: "", //联系方式
      // email: "", //email
      // education: "", //学历
      // address: "", //地址
      // salary: "" //薪资
      // 专业技能在skillsList里面的InputModal
      // 教育背景在eduList里面的InputModal
    };
  },
  components: {
    NavHeader,
    NavFooter
  },
  watch: {
    current(newV, oldV) {
      this.step = [false, false, false, false, false, false];
      this.step[newV] = true;
    }
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.baseFlag = true;
          // this.$Message.success("Success!");
        } else {
          this.baseFlag = false;
          this.$Message.error("您有信息需要重新填入!");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    // 点击完成
    complete() {
      // 组装入参
      //基本信息
      var base =[
              { 姓名: this.formValidate.name},
              { 手机号: this.formValidate.tel},
              { Email: this.formValidate.email},
              { 学历: this.formValidate.education},
              { 当前住址: this.formValidate.address},
              this.formValidate.salary?{ 期望薪资: this.formValidate.salary}:"",
              this.formValidate.position?{ 期望职位: this.formValidate.position}:"",
            ];
       //专业技能
      var major = [];
      this.skillsList.forEach((item,index)=>{
        major.push(item.InputModal)
      }) ;
      // 教育背景
      var education=[];
       this.eduList.forEach((item,index)=>{
         var educationObj={};  
        educationObj.time = item.InputTime
        educationObj.type = item.InputModal
        education.push(educationObj)
      }) ;
       //工作经历
       var work=[];
       this.workList.forEach((item,index)=>{
         var workObj={};  
         workObj.company=item.companyModel
         workObj.time=item.timeModel
         workObj.technologyStack=item.techModel
         workObj.projectName=item.projectModel
         workObj.content=item.projectModel
        work.push(workObj)
      }) ;
      //开源或博客
      var project=[];
         this.projectList.forEach((item,index)=>{
         var projectObj={};  
        projectObj.projectName = item.InputName
        projectObj.content = item.InputModal
        project.push(projectObj)
      }) ;
      //爱好、
      var evaluate =[];
        this.evaluateList.forEach((item,index)=>{
        major.push(item.InputModal)
      }) ;


      this.axios
        .post("resumes/resumeInfo", {
          userName: "long", //暂时写死，到时候用vuex
          content: {
           base,
            major,
            work, 
            project,
            education,
            evaluate
          }
        })
        .then(res => {
          if (res.data.status == "0") {
            this.$Message.success("提交成功");
            this.$router.push({
              name: "completionResume"
            });
          }
        })
        .catch(err => {
          this.$Message.error("提交失败");
        });
    },
    next() {
      // 只在第一步进行校验
      if(this.current==0){
        this.handleSubmit("formValidate");
      }
      
      if (!this.baseFlag) {
        return false;
      } else {
        if (this.current == 5) {
          this.current = 0;
        } else {
          this.current += 1;
        }
      }
    },
    pre() {
      if (this.current == 0) {
        this.current = 5;
      } else {
        this.current -= 1;
      }
    },
    // 增加工作技能项
    addSkill() {
      this.skillNum++;
      this.skillsList.push({
        num: this.skillNum,
        tip: "Web开发： Javascript(精通)/xxx/xxxx/xxxxxx/xxxxx",
        InputModal: ""
      });
    },
    // 增加教育背景项
    addEdu() {
      this.EduNum++;
      this.eduList.push({
        num: this.EduNum,
        tip: "研究生： 华中科技大学",
        InputModal: ""
      });
    },
    //删除工作技能项
    reduceSkill(val) {
      this.skillsList.map((item, index) => {
        if (val == item.num) {
          this.skillsList.splice(index, 1);
        }
      });
      if (this.skillsList.length == 4) {
        this.skillNum = 4;
      }
    },
    //删除教育背景项
    reduceEdu(val) {
      this.eduList.map((item, index) => {
        if (val == item.num) {
          this.eduList.splice(index, 1);
        }
      });
      if (this.eduList.length == 4) {
        this.EduNum = 4;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.ivu-layout {
  background: #fff;
}
.ivu-layout-header {
  background: #fff;
}
.zm {
  margin-left: 100px;
  margin-right: 100px;
  .zm-content {
    width: 1000px;
    margin-left: 40px;
    margin-right: 40px;
    .zm-next-btn-next {
      float: right;
    }
    .zm-next-btn-pre {
      float: left;
    }
    .zm-table-content {
      width: 800px;
      margin-left: 100px;
      margin-right: 100px;
      margin-top: 40px;
      // text-align: center;
      .zm-table-tip {
        height: 32px;
        line-height: 32px;
      }
    }
  }
}
</style>
