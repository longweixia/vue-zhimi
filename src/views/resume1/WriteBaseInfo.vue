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
              <Step title="工作经验"></Step>
              <Step title="项目经验"></Step>
              <Step title="自我评价"></Step>
            </Steps>
            <div
              class="zm-table-content"
              v-if="step[0]">
              <Row>
                <Col span="2"><span class="zm-table-tip">手机</span></Col>
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
              v-if="step[1]" 
            >
              <Row v-for="(item,index) in skillsList" :key="index">
                <Col span="2"><span class="zm-table-tip">（{{item.num}}）</span></Col>
                <Col span="8"><Input :placeholder="item.tip" v-model="item.InputModal"></Input></Col>
                <Col span="2" v-if="item.num>4"><Button @click="reduceSkill(item.num)">-</Button></Col>
              </Row>
             
              <Row>
                <Col span="2"><span class="zm-table-tip"><Button type="info" @click="addSkill">+更多</Button></span></Col>
              </Row>
        <div>
                



              </div>
            </div>
            <div
              class="zm-table-content"
              v-if="step[2]"
            >
              <Row>
                <Col span="2"><span class="zm-table-tip">手机2</span></Col>
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
              v-if="step[3]"
            >
              <Row>
                <Col span="2"><span class="zm-table-tip">手机3</span></Col>
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
            <!-- <div
              class="zm-table-content"
              v-if="step6"
            >
              <Row>
                <Col span="2"><span class="zm-table-tip">手机</span></Col>
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

            </div> -->
            <Button
              class="zm-next-btn-pre"
              type="primary"
              @click="pre"
            >上一步</Button>
            <Button
              class="zm-next-btn-next"
              type="primary"
              @click="next"
            >下一步</Button>
            <!-- <Tabs>

              <TabPane
                label="基本信息"
                icon="logo-apple"
              >基本信息</TabPane>
              <TabPane
                label="专业技能"
                icon="logo-windows"
              >专业技能</TabPane>
              <TabPane
                label="教育背景"
                icon="logo-tux"
              >教育背景</TabPane>
              <TabPane
                label="工作经验"
                icon="logo-tux"
              >工作经验</TabPane>
              <TabPane
                label="项目经验"
                icon="logo-tux"
              >项目经验</TabPane>
            </Tabs> -->
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
      skillsList:[
        {num:1,tip:"Web开发： Javascript(精通)/xxx/xxxx/xxxxxx/xxxxx",InputModal:""},
        {num:2,tip:"前端： HTML(5)/xxxxx/xxxxxx/xxxxxx/xxxxx/xxxxxxx",InputModal:""},
        {num:3,tip:"数据库： MySQL/xxxx",InputModal:""},
        {num:4,tip:"服务器相关： 熟悉Linux基本命令/xxxxx",InputModal:""}
      ],
      skillNum:4,//加的输入框为第几个开始
    };
  },
  components: {
    NavHeader,
    NavFooter
  },
  watch: {
    current(newV,oldV) {
     this.step=[false, false, false, false, false, false]
     this.step[newV] = true
    }
  },
  methods: {
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
    addSkill(){
      this.skillNum++;
      this.skillsList.push({num:this.skillNum,tip:"Web开发： Javascript(精通)/xxx/xxxx/xxxxxx/xxxxx",InputModal:""})
    },
    reduceSkill(val){
      this.skillsList.map((item,index)=>{
        if (val==item.num){
          this.skillsList.splice(index,1)
        }
      })
      if(this.skillsList.length==4){
        this.skillNum=4
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
