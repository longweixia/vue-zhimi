<template>
<div class="zm">
  <div class="layout">
    <Layout>
      <Header class="zm-header">
        <NavHeader></NavHeader>
      </Header>
      <!-- <Content>Content</Content> -->
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
  .ivu-layout-header{
    background: #fff;
    }
</style>
