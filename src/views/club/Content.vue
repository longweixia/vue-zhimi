<template>
<!-- 社区中心 -->
  <div>
     <NavHeader></NavHeader>
    
   <!-- 面包屑 -->
   <div class="jm-bread">
        <Breadcrumb>
                <BreadcrumbItem>
                  <Icon type="ios-home-outline"></Icon> 个人中心
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <Icon type="logo-buffer"></Icon> {{bread}}
                </BreadcrumbItem>
              </Breadcrumb>
   </div>
   <!-- 点击页面标签，在当前页面内更新内容，不刷新页面 -->
   <router-view>
   </router-view>
  </div>
</template>

<script>
import NavHeader from "@/components/NavHeader";
import Bus from "@/assets/event-bus.js";
export default {
  name: "clubContent",
  components:{
   NavHeader
  },
  props:["bread","openNames"],
  data() {
    return {
    };
  },
  methods: {
    changeMenu(i){
        console.log(i)
         Bus.$emit("postOpenNames",i+"")
    }
  },
  watch: {},

  mounted() {},
  created() {}
};
</script>

<style lang="less" scoped>
.jm-menu{
    min-height: 600px;
    margin-top: 20px;
}
.jm-bread{
    position: absolute;
    left: 240px;
    top: 0;
    height: 40px;
    line-height: 40px;
    margin: 10px;
    margin-top: 60px;
}

</style>
