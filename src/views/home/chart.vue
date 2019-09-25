<template>
  <div>
    <!-- 聊天页面 -->
    <div class="all">
      <div
        class="name"
        v-if="isHidden"
      >
        <!-- <h2>请输入你的昵称</h2> -->
        <input
          type="text"
          id="name"
          placeholder="请输入昵称..."
          autocomplete="off"
          v-model="myName"
        >
        <button
          id="nameBtn"
          @click="sendSocketMsg"
        >确 定</button>
      </div>
      <div :class="mainClass">
        <div class="header">
          <img src="static/image/logo.jpg">
          happy聊天室
        </div>
        <div id="container">
          <div class="conversation">
             <!-- 发送消息，图片消息 -->
            <ul id="messages" v-if="imgFlag">
              <li :class='msgList.side'>
            <img :src="msgList.img">
            <div>
              <span>{{msgList.name}}</span>
              <p style="padding: 0;">{{msgList.msg}}</p>
            </div>
          </li>
            </ul>
            <!-- 文字消息 -->
            <ul id="messages" v-if="!imgFlag">
         <li :class='msgList.side'>
            <!-- <img :src="msgList.img"> -->
          <div>
             <span>{{msgList.name}}</span>
            <p :style="{'color':msgList.color}">{{msgList.msg}}</p>
          </div>
        </li>
            </ul>
          
            <!-- 提示有用户进来了 -->
            <p
              class='system'
              v-if="systemNews"
            >
              <span>{{chartDeta}}</span>
              <br /><span>{{chartName}} {{chartStatus}}了聊天室</span>

            </p>
       
           <!-- style="margin-top:100px;" -->
            <form action="" >
              <div class="edit">
                <input
                  type="color"
                  id="color"
                  value="#000000" v-model="colorVal"
                >
                <i
                  title="自定义字体颜色"
                  id="font"
                  class="fa fa-font"
                >颜色
                </i><i
                  title="双击取消选择"
                  class="fa fa-smile-o"
                  id="smile"
                >取消
                </i><i
                  title="单击页面震动"
                  id="shake"
                  class="fa fa-bolt"
                >震动
                </i>
                <input
                  type="file"
                  id="file"
                >f
                <i
                  class="fa fa-picture-o"
                  id="img"
                >img</i>
                <div class="selectBox">
                  <div
                    class="smile"
                    id="smileDiv"
                  >
                    <p>经典表情</p>
                    <ul class="emoji"></ul>
                  </div>
                </div>
              </div>
              <!-- autocomplete禁用自动完成功能 -->
              <textarea
                id="m"
                autofocus v-model="inputMsg"
              ></textarea>
              <button
                class="btn rBtn"
                id="sub" @click="postMsg"
              >发送</button>
              <button
                class="btn"
                id="clear"
              >关闭</button>
            </form>
          </div>
          <div class="contacts">
            <h1>在线人员(<span id="num">{{onlineNum}}</span>)</h1>
            <ul id="users" v-for="(item,index) in usersList" :key="index">
            <li>
          <img :src="item.img">
          <span>{{item.name}}</span>
        </li>
        </ul>
            <p v-if="!hasPeople">当前无人在线哟~</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import io from "socket.io-client";
export default {
  name: "Chart",
  data() {
    return {
      msg: "login",
      myName: "", //输入的用户名
      socket: "", //定义socket对象来传送消息
      isHidden: true, //模态框是否隐藏
      // 系统消息
      chartDeta: "", //日期
      chartName: "", //聊天用户
      chartStatus: "", //聊天状态
      systemNews: false, //是否显示系统消息
      mainClass: ["main"],//是否抖动的类数组、
      hasPeople:false,//是否有在线用户
      onlineNum:0,//在线人数
      usersList:[],//在线用户信息
      inputMsg:"",//发送消息
      colorVal:"",//表情信息
      msgList:{},//发送的消息列表
      imgFlag:false,//是否是图片消息

    };
  },
  mounted() {},
  methods: {
    // 发送消息
    postMsg(){
 if(this.inputMsg=="") {
        alert('请输入内容！');
        return false;
      }
      this.socket.emit('sendMsg', {
        msg: this.inputMsg,
        color: this.colorVal,
        type: 'text'
      });
      this.inputMsg ="" 
      return false; 
    },
    
    // 窗口抖动
    shake() {
      this.mainClass.push("shaking");
      var timer;
      clearTimeout(timer);
      timer = setTimeout(() => {
        this.mainClass.pop("shaking");
      }, 500);
    },
    // 显示在线人员
  displayUser(users) {
      if(!users.length) {
   this.hasPeople = false
      } else {
       this.hasPeople = true
      }
    this.onlineNum = users.length
      this.usersList = users
    },
    // 点击确定发送io连接
    sendSocketMsg() {
      // 连接服务器
      this.socket = io.connect("http://localhost:3000");
      var imgN = Math.floor(Math.random() * 4) + 1; // 随机分配头像

      //  发送登录信息到服务端
      this.socket.emit("logins", {
        name: this.myName,
        img: "static/image/user" + imgN + ".jpg"
      }); // 触发登录事件

      //  接收服务端的登录报错
      this.socket.on("loginError", () => {
        alert("用户名不存在，请重新输入！");
        this.myName = "";
      });

      // 服务传递过来的登录成功
      this.socket.on("loginSuc", () => {
        this.isHidden = false;
      });

      //聊天窗口下的系统提示消息
      this.socket.on("system", user => {
        this.chartDeta = new Date().toTimeString().substr(0, 8);
        this.chartStatus = user.status;
        this.chartName = user.name;
        this.systemNews = true;

        // 窗口抖动
        this.shake();
      });

        // 显示在线人员
    this.socket.on('showOnlineUser', (usersInfo)=> {
      this.displayUser(usersInfo);
    });

// 接收消息
    this.socket.on('receiveMsg', (obj)=> {  
      console.log(obj,"发送的消息")
      // 发送为图片
      if(obj.type == 'img') {
        this.imgFlag = true
      this.msgList = obj
        // $('#messages').scrollTop($('#messages')[0].scrollHeight);
        return;
      }
      // 发送的为文字
      this.imgFlag =false
      // 提取文字中的表情加以渲染
    
       this.msgList = obj
  
      // 滚动条总是在最底部
      // $('#messages').scrollTop($('#messages')[0].scrollHeight);
    }); 


    }
  }
};
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  font: 13px "微软雅黑", Helvetica, Arial;
  // background: url('../image/bg3.jpg');
  background-size: cover;
}
.name {
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
  background-color: rgba(238, 238, 238, 0.8);
  text-align: center;
  padding-top: 35vh;
}
.name input {
  width: 200px;
  border: none;
  border-bottom: 2px solid #bbb;
  background-color: #f3f3f3;
  font-size: 23px;
  color: #555;
  text-align: center;
}
.name button {
  display: block;
  width: 107px;
  height: 36px;
  margin: 0 auto;
  border: none;
  background-color: #805b6b;
  border-radius: 5px;
  color: #fff;
  font-size: 17px;
  margin-top: 20px;
  cursor: pointer;
}
.main {
  width: 705px;
  height: 556px;
  margin: 7vh auto;
  border: 2px #eee solid;
  border-radius: 10px;
  box-shadow: 3px 5px 9px #ccc;
  background-color: rgba(255, 255, 255, 1);
  position: relative;
  left: 0;
}
.header {
  height: 85px;
  border-bottom: 2px solid #eee;
  font-size: 23px;
  padding-left: 10px;
  padding-top: 10px;
  color: #555;
}
.header img {
  width: 50px;
  height: 50px;
  border-radius: 25px;
  vertical-align: middle;
}
#container {
  height: 471px;
  display: flex;
}
.conversation {
  width: 490px;
  border-right: 2px #eee solid;
}
#messages {
  height: 346px;
  padding: 20px 10px 0px 10px;
  overflow-y: auto;
}
/*滚动条样式*/
#messages::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 4px;
}
#messages::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 5px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.2);
}
#messages::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 0;
  background: rgba(0, 0, 0, 0.1);
}
p.system {
  color: #888;
  text-align: center;
  margin: 5px;
}
p.system span {
  background-color: #eee;
  border-radius: 9px;
  padding: 1px 5px;
  margin-bottom: 7px;
  display: inline-block;
}
#messages li {
  list-style: none;
  width: 100%;
  float: left;
  margin-bottom: 5px;
}
#messages li img {
  width: 40px;
  height: 40px;
  border-radius: 20px;
}
#messages li p img {
  width: 30px;
  height: 30px;
  margin: 0;
  padding: 0;
  vertical-align: bottom;
}
#messages li p .sendImg {
  max-width: 300px;
  max-height: 188px;
  width: auto;
  height: auto;
  border-radius: 5px;
}
#messages li p span {
  padding-top: 7px;
}
.left img {
  margin-right: 8px;
}
.right img {
  margin-left: 8px;
}
.left img,
.left div {
  float: left;
}
.left span {
  text-align: left;
}
.right span {
  text-align: right;
}
.right p {
  float: right;
}
.right img,
.right div {
  float: right;
}
#messages li div > span {
  display: block;
  color: #555;
  padding-left: 2px;
}
#messages li div p {
  display: flex;
  max-width: 300px;
  height: auto;
  padding: 10px;
  margin-top: 5px;
  word-wrap: break-word; /* 文本自动换行 */
  font-size: 15px;
  border-radius: 5px;
}
.left p {
  background-color: #d5d3d3;
}
.right p {
  background-color: #86bdf8;
}
form {
  height: 121px;
  border-top: 1px #ddd solid;
  position: relative;
}
.edit {
  width: 100%;
  height: 33px;
  color: #7f8393;
  font-size: 19px;
  line-height: 33px;
  padding-left: 10px;
  position: relative;
}
.edit i {
  padding: 5px 6px;
  cursor: pointer;
}
.edit i:hover {
  background-color: #e2e2e2 !important;
}
.edit .selectBox {
  display: none;
  position: absolute;
  bottom: 34px;
  left: 0px;
  z-index: 3;
  background-color: #fff;
}
.shaking {
  animation: run 0.2s infinite;
}
@keyframes run {
  0% {
    left: 0;
  }
  25% {
    left: -7px;
  }
  50% {
    left: 7px;
  }
  100% {
    left: 0;
  }
}
.edit #file {
  width: 32.36px;
  height: 29px;
  opacity: 0;
  z-index: 5;
}
.edit #img {
  z-index: 0;
  margin-left: -43px;
}
#color {
  width: 25px;
  border: none;
  cursor: pointer;
  background: none;
  opacity: 0;
  position: relative;
  z-index: 5;
}
#color:focus {
  outline: none;
}
.edit #font {
  position: absolute;
  left: 9px;
  top: 3px;
  z-index: 0;
}
.smile {
  width: 460px;
  height: auto;
  border: 1px #eee solid;
  box-shadow: 1px 1px 1px #ccc;
  padding-top: 5px;
  box-sizing: border-box;
}
.smile p {
  height: 35px;
  font-size: 15px;
  color: #555;
  line-height: 35px;
  padding-left: 20px;
  box-sizing: border-box;
}
.emoji {
  width: 100%;
  height: 210px;
  overflow-y: scroll;
  padding: 0 17px;
}
.emoji li {
  list-style: none;
  width: 35px;
  height: 35px;
  line-height: 35px;
  box-sizing: border-box;
  overflow: hidden;
  padding-top: 4px;
  padding-left: 2px;
  display: inline-block;
  margin: 0;
}
.emoji li:hover {
  padding-top: 1px;
  background-color: #f3f3f4;
}
.emoji li img {
  width: 30px;
  height: 30px;
}

.emoji::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 4px;
}
.emoji::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 5px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.2);
}
.emoji::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 0;
  background: rgba(0, 0, 0, 0.1);
}

textarea {
  display: block;
  width: 100%;
  height: 55px;
  padding-left: 5px;
  padding-top: 5px;
  resize: none;
  font-size: 16px;
  background: none;
  border: none;
  font-family: "微软雅黑";
}
textarea:focus,
.btn:focus,
.name input:focus,
.name button:focus {
  outline: none;
}
/*滚动条样式*/
textarea::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 4px;
}
textarea::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 5px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.2);
}
textarea::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 0;
  background: rgba(0, 0, 0, 0.1);
}
button.btn {
  width: 72px;
  height: 25px;
  float: right;
  margin-right: 5px;
  background-color: #805b6b;
  border-radius: 3px;
  border: none;
  color: #fff;
  cursor: pointer;
}
button.btn.rBtn {
  margin-right: 10px;
}
.btn:hover {
  background-color: #b495a1;
}
.contacts {
  width: 210px;
  height: 100%;
  padding: 6px;
}
.contacts h1 {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 10px;
}
.contacts ul {
  width: 100%;
}
.contacts li {
  display: inline-block;
  width: 23%;
  margin-right: 2%;
  height: 65px;
  text-align: center;
  margin-bottom: 5px;
}
.contacts li img {
  width: 100%;
  height: 45.5px;
}
.contacts li > span {
  display: inline-block;
  width: 100%;
  font-size: 13px;
  line-height: 20px;
  vertical-align: middle;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.contacts p {
  text-align: center;
  margin-top: 70px;
  color: #555;
}
</style>
