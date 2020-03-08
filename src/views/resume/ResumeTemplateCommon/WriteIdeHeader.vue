<template>
<div class="jm-header">
  <div>
     <span class="head-text"  @click="$router.back(-1)">
  返回
    </span>
    <span class="head-text">
    龙伟的简历
    </span>
    <span class="head-text">
    <span @click="saveContent">保存</span>
    <span >下载</span>
    </span>
  </div>
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
    },
  
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
    text-align: center;
    padding-right: 50px;
    .head-text{
      padding-right: 100px;
    }

    /deep/.ivu-layout-header{
      height: 50px;
      line-height: 50px;
    }
}
</style>
