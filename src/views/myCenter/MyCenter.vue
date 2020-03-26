<template>
  <div>
     <NavHeader></NavHeader>
     <!-- 注意，这里不要这样写：@on-select="changeMenu()"，带括号会默认你没有传参数 -->
     <i-Menu class="jm-menu" :active-name="openNames" :open-names="[1-1]" accordion @on-select="changeMenu">
        <Submenu name="1">
            <template slot="title">
                <Icon type="ios-analytics" />
              简历中心
            </template>

                <MenuItem name="1-1" to="myResume">我的简历</MenuItem>
                <MenuItem name="1-2" to="collection">我的收藏</MenuItem>
      
            <!-- <MenuGroup title="Item 2">
              <MenuItem name="1-2" to="collection">我的收藏</MenuItem>
            </MenuGroup> -->
        </Submenu>
        <Submenu name="2">
            <template slot="title">
                <Icon type="ios-filing" />
                Navigation Two
            </template>
            <MenuItem name="2-1">Option 5</MenuItem>
            <MenuItem name="2-2">Option 6</MenuItem>
            <Submenu name="3">
                <template slot="title">Submenu</template>
                <MenuItem name="3-1">Option 7</MenuItem>
                <MenuItem name="3-2">Option 8</MenuItem>
            </Submenu>
        </Submenu>
    </i-Menu>
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
  name: "myCenter",
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
