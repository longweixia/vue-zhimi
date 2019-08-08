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
            <!-- 基本信息 -->
            <div
              class="zm-table-content"
              v-if="step[0]"
            >
              <Row>
                <Col span="2"><span class="zm-table-tip">姓名</span></Col>
                <Col span="8"><Input v-model="name"></Input></Col>
              </Row>
              <Row>
                <Col span="2"><span class="zm-table-tip">联系方式</span></Col>
                <Col span="8"><Input v-model="tel"></Input></Col>
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
              </Row>

            </div>
            <!-- 专业技能 -->
            <div
              class="zm-table-content"
              v-if="step[1]"
            >
              <Row
                v-for="(item,index) in skillsList"
                :key="index"
              >
                <Col span="2"><span class="zm-table-tip">（{{item.num}}）</span></Col>
                <Col span="8"><Input
                  :placeholder="item.tip"
                  v-model="item.InputModal"
                ></Input></Col>
                <Col
                  span="2"
                  v-if="item.num>4"
                ><Button @click="reduceSkill(item.num)">-</Button></Col>
              </Row>

              <Row>
                <Col span="2"><span class="zm-table-tip"><Button
                    type="info"
                    @click="addSkill"
                  >+更多</Button></span></Col>
              </Row>
              <div>

              </div>
            </div>
            <!-- 教育背景 -->
             <div
              class="zm-table-content"
              v-if="step[2]"
            >
              <Row
                v-for="(item,index) in eduList"
                :key="index"
              >
                <Col span="2"><span class="zm-table-tip">（{{item.num}}）</span></Col>
                <Col span="8"><Input
                  :placeholder="item.tip"
                  v-model="item.InputModal"
                ></Input></Col>
                <Col
                  span="2"
                  v-if="item.num>4"
                ><Button @click="reduceEdu(item.num)">-</Button></Col>
              </Row>

              <Row>
                <Col span="2"><span class="zm-table-tip"><Button
                    type="info"
                    @click="addEdu"
                  >+更多</Button></span></Col>
              </Row>
              <div>

              </div>
            </div>
            <!-- 工作经历 -->
            <div
              class="zm-table-content"
              v-if="step[3]"
            >
            <div v-for="(item,index) in workList" :key="index"> 
              <Row>
                <Col span="12">
                <span class="zm-table-tip">{{item.companyName}}</span>
                <Input :placeholder="item.companyTip" v-model="item.companyModel"></Input>
                </Col>
                <Col span="12">
                <span class="zm-table-tip">时间</span>
                <Input :placeholder="item.timeTip" v-model="item.timeModel"></Input>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                <span class="zm-table-tip">{{item.projectName}}</span>
                <Input v-model="item.projectModel" :placeholder="item.projectTip"></Input>
                </Col>
                <Col span="12">
                <span class="zm-table-tip">{{item.tech}}</span>
                <Input v-model="item.techModel" :placeholder="item.techTip"></Input>
                </Col>
              </Row>
              <span class="zm-table-tip">{{item.work}}</span>
              <Textarea :placeholder="item.workTip" v-model="item.workModel"></Textarea>
              </div>
             

            </div>
            <!-- 开源或博客 -->
            <div
              class="zm-table-content"
              v-if="step[4]"
            >
              <Row>
                <Col span="2"><span class="zm-table-tip">手机4</span></Col>
                <Col span="8"><Input></Input></Col>
              </Row>
              <Row>
                <Col span="2"><span class="zm-table-tip">Email</span></Col>
                <Col span="8"><Input></Input></Col>
              </Row>
              <Row>
                <Col span="2"><span class="zm-table-tip">学历</span></Col>
                <Col span="8"><Input></Input></Col>
              </Row>
              <Row>
                <Col span="2"><span class="zm-table-tip">地址</span></Col>
                <Col span="8"><Input></Input></Col>
              </Row>
              <Row>
                <Col span="2"><span class="zm-table-tip">期望薪资</span></Col>
                <Col span="8"><Input></Input></Col>
              </Row>

            </div>
            <div
              class="zm-table-content"
              v-if="step[5]"
            >
              <Row>
                <Col span="2"><span class="zm-table-tip">手机5</span></Col>
                <Col span="8"><Input></Input></Col>
              </Row>
              <Row>
                <Col span="2"><span class="zm-table-tip">Email</span></Col>
                <Col span="8"><Input></Input></Col>
              </Row>
              <Row>
                <Col span="2"><span class="zm-table-tip">学历</span></Col>
                <Col span="8"><Input></Input></Col>
              </Row>
              <Row>
                <Col span="2"><span class="zm-table-tip">地址</span></Col>
                <Col span="8"><Input></Input></Col>
              </Row>
              <Row>
                <Col span="2"><span class="zm-table-tip">期望薪资</span></Col>
                <Col span="8"><Input></Input></Col>
              </Row>

            </div>
            <Button
              class="zm-next-btn-pre"
              type="primary"
              @click="pre"
              v-if="current>0"
            >上一步</Button>
            <Button
              class="zm-next-btn-next"
              type="primary"
              @click="next"
              v-if="current<5"
            >下一步</Button>
            <Button
              class="zm-next-btn-next"
              type="primary"
              @click="complete"
              v-if="current==5"
            >完成</Button>
         
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
          InputModal: ""
        },
        {
          num: 2,
          tip: "高中： 正源中学",
          InputModal: ""
        },
        { num: 3, tip: "初中：正源中学", InputModal: "" },
        { num: 4, tip: "小学： 白沙完小", InputModal: "" }
      ],
      // 工作经历
      workList: [
        {
          // 公司名
          companyName: "公司名",
          companyTip: "例如：百度",
          companyModel:"",
          // 时间
          time: "时间",
          timeTip: "例如：2019/07-2019/08",
          timeModel:"",
          // 项目名
          projectName: "项目名",
           projectTip: "例如：旅游网站项目",
          projectModel:"",
          // 技术栈
          tech: "技术栈",
         techTip: "例如：js,css",
          techModel:"",
          // 工作内容
          work: "工作内容",
          workTip: "例如：2019/07-2019/08",
          workModel:"",
        }
      ],
      skillNum: 4, //加的输入框为第几个开始,工作技能
      EduNum: 4, //加的输入框为第几个开始,教育背景
      // 基本信息
      name:"",//姓名
      tel:"",//联系方式
      email:"",//email
      education:"",//学历
      address:"",//地址
      salary:"",//薪资
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
    // 点击完成
    complete() {
      this.axios
        .post("resumes/resumeInfo", {
          userName: "long",//暂时写死，到时候用vuex
          content: {
            base: [{"姓名":"龙伟"},{"联系方式":"17620904422"},{"Email":"117597819@qq.com"},{"学历":"本科"},{"当前住址":"深圳"},{"期望薪资":"16k"},{"期望职位":"web前端"}], //基本信息
            major: ["web开发：js","数据库:mongodb","后端:node.js"], //专业技能
            work: [
              {"company":"软通动力","time":"2019-01/2019/08","technologyStack":"vue+node","projectName":"zkt充值","content":"我在此项目负责了哪些工作，这个项目中，有什么里给我最深刻的印象，我最困难的问题是什么，我采取了什么措施，最后结果如何。这个项目中"},
              {"company":"软通动力","time":"2019-01/2019/08","technologyStack":"vue+node","projectName":"zkt充值","content":"我在此项目负责了哪些工作，这个项目中，有什么里给我最深刻的印象，我最困难的问题是什么，我采取了什么措施，最后结果如何。这个项目中"},
              {"company":"软通动力","time":"2019-01/2019/08","technologyStack":"vue+node","projectName":"zkt充值","content":"我在此项目负责了哪些工作，这个项目中，有什么里给我最深刻的印象，我最困难的问题是什么，我采取了什么措施，最后结果如何。这个项目中"}
              ], //工作技能
            project: [
              {"projectName":"zkt充值","content":"一款使用Spring Framework + AngularJS写的单页应用博客系统，使用MyBatis作为ORM框架，写作"},
              {"projectName":"zkt充值","content":"一款使用Spring Framework + AngularJS写的单页应用博客系统，使用MyBatis作为ORM框架，写作"},
              {"projectName":"zkt充值","content":"一款使用Spring Framework + AngularJS写的单页应用博客系统，使用MyBatis作为ORM框架，写作"}
            ], //项目经验
            education: [
              {"time":"2019/06/09-2019/08/01","type":"大学"},
              {"time":"2019/06/09-2019/08/01","type":"大学"},
              {"time":"2019/06/09-2019/08/01","type":"大学"}
            ], //教育背景
            evaluate: [
              "喜欢学习新东西，善于折腾",
              "喜欢学习新东西，善于折腾",
              "喜欢学习新东西，善于折腾"
              ] //自我评价
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
      if (this.current == 5) {
        this.current = 0;
      } else {
        this.current += 1;
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
