<template>
  <div class="zm-header-content">
    <Row class="zm-header jm-f16">
      <Col span="6" class="zm-header-column jm-rt">
        <Col span="16">
          <img class="zm-logoImg" src="../../static/image/b-logo.jpg"
        /></Col>
        <Col span="8" class="jm-ct">
          <span @click="goHome" class="zm-header-text">首页</span>
        </Col>
      </Col>
      <Col span="3" class="zm-header-column jm-ct">
        <Dropdown>
          <span>
            在线制作
            <Icon type="ios-arrow-down"></Icon>
          </span>
          <DropdownMenu slot="list">
            <DropdownItem @click.native="WriteBaseInfo(1)">
              方式1：填入信息，一键生成多主题简历
            </DropdownItem>
            <DropdownItem @click.native="WriteBaseInfo(2)">
              方式2：直接编辑简历模板</DropdownItem
            >
          </DropdownMenu>
        </Dropdown>
      </Col>
      <Col span="2" class="zm-header-column jm-ct"
        ><span @click="goTemplateMall" class="zm-header-text"
          >模板商城</span
        ></Col
      >
      <Col span="2" class="zm-header-column jm-ct"
        ><span class="zm-header-text">优秀简历</span></Col
      >
      <Col span="2" class="zm-header-column jm-ct"
        ><span class="zm-header-text" @click="routerTo('club')">职觅社区</span></Col
      >
      <Col span="2" class="zm-header-column jm-ct"
        ><span class="zm-header-text" @click="routerTo('center')">个人中心</span></Col
      >

      <Col span="6" class="zm-header-btn jm-ct">
        <span v-if="isLogin">{{ userName }}</span>
        <Button @click="loginModal = true" v-if="!isLogin">登录</Button>
        <Button @click="registerModal = true" v-if="!isLogin">注册</Button>
        <Button @click="loginOut" v-if="isLogin">退出</Button></Col
      >
    </Row>

    <!-- 登录 -->
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
        <Button type="primary" @click="login">登录</Button>
      </div>
    </Modal>
    <!-- 注册 -->
    <Modal
      footer-hide
      v-model="registerModal"
      title="wellcome"
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
      <div>密码1：</div>
      <Input
        v-model="userIcon"
        prefix="ios-contact"
        placeholder="Enter name"
        style="width: auto"
      />
      <div>
        <Button type="primary" @click="register">注册</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "NavHeader",
  data() {
    return {
      loginModal: false, //默认不显示登录框
      registerModal: false, //默认不显示注册框
      isLogin: false, //默认未登录
      userName: "", //用户名
      userPwd: "", //密码
      userIcon:"",//用户头像
    };
  },
  methods: {
     // 个人中心
    routerTo(name) {
      if(name=='center'){
        this.$router.push({name:"myResume"})
      }else if(name=='club'){
        this.$router.push({name:"clubContent"})
      }
     
    },
    ok() {},
    cancel() {},
    // 返回首页
    goHome() {
      this.$router.push({
        name: "home"
      });
    },
    // 进入模板商城
    goTemplateMall() {
      this.$router.push({
        name: "templateMall"
      });
    },
    // 进入简历编写页面
    WriteBaseInfo(item) {
      console.log(1111);
      if (item == 1) {
        this.$router.push({
          name: "writeBaseInfo"
          // params: {
          //   id: id
          // }
        });
      } else {
        //   this.$router.push({
        //   name: "WriteBaseInfo"
        //   // params: {
        //   //   id: id
        //   // }
        // });
      }
    },
    // 登录
    login() {
      this.axios
        .post("users/login", {
          userName: this.userName,
          userPwd: this.userPwd
        })
        .then(res => {
          if (res.data.status == "0") {
            // 本地存储token
            localStorage.setItem("token-zhimi", res.data.result);
            localStorage.setItem("userName", this.userName);
             localStorage.setItem("userImg", res.data.userImg);
            localStorage.setItem("userId", res.data.userId);
            
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
          if (res.data.status == "0") {
            this.userName = res.data.result;
            this.isLogin = true;
          }
        })
        .catch(err => {
          this.isLogin = false;
          // 显示登录按钮
        });
    },
    // 退出登录
    loginOut() {
      this.axios
        .post("users/loginOut", {
          userName: this.userName
        })
        .then(res => {
          if (res.data.status == "0") {
            localStorage.removeItem("token-zhimi");
       
            this.isLogin = false;
          }
        })
        .catch(err => {
          this.isLogin = true;
          // 显示登录按钮
        });
    },
    // 注册
    register() {
      this.axios
        .post("users/register", {
          userName: this.userName,
          userPwd: this.userPwd,
          userIcon:this.userIcon
        })
        .then(res => {
          if (res.data.status == "0") {
            // 本地存储token
            localStorage.setItem("token-zhimi", res.data.result);
            localStorage.setItem("userName", this.userName);
            localStorage.setItem("userImg", this.userIcon);
            localStorage.setItem("userId", res.data.userId);
            // 关闭登录窗口
            this.registerModal = false;
            this.isLogin = true;
            this.$Message.success("注册成功");
          } else {
            this.$Message.success(res.data.msg);
          }
        })
        .catch(err => {
          this.isLogin = false;
          this.$Message.success("注册失败");
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
// .zm-header-content{
// box-sizing:border-box;
//   height: 69px;
// }
// .zm-header {

//   // margin: 0 0 0 600px;
//   display: flex;
//   justify-items: center;
//   align-items: center;
//   .zm-header-column {
//     height: 34px;
//     line-height: 34px;
//     // text-align: center;
//     font-size: 14px;
//     color: #666;
//     margin-left: 15px;
//     padding-left: 4px;
//     margin-right: 15px;
//     cursor: pointer;
//   }

// }

.zm-header {
  height: 60px;
  line-height: 60px;
  .zm-header-text:hover {
    background: #fbb03b;
    padding: 5px;
    border: none;
    border-radius: 5px;
    color: #fff;
    cursor: pointer;
  }
}
// logo
.zm-logoImg {
  width: 67px;
  height: 61px;
  padding: 10px;
  // margin-left:126px;
}
</style>
