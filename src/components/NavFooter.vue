<template>
  <div class="jm-footer">
    <!-- 联系我们 -->
    <Row class="jm-contact">
      联系我们   关于我们  常见问题
    </Row>
    <Row class="jm-msg">
      简觅网：高效一键多主题在线简历制作网站，职场社区
    </Row>
    <Row class="jm-address">
      简觅科技，深圳市龙华新区民治街道
    </Row>
  </div>
</template>

<script>
export default {
  name: "NavFooter",
  data() {
    return {
    
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.jm-footer{
text-align: center;
color:#ddd;
background: rgb(83, 97, 108);
.jm-contact{
  padding-top: 30px;
}
}
</style>
