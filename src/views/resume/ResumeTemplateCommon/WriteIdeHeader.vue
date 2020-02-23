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
    <span @click="saveContent">保存</span>
    <span>下载</span>
    </Col>
  </Row>
</div>
</template>

<script>
import Bus from '@/assets/event-bus.js'
export default {
  name: "WriteIdeHeader",
  data() {
    return {
     
    };
  },
  components: {

  },
  methods:{
    saveContent(){
      //  Bus.$emit('BsaveMsg', 120)
       Bus.$emit('saveContents')
    }
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
