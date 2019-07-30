<template>
  <div>
    <!-- <div class="zm-logo">
        <img src="../../static/image/w-logo.jpg">
  </div> -->
    <Menu
      mode="horizontal"
      :theme="theme1"
      active-name="1"
    >
      <!-- <img class="zm-logo" src="../../static/image/w-logo.jpg"> -->
      <MenuItem name="1">
      <Icon type="ios-paper" />
      新建简历
      </MenuItem>
      <MenuItem name="2">
      <Icon type="ios-people" />
      优秀案例
      </MenuItem>
      <Submenu name="3">
        <template slot="title">
          <Icon type="ios-stats" />
          模板中心
        </template>
        <MenuGroup title="使用">
          <MenuItem name="3-1">新增和启动</MenuItem>
          <MenuItem name="3-2">活跃分析</MenuItem>
          <MenuItem name="3-3">时段分析</MenuItem>
        </MenuGroup>
        <MenuGroup title="留存">
          <MenuItem name="3-4">用户留存</MenuItem>
          <MenuItem name="3-5">流失用户</MenuItem>
        </MenuGroup>

      </Submenu>
      <MenuItem name="4">
      <Icon type="ios-construct" />
      关于职秘
      </MenuItem>
      <MenuItem
        name="5"
        class="zm-login"
      >
      <Icon type="ios-construct" />
      <span @click="modal1 = true">登录/注册</span>
      </MenuItem>
    </Menu>

    <Modal
      footer-hide
      v-model="modal1"
      title="请登录"
      @on-ok="ok"
      @on-cancel="cancel"
    >
      <div>账号：</div>
      <Input
        v-model="userName"
        prefix="ios-contact"
        placeholder="Enter name"
        style="width: auto"
      />
      <div>密码：</div>
      <Input
        v-model="userPwd"
        prefix="ios-contact"
        placeholder="Enter name"
        style="width: auto"
      />
      <div> <Button
          type="primary"
          @click="login"
        >登录</Button></div>

    </Modal>
    <!-- <p>Change theme</p>
    <RadioGroup v-model="theme1">
        <Radio label="light"></Radio>
        <Radio label="dark"></Radio>
        <Radio label="primary"></Radio>
    </RadioGroup> -->
  </div>
</template>

<script>
export default {
  name: "NavHeader",
  data() {
    return {
      theme1: "light", //导航栏主题
      modal1: false, //默认不显示登录框
      userName: "", //用户名
      userPwd: "" //密码
    };
  },
  methods: {
    ok() {},
    cancel() {},
    login(){
       this.axios.post('users/login',{
          userName:this.userName,
          userPwd:this.userPwd
       })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      },
    
  }

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.zm-logo {
  width: 100px;
  height: 100px;
  display: inline-block;
  border: none;
  position: absoulte;
  margin-left: -700px;
  // float: left;
  // z-index:100;
}
// .ivu-menu{
//   padding-left: 200px;
// }
// .zm-login{
//   width:300px;
// }
</style>
