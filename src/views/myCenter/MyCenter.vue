<template>
  <div>
     <Menu class="jm-menu" active-name="1-2" :open-names="['1']">
        <Submenu name="1">
            <template slot="title">
                <Icon type="ios-analytics" />
               个人中心
            </template>
          
                <MenuItem name="1-1" to="myResume">我的简历</MenuItem>
                <MenuItem name="1-2">我的收藏</MenuItem>
         
            <MenuGroup title="Item 2">
                <MenuItem name="1-3">Option 3</MenuItem>
                <MenuItem name="1-4">Option 4</MenuItem>
            </MenuGroup>
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
        <Submenu name="4">
            <template slot="title">
                <Icon type="ios-cog" />
                Navigation Three
            </template>
            <MenuItem name="4-1">Option 9</MenuItem>
            <MenuItem name="4-2">Option 10</MenuItem>
            <MenuItem name="4-3">Option 11</MenuItem>
            <MenuItem name="4-4">Option 12</MenuItem>
        </Submenu>
    </Menu>
   <!-- 面包屑 -->
   <div class="jm-bread">
        <Breadcrumb>
                <BreadcrumbItem to="/">
                  <Icon type="ios-home-outline"></Icon> 首页
                </BreadcrumbItem>
                <BreadcrumbItem to="TemplateMall">
                  <Icon type="logo-buffer"></Icon> 模板商城
                </BreadcrumbItem>
              </Breadcrumb>
   </div>
   <!-- 点击页面标签，在当前页面内更新内容，不刷新页面 -->
   <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "myCenter",
  data() {
    return {};
  },
  components: {},
  methods: {
    
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
}
</style>
