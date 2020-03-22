<template>
  <div class="jm-sider">
    <ul class="jm-ul">
      <li class="jm-li">
        <div class="jm-text">案例</div>
        <div class="jm-msg">点击下方按钮,查看其他用户填写的简历范例</div>
        <Button class="jm-btn" type="info" icon="ios-search">查看案例</Button>
        <div class="jm-line"></div>
      </li>
      <li class="jm-li">
        <div class="jm-text">贴士</div>
        <div class="jm-msg">点击下方按钮,查看其他用户填写的简历范例</div>
        <Button class="jm-btn" type="info" icon="ios-search">查看案例</Button>
        <div class="jm-line"></div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "WriteIdeSiderRight",
  data() {
    return {};
  },
  components: {},
  watch: {},

  mounted() {},
  created() {}
};
</script>

<style lang="less" scoped>
.jm-sider {
  // position: fixed;
  // width: 70px;
  background: #00c091;
  padding-right: 100px;
  margin-top: 30px;
  .jm-ul {
    .jm-li {
      background: #fff;
      text-align: center;
      .jm-text {
        // margin-top:10px;
        font-size: 18px;
        color: #525867;
        padding-top: 10px;
      }
      .jm-msg {
        padding:0 20px;
        color: #a4aab9;
        font-size: 14px;
      }
      .jm-btn{
        margin-top:10px;
        margin-bottom: 10px;
        font-size:16px;
        font-weight: bold;
      }
      .jm-line {
        background: #00c091;
        height: 5px;
      }
    }
  }
}
</style>
