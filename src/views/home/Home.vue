<template>
  <div class="zm">
    <div class="layout">
      <Layout>
        <!-- <Header class="zm-header"> -->
        <NavHeader></NavHeader>
        <!-- </Header> -->
        <Content>
          <div class="zm-input-tips">
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
            > </Input>
            </Col>
          </Row>
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
  name: "Home",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },
  components: {
    NavHeader,
    NavFooter
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
</style>
