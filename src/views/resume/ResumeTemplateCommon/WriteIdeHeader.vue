<template>
<div class="jm-header">
  <Row>
     <Col :span="8">
  返回
    </Col>
    <Col :span="8">
    龙伟的简历
    </Col>
    <Col :span="8">
    下载
    </Col>
  </Row>
</div>
</template>

<script>

export default {
  name: "WriteIdeHeader",
  data() {
    return {
     
    };
  },
  components: {

  },
  watch: {},

  mounted() {},
  created() {

  }
};
</script>

<style lang="less" scoped>
.jm-header{
    height: 50px;
    /deep/.ivu-layout-header{
      height: 50px;
      line-height: 50px;
    }
}
</style>
