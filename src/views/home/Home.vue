<template>
  <div class="zm">
    <div class="layout">
      <Layout>
        <!-- <Header class="zm-header"> -->
        <NavHeader></NavHeader>
        <!-- <Chart/> -->

        <!-- <div @click="joinGroupChart">加入群聊</div>
        <ul v-for="(item, index) in resulist" :key="index" style="float:left">
          <li @click="gotoResume(item-1)">简历{{ item }}</li>
        </ul>
        <ResumeTemplate1 v-if="resumeIndex[0].ry" />
        <ResumeTemplate2 v-if="resumeIndex[1].ry" /> -->
        <Content>
          <!-- banner -->
          <div class="zm-banner">
            <div class="swiper-container">
              <div class="swiper-wrapper">
                <div class="swiper-slide">
                  <img src="../../../static/image/banner1.png" alt="" />
                </div>
                <div class="swiper-slide">
                  <img src="../../../static/image/banner1.png" alt="" />
                </div>
                <div class="swiper-slide">
                  <img src="../../../static/image/banner1.png" alt="" />
                </div>
              </div>
            </div>
            <!-- 如果需要分页器 -->
            <div class="swiper-pagination"></div>
            <!-- banner中的输入框 -->
            <Row class="zm-banner-input">
              <Col span="8" class="banner-input-Col">
                <Input
                  size="large"
                  search
                  enter-button
                  placeholder="输入行业或职业名，寻找属于您的专属简历模板"
                />
              </Col>
            </Row>
          </div>
          <!-- 列表上方文字区 -->
          <Row class="zm-table-text">
            <Row>
              <h2>在线简历制作</h2>
            </Row>
            <Row>
              <Divider />
            </Row>
            <Row>
              <p>
                只需几步，轻松制作多份不同主题的精美简历，模板任性下载，永久免费
              </p>
            </Row>
            <Row class="zm-table-tag">
              <Row>
                <Col>
                  <Tag checkable color="primary">前端</Tag>
                  <Tag checkable color="primary">后端</Tag>
                  <Tag checkable color="primary">ui设计</Tag>
                  <Tag checkable color="primary">测试</Tag>
                </Col>
              </Row>
              <!-- 简历列表 -->
              <Row>
                <Col>
                  <ul class="jm-ul">
                    <li class="jm-li">
                      <img
                        src="http://file.500d.me/upload/image/201811/01/34a66513-66fd-462a-971c-c883dcfafe7d.png"
                        alt="JM0203"
                      />
                    </li>
                    <li class="jm-li">
                      <img
                        src="http://file.500d.me/upload/image/201811/01/34a66513-66fd-462a-971c-c883dcfafe7d.png"
                        alt="JM0203"
                      />
                    </li>
                    <li class="jm-li">
                      <img
                        src="http://file.500d.me/upload/image/201811/01/34a66513-66fd-462a-971c-c883dcfafe7d.png"
                        alt="JM0203"
                      />
                    </li>
                    <li class="jm-li">
                      <img
                        src="http://file.500d.me/upload/image/201811/01/34a66513-66fd-462a-971c-c883dcfafe7d.png"
                        alt="JM0203"
                      />
                    </li>
                  </ul>
                </Col>
              </Row>
            </Row>
          </Row>
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
import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";
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
    },
    // 获取图片列表
    getImgList() {
        this.axios
        .get("resumesImgs/resumeImgList",{headers:{"Content-Type":'application/x-www-form-urlencoded; charset=UTF-8'}})
        .then(res => {
         
        })
        .catch(err => {
          console.log("err",err)
        });
     
    }
  },
  mounted() {
    this.getImgList();
    var mySwiper = new Swiper(".swiper-container", {
      autoplay: true,
      delay: 2000, //2秒切换一次
      loop: true,
      // 如果需要分页器
      pagination: {
        el: ".swiper-pagination"
      }
    });
    
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

// banner
.zm-banner {
  img {
    width: 100%;
    height: 180px;
  }
}
.swiper-pagination {
  position: relative;
  margin-top: -25px;
}
.zm-banner-input {
  position: relative;
  .banner-input-Col {
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
    top: -60px;
    z-index: 1;
  }
}

// 列表上方文字区域
.zm-table-text {
  text-align: center;
  margin-top: 30px;
  line-height: 25px;
  background: rgb(246, 249, 251);
  .ivu-divider-horizontal {
    width: 30%;
    margin: 10px auto;
    margin-top: 5px;
    min-width: 30%;
  }
  .zm-table-tag {
    margin-top: 20px;
  }
}
// 列表
.jm-li {
  width: 25%;
  float: left;
  padding-left: 20px;
  padding-right: 20px;
  margin-top: 30px;
  img {
    width: 100%;
    height: 350px;
  }
}
</style>
