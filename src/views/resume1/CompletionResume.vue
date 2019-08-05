<template>
  <div>
    <div class="layout">
      <Layout>
        <NavHeader></NavHeader>
        <Content class="zm">
            <!-- 循环拿到每个模块里面的详情 -->
            <Row v-for="(item,index) in resumeList.base" :key="index">
            <Col>{{item}}</Col>
            </Row>
        </Content>
        <Footer>

        </Footer>
      </Layout>
    </div>
  </div>
</template>

<script>
import NavHeader from "@/components/NavHeader";
import NavFooter from "@/components/NavFooter";
export default {
  name: "CompletionResume",
  data() {
    return {
      resumeList:[]
    };
  },
  components: {
    NavHeader,
    NavFooter
  },
  watch: {},
  methods: {
    // 获取简历信息
    getResumeInfo() {
      this.axios
        .post("resumes/getResumeInfo", {
          userName: "long" //暂时写死，到时候用vuex
        })
        .then(res => {
          if (res.data.status == "0") {
            this.resumeList = res.data.result.resumeContent
          }
        })
        .catch(err => {});
    }
  },
  mounted() {
    this.getResumeInfo();
  }
};
</script>

<style lang="less" scoped>
.ivu-layout {
  background: #fff;
}
.ivu-layout-header {
  background: #fff;
}
.zm {
  margin-left: 200px;
  margin-right: 200px;
}
</style>
