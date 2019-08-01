<template>
  <div>
    <span v-if="isLogin">{{userName}}</span>
    <Button @click="loginModal = true" v-if="!isLogin">登录/注册</Button>
    <Modal
      footer-hide
      v-model="loginModal"
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
      <div> 
        <Button
          type="primary"
          @click="login"
        >登录</Button></div>

    </Modal>
  </div>
</template>

<script>
export default {
  name: "NavHeader",
  data() {
    return {
      loginModal: false, //默认不显示登录框
      isLogin:false,//默认未登录
      userName: "", //用户名
      userPwd: "", //密码
    };
  },
  methods: {
    ok() {},
    cancel() {},
    // 登录
    login() {
      this.axios
        .post("users/login", {
          userName: this.userName,
          userPwd: this.userPwd
        })
        .then(res => {
          if(res.data.status=="0"){
          // 本地存储token
          localStorage.setItem("token-zhimi", res.data.result);
          // 关闭登录窗口
          this.loginModal = false;
          this.isLogin = true;
          this.$Message.success("登录成功");
          }
        })
        .catch(err => {
          this.$Message.error("登录失败");
          this.isLogin = false;
        });
    },
    // 校验是否登录
    checkLogin() {
      this.axios
        .post("users/checkLogin", {
          token: localStorage.getItem("token-zhimi")
        })
        .then(res => {
             if(res.data.status=="0"){
          this.userName = res.data.result;
          this.isLogin = true
             }
        })
        .catch(err => {
           this.isLogin = false
          // 显示登录按钮
        });
    }
  },
  mounted() {
    this.checkLogin();
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
}
</style>
