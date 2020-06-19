<template>
  <div class="container">
    <div class="user-panel">
      <div class="user-list-wrap">
        <div class="my-info">
          <div
            class="user-item"
            style="border-bottom: 1px solid #eee;margin-bottom: 30px;"
          >
            <img :src="userImg" style="width: 60px;height: 60px;" />
            <span>{{ userName }}</span>
          </div>
        </div>
        <div class="tab">
          <div class="friend-tab-box tab-box">
            <div
              class="friend-tab tab-item"
              style="color: #308e56;"
              @click="changeTab('message-wrap', 'friends-info', 0)"
            >
              我的好友
            </div>
            <div v-if="showTip" class="circle me-friend-tab">
              {{ tipNumber }}
            </div>
          </div>
          <div class="group-chat-tab-box tab-box">
            <div
              class="group-chat-tab tab-item"
              @click="changeTab('group-chat-wrap', 'group-chat-info', 1)"
            >
              我的群聊
            </div>
            <div class="circle me-group-chat-tab">0</div>
          </div>
        </div>
        <div v-if="showFriends" class="friends-info info-wrapper">
          <div
            v-for="(item, index) in userList"
            :key="index"
            class="user-item friend-item"
            @click="changeChat(item)"
          >
            <img :src="item.userImg" style="width: 60px;height: 60px;" />
            <span>{{ item.userName }}----{{ item.id }}</span>
            <!-- <input type="hidden" value="${item.id}" /> -->
            <input type="hidden" v-model="item.id" />
            <div :class="['circle', 'me_' + item.id]">
              {{ item.siLiaoNum }}
            </div>
          </div>
        </div>
        <div v-if="showGroupFriends" class="group-chat-info info-wrapper">
          <span>群聊室</span>
          <button onclick="createChatGroup()">创建群聊</button>
          <div class="select-chat-group"></div>
          <div class="now-select">
            <div>当前选择：</div>
          </div>
          <div class="create-group hidden">
            <input class="chatGroupNameInput" placeholder="群聊名称" />
            <button onclick="confirmChatGroup()">确认创建</button>
          </div>
          <div class="chat-group-list"></div>
        </div>
      </div>
    </div>
    <!-- 私聊 -->
    <div v-if="chantPanel" class="chat-panel hidden">
      <div v-if="showChatPanel" class="message-wrap">
        <div v-if="messageDefault" class="default-bg message-default">
          <span>点击好友开始聊天吧！</span>
        </div>
        <div v-if="messageWrapper" class="message-wrapper wrap-box">
          <!-- 联系人信息 -->
          <div class="friend name-info">
            名字：{{ chartnamepeople }} ID：{{ chartnamepeopleId }}
          </div>
          <div v-if="messagebox" class="message-box box">
            <div
              v-for="(item, index) in messageArry"
              :key="index"
              :class="item.round"
              class="msg-box "
            >
              
                <div v-if="item.round == 'right'" class="msg">{{ item.msg }}</div>
                <img  v-if="item.round == 'right'" :src="item.img" style="width:60px;height:60px" />
           
         <img v-if="item.round == 'left'" :src="item.img" style="width:60px;height:60px" />
                <div v-if="item.round == 'left'" class="msg">{{ item.msg }}</div>
               
  
            </div>
          </div>
          <div class="input-box">
            <div class="send-img-box">
              <img
                class="emoji-icon"
                src="static/emoji.png"
                onclick="showEmojiBox()"
              />
              <img
                class="emoji-icon imgBox"
                src="static/emoji1.png"
                onclick="showEmotBox()"
              />
            </div>
            <input
              v-model="contentInpu"
              class="inp inp-box"
              contenteditable="true"
              placeholder="在此输入消息..."
            />
          </div>

          <div class="btn">
            <span>按下Enter发送消息</span>
            <button @click="sendMessage" class="send-message">发 送</button>
          </div>
        </div>
      </div>
    </div>
    <!-- 群聊 -->
    <div v-if="showGroupPanel" class="group-chat-wrap">
      <div class="default-bg group-chat-default">
        <span>选择群聊开始聊天吧！</span>
      </div>
      <div class="group-chat-group-box wrap-box hidden">
        <div class="chatGroupName name-info"></div>
        <div class="group-chat-box box"></div>
        <div class="input-box">
          <div class="send-img-box">
            <img
              class="emoji-icon"
              src="static/emoji.png"
              onclick="showEmojiBox()"
            />
            <img
              class="emoji-icon imgBox"
              src="static/emoji1.png"
              onclick="showEmotBox()"
            />
          </div>
          <div
            class="group-chat-inp inp-box"
            contenteditable="true"
            placeholder="在此输入消息..."
          ></div>
          <div class="btn">
            <span>按下Enter发送消息</span>
            <button class="send-message-group-chat">发 送</button>
          </div>
        </div>
      </div>
    </div>
    <div class="emoji"></div>
    <div class="emot"></div>
    <div class="mask" onclick="hiddenBox()"></div>
  </div>
</template>

<script>
import io from "socket.io-client";
export default {
  name: "GroupChart",
  props: ["chatrName", "tochatIcon"],
  data() {
    return {
      userId: "", //登录用户ID
      userName: "", // 当前登录用户名;
      userImg: "", // 用户头像
      id: "", // 用户socketId
      userList: [], // 好友列表
      chatGroupList: [], // 群聊列表
      sendFriend: "", // 当前聊天好友的用户socketId
      sendChatGroup: "", // 当前聊天的群聊的roomId
      messageJson: {}, // 好友消息列表
      msgGroupJson: {}, // 群聊消息列表
      tag: 0, // 0 我的好友面板  1 群聊面板
      chartnamepeople: "", //当前联系人
      messageArry: [], //当前好友聊天信息
      chartnamepeople: "", //当前联系人
      chartnamepeopleId: "", //当前联系人Id
      showChatPanel: true, //显示私聊面板
      showGroupPanel: true, //显示群聊面板
      showFriends: true, //显示好友信息
      showGroupFriends: false, //显示群聊信息
      tipNumber: 0, //提醒消息数
      showTip: false, //显示消息提示
      showsiLiao: false, //显示私聊提示-------------
      messageWrapper: false, //显示私聊面板
      messageDefault: true, //显示聊天面板提示信息\
      contentInpu: "", //输入框内容
      chantPanel: true, //私聊面板
      messagebox: true //
    };
  },

  methods: {
    // ----------1----挂载$
    getStyle() {
      window.$ = (tag, all) => {
        if (!tag) {
          console.warn("请检查传入的css选择器是否正确");
          return null;
        }
        if (!document.querySelector) {
          console.warn("浏览器不支持querySelector");
          return null;
        }
        if (all) {
          return document.querySelectorAll(tag);
        } else {
          return document.querySelector(tag);
        }
      };
    },
    //-----------2----初始化执行
    init() {
      this.userName = localStorage.getItem("userName");
      this.userImg = localStorage.getItem("userImg");
      this.userId = localStorage.getItem("userId");
      // ------3-----
      this.selectClick();
      // -------4-------
      this.setAllPorarait();
      // 如果本地保存了用户的头像和名字，隐藏注册模块
      if (this.userName && this.userImg) {
        // --------5--------
        this.login(this.userName, this.userImg);
      } else {
        this.$Message.warning("请登录");
      }
    },
    // --------3-----选择头像
    selectClick() {
      this.showGroupPanel = false;

      $(".emoji").onclick = e => {
        this.chooseEmoji(e);
      };

      $(".emot").onclick = e => {
        this.chooseEmot(e);
      };
    },
    // ---------4-------获取头像等数据
    setAllPorarait() {
      this.axios
        .get("charts/getChatEmo", {})
        .then(res => {
          if (res.data.status == "0") {
            // let datas = res.data.result;
            // let emoji = datas.emoji;
            // let portrait = datas.portrait;
            // let emot = datas.emot;
            // let str = "";
            // str = "";
            // emoji.forEach(item => {
            //   str += `<img style="width: 30px;height: 30px;" src="static/emoticon/emoji/${item}" />`;
            // });
            // $(".emoji").innerHTML = str;
            // str = "";
            // emot.forEach(item => {
            //   str += `<img style="width: 70px;height: 70px;" src="static/emoticon/emot/${item}" />`;
            // });
            // $(".emot").innerHTML = str;
          }
        })
        .catch(err => {
          console.log("err", err);
        });
    },
    // ----------5-------登录
    login(userName, userImg) {
      if (userName && userImg) {
        // login
        // --------6--------
        this.initSocket(userName, userImg);
      }
    },
    // ---------6--------初始化连接sokect
    initSocket(userName, userImg) {
      // this.socket = io();
      this.socket = io.connect("http://localhost:3000");
      this.socket.on("connect", () => {
        // 打开聊天面板
        $(".chat-panel").style.display = "block";
        // this.userName = userName;
        // this.userImg = userImg;
        this.id = this.socket.id;
        let userInfo = {
          id: this.socket.id,
          userName: userName,
          userImg: userImg
        };
        // localStorage.setItem("userName", userName);
        // localStorage.setItem("userImg", userImg);
        this.socket.emit("login", userInfo);
        //---------7------设置个人信息
        this.setMyInfo();
      });
      this.socket.on("userList", userList => {
        this.userList = userList;
        this.userList.forEach((item, index) => {
          item.siLiaoNum = 0;
        });
        // ------8-------绘制用户列表
        this.drawUserList();
      });

      this.socket.on("quit", id => {
        this.userList = this.userList.filter(item => item.id != id);
        this.drawUserList();
      });
      this.socket.on("receiveMsg", data => {
        // --------12--------设置数据
        this.setMessageJson(data);
        if (this.tag) {
          this.tipNumber++;
          this.showTip = true;
        } else {
          if (data.sendId === this.sendFriend) {
            this.drawMessageList();
          } else {
            this.userList.forEach((item, index) => {
              if (item.id == data.sendFriend) {
                this.userList[index].siLiaoNum++;
              }
            });
          }
        }
      });

      this.socket.on("receiveMsgGroup", data => {
        // 当前在群聊面板
        this.setMsgGroupJson(data);
        if (this.tag) {
          // 判断收到的是不是当前群聊的，不是就标记红点，是就绘制聊天内容
          if (data.roomId === this.sendChatGroup) {
            this.drawChatGroupMsgList();
          } else {
            $(".me_" + data.roomId).innerHTML =
              parseInt($(".me_" + data.roomId).innerHTML) + 1;
            $(".me_" + data.roomId).style.display = "block";
          }
        } else {
          // 当前在个人聊天页面，群聊提示新消息  并且群聊列表中对应群聊提示新消息
          $(".me-group-chat-tab").innerHTML =
            parseInt($(".me-group-chat-tab").innerHTML) + 1;
          $(".me-group-chat-tab").style.display = "block";

          $(".me_" + data.roomId).innerHTML =
            parseInt($(".me_" + data.roomId).innerHTML) + 1;
          $(".me_" + data.roomId).style.display = "block";
        }
      });

      this.socket.on("chatGroupList", chatGroup => {
        this.chatGroupList.push(chatGroup);
        this.drawChatGroupList();
      });

      this.socket.on("createChatGroup", data => {
        socket.emit("joinChatGroup", {
          id: this.id,
          userName: this.userName,
          info: data
        });
      });
      this.socket.on("chatGrSystemNotice", data => {
        this.setMsgGroupJson(data);
        if (this.tag) {
          $(".me_" + data.roomId).innerHTML =
            parseInt($(".me_" + data.roomId).innerHTML) + 1;
          $(".me_" + data.roomId).style.display = "block";
          this.drawChatGroupMsgList();
        } else {
          $(".me-group-chat-tab").innerHTML =
            parseInt($(".me-group-chat-tab").innerHTML) + 1;
          $(".me-group-chat-tab").style.display = "block";

          $(".me_" + data.roomId).innerHTML =
            parseInt($(".me_" + data.roomId).innerHTML) + 1;
          $(".me_" + data.roomId).style.display = "block";
        }
      });

      this.socket.on("leaveChatGroup", data => {
        // 当前客户端退出群聊
        if (data.id === this.id) {
          this.chatGroupList = this.chatGroupList.filter(
            item => item.roomId !== data.roomId
          );
          this.drawChatGroupList();
        } else {
          this.setMsgGroupJson(data);
          if (this.tag) {
            $(".me_" + data.roomId).innerHTML =
              parseInt($(".me_" + data.roomId).innerHTML) + 1;
            $(".me_" + data.roomId).style.display = "block";
            this.drawChatGroupMsgList();
          } else {
            $(".me-group-chat-tab").innerHTML =
              parseInt($(".me-group-chat-tab").innerHTML) + 1;
            $(".me-group-chat-tab").style.display = "block";

            $(".me_" + data.roomId).innerHTML =
              parseInt($(".me_" + data.roomId).innerHTML) + 1;
            $(".me_" + data.roomId).style.display = "block";
          }
        }
      });
    },
    // --------7------设置个人信息
    setMyInfo() {},
    // -----------8-------绘制个人列表
    drawUserList() {
      this.userList.forEach((item, index) => {
        if (item.id == this.id) {
          this.userList.splice(index, 1);
        }
      });
      // $(".friends-info").innerHTML = str;
    },
    // --------9-------选择好友
    changeChat(item) {
      this.messageDefault = false;
      this.showGroupPanel = false;
      this.messageWrapper = true;
      this.chartnamepeople = item.userName;
      this.chartnamepeopleId = item.id;

      if (item.id !== this.sendFriend) {
        // this.messagebox = false;
        this.sendFriend = item.id;
        // --------10-------绘制聊天消息列表
        this.drawMessageList();
        $(".me_" + this.sendFriend).innerHTML = 0;
        $(".me_" + this.sendFriend).style.display = "none";
      }
    },
    // -------10-------
    drawMessageList() {
      //如果消息列表不存在该用户，直接return
      if (!this.messageJson[this.sendFriend]) {
        this.messageArry = [];
        return;
      }
      // 遍历消息列表
      this.messageJson[this.sendFriend].forEach(item => {
        // 将消息展示
        if (item.sendId === this.id) {
          item.round = "right";
        } else {
          item.round = "left";
        }
      });
      this.messageArry = this.messageJson[this.sendFriend];
      this.contentInpu = "";
    },
    // -----------11-------发送消息
    sendMessage() {
      if (!this.sendFriend) {
        alert("请选择好友！");
      } else {
        let info = {
          sendId: this.id, // 发送者id
          id: this.sendFriend, // 接收者id
          userName: this.userName,
          img: this.userImg, // 发送者头像
          msg: this.contentInpu // 发送内容
        };
        this.socket.emit("sendMsg", info);
        // 设置聊天消息列表数据
        if (this.messageJson[this.sendFriend]) {
          this.messageJson[this.sendFriend].push(info);
        } else {
          this.messageJson[this.sendFriend] = [info];
        }
        // 页面绘制聊天消息
        this.drawMessageList();
      }
    },
    // ----------12---------设置数据
    setMessageJson(data) {
      if (this.messageJson[data.sendId]) {
        this.messageJson[data.sendId].push(data);
      } else {
        this.messageJson[data.sendId] = [data];
      }
    },
    changeTab(cls, listCls, tag) {
      this.tag = tag;
      if (tag) {
        this.showFriends = false;
        this.showChatPanel = false;
        this.showGroupFriends = true;
        this.showGroupPanel = true;
        this.chantPanel = false;
      } else {
        this.showFriends = true;
        this.showChatPanel = true;
        this.showGroupFriends = false;
        this.showGroupPanel = false;
        this.chantPanel = true;
        this.tipNumber = 0;
        this.showTip = false;
      }
    }
  },
  mounted() {
    this.getStyle();
    this.init();
  }
};
</script>

<style lang="less" scoped>
.container {
  display: flex;
}
.user-panel {
  width: 240px;
}
.chat-panel {
  width: 600px;
  border: 1px solid #eee;
  position: relative;
}
.select {
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
  width: 300px;
}
.user-list-wrap {
  width: 100%;
}
.chat-group-list {
  margin-top: 15px;
}
.user-item,
.chat-group-item {
  width: 100%;
  position: relative;
}
.chat-group-item {
  display: flex;
  justify-content: space-between;
}
.circle {
  position: absolute;
  top: 0;
  left: 0;
  width: 18px;
  height: 18px;
  line-height: 18px;
  text-align: center;
  font-size: 12px;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border-radius: 50%;
  background-color: red;
  color: #fff;
}
.wrap-box {
  height: 100%;
}
.wrap-box .name-info {
  min-height: 30px;
  font-size: 18px;
  padding-left: 15px;
}
.message-box,
.group-chat-box {
  background-color: rgb(245, 245, 245);
  position: relative;
}
.box {
  width: 600px;
  height: 260px;
  border: 1px solid #eee;
  overflow-y: scroll;
  text-align: center;
}
.default-bg {
  background-color: #eee;
  font-size: 14px;
  text-align: center;
  height: 350px;
  line-height: 350px;
  color: #908d8d;
}
.inp-box {
  width: 600px;
  height: 50px;
  outline: none;
}
.btn {
  float: right;
}
.msg-box {
  display: flex;
  align-items: center;
  margin: 5px 0;
}
.msg {
  background-color: #fff;
  padding: 5px;
  max-width: 220px;
  text-align: left;
}
.msg-box.right .msg {
  margin-right: 10px;
}
.msg-box.left .msg {
  margin-left: 10px;
}
.right {
  justify-content: flex-end;
  text-align: right;
  img {
    // position: absolute;
    // right: 0;
  }
}

.tab {
  display: flex;
  margin-bottom: 15px;
}
.tab-box {
  position: relative;
}
.tab-item {
  width: 80px;
  padding-left: 20px;
  position: relative;
  cursor: default;
}
.group-chat-info {
  display: none;
}
.emoji-icon {
  width: 25px;
  height: 25px;
}
.emoji {
  display: none;
  position: absolute;
  width: 600px;
  bottom: 100px;
  background-color: #fff;
  padding: 15px;
  z-index: 2;
  box-sizing: border-box;
}
.emot {
  display: none;
  position: absolute;
  width: 600px;
  bottom: 100px;
  background-color: #fff;
  padding: 15px;
  z-index: 2;
  box-sizing: border-box;
}
.mask {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  display: none;
  background-color: rgba(0, 0, 0, 0.5);
}
.system {
  font-size: 12px;
  transform: scale(0.9);
  display: inline-block;
  color: #fff;
  background-color: rgb(218, 218, 218);
  -webkit-border-radius: 15px;
  -moz-border-radius: 15px;
  border-radius: 15px;
  padding: 0 5px;
}
.hidden {
  display: none;
}
// .right{
//     text-align: right;
// }
// .left{
//     text-align: left;
// }
</style>
