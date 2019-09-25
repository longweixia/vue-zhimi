<template>
<div class="jm-sider">
  <ul class="jm-ul">
    <li class="jm-li">
      <Icon size="20" type="ios-photos" color="#fff"/>
      <div class="jm-text">模块管理</div>
      <div class="jm-line"></div>
    </li>
    <li class="jm-li">
      <Icon size="20" type="ios-photos" color="#fff"/>
      <div class="jm-text">更换模块</div>
      <div class="jm-line"></div>
    </li>
    <li class="jm-li">
      <Icon size="20" type="ios-photos" color="#fff"/>
      <div class="jm-text">风格设置</div>
      <div class="jm-line"></div>
    </li>
    <li class="jm-li">
      <Icon size="20" type="ios-photos" color="#fff"/>
      <div class="jm-text">导入简历</div>
      <div class="jm-line"></div>
    </li>
    <li class="jm-li">
      <div class="jm-text">编号</div>
      <div class="jm-text">JM002</div>
      <div class="jm-line"></div>
    </li>
     <li class="jm-li">
      <Icon size="20" type="ios-photos" color="#fff"/>
      <div class="jm-text">1级会员</div>
      <div class="jm-line"></div>
    </li>
  </ul>
</div>
</template>

<script>

export default {
  name: "WriteIdeSiderLeft",
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
.jm-sider{
  // position: fixed;
  // width: 70px;
  background: #11a480;
  .jm-ul{
        padding: 20px 0;
    .jm-li{
      text-align: center;
      color:#fff;
      .jm-text{
        margin-top:10px;
      }
      .jm-line{
        background: #fff;
        height: 1px;
        margin: 10px;
        margin:20px auto;
      }
    }
  }
}
</style>
