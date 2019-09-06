<template>
  <div class="zm">
    <div class="layout">
      <Layout>
        <!-- <Header class="zm-header"> -->
        <NavHeader></NavHeader>
        <!-- <Chart/> -->
        
        <div @click="joinGroupChart">加入群聊</div>
        <ul v-for="(item, index) in resulist" :key="index" style="float:left">
          <li @click="gotoResume(item-1)">简历{{ item }}</li>
        </ul>
        <ResumeTemplate1 v-if="resumeIndex[0].ry" />
        <ResumeTemplate2 v-if="resumeIndex[1].ry" />

        <!-- </Header> -->
        <Content>
          <!-- banner -->
          <div class="zm-banner">
          <Carousel autoplay v-model="value2" loop>
            <CarouselItem>
              <div class="demo-carousel">
                <img src="../../../static/image/banner1.png"/>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div class="demo-carousel">
                <img src="../../../static/image/banner1.png"/>
              </div>
            </CarouselItem>
          </Carousel>
          </div>
          <!-- 列表上方文字区 -->
          <div class="zm-table-text">
            <h2>在线简历制作</h2>
            <h3>...................................</h3>
            <p>只需几步，轻松制作多份不同主题的精美简历，模板任性下载，永久免费</p>
          </div>
          <!-- <div class="zm-input-tips">
            <Row class="zm-input">
              <Col span="24">
                您有2种填入简历的方式
              </Col>
            </Row>
            <Row class="zm-input zm-input-title2">
              <Col span="8">
                1. 填写基本信息，一键生成多主题简历
                <span class="zm-input-recommend">！推荐</span>
                <Button> 进入 </Button>
              </Col>
            </Row>
            <Row class="zm-input  zm-input-title3">
              <Col span="8">
                2. 选择自己喜欢的模板然后填入信息。
                <Button> 进入 </Button>
              </Col>
            </Row>
          </div>
          <Row class="zm-input">
            <Col span="12">
              <Input
                style="height:50px"
                placeholder="输入行业或职业名，寻找属于你的专属简历模板"
              >
              </Input>
            </Col>
          </Row> -->
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
import ResumeTemplate1 from "@/views/resume/ResumeTemplate/ResumeTemplate1";
import ResumeTemplate2 from "@/views/resume/ResumeTemplate/ResumeTemplate2";
import Chart from "./Chart";
// import GroupChart from "@/views/GroupChart/GroupChart";
export default {
  name: "Home",
  data() {
    return {
      resulist: [1, 2],
      resumeIndex: [{ ry: false }, { ry: false }],
      value2: 0
    };
  },
  components: {
    NavHeader,
    NavFooter,
    Chart,
    ResumeTemplate1,
    ResumeTemplate2
  },
  methods: {
    // 进入简历
    gotoResume(item) {
      this.resumeIndex.forEach((items, indexs) => {
        items.ry = false;
      });
      this.resumeIndex[item].ry = true;
    },
    // 进入群聊
    joinGroupChart() {
      this.$router.push({
        name: "groupChart"
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.zm {
  max-width: 1920px;
  padding-left: 2%;
  padding-right: 2%;
  background: #f5f7f9;
}
.ivu-layout {
  background: #fff;
}
.ivu-layout-header {
  background: #fff;
}
.zm-input-tips {
  text-align: center;
  font-size: 23pt;
  color: #666;
  margin-bottom: 10px;
  .zm-input-title2 {
    font-size: 18px;
  }
  .zm-input-title3 {
    font-size: 18px;
    margin-left: 55px;
  }
}
.zm-input {
  display: flex;
  justify-content: center;
  align-items: center;
  .zm-input-recommend {
    background: #fbb03b;
    padding-right: 10px;
    border: none;
    border-radius: 5px;
    color: #fff;
  }
  .ivu-input {
    font-size: 20px;
  }
}

// banner
.zm-banner{
  img{
     width: 100%;
    //  margin:10px;
     height:180px;
  }
 
}

// 列表上方文字区域
.zm-table-text{
  text-align: center;
}
</style>
