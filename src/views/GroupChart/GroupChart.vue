<template>
  <div class="container">
    <div class="user-panel">
      <!-- 注册模块 -->
      <div id="login-wrap">
        <input class="user-name contenteditable" placeholder="请输入用户名" />
        <div class="user-portrait">
          <span class="tips">请选择一张图片作为头像</span>
          <img class="my-por" style="width: 60px;height: 60px;" />
        </div>
        <!-- 头像备选区 -->
        <div class="select" id="portrait"></div>
        <button class="chat-btn">开始聊天</button>
      </div>

      <div class="user-list-wrap">
        <div class="my-info"></div>
        <div class="tab">
          <div class="friend-tab-box tab-box">
            <div
              class="friend-tab tab-item"
              style="color: #308e56;"
              @click="changeTab('message-wrap', 'friends-info', 0)"
            >
              我的好友
            </div>
            <div class="circle me-friend-tab" style="display: none;">0</div>
          </div>
          <div class="group-chat-tab-box tab-box">
            <div
              class="group-chat-tab tab-item"
              @click="changeTab('group-chat-wrap', 'group-chat-info', 1)"
            >
              我的群聊
            </div>
            <div class="circle me-group-chat-tab" style="display: none;">0</div>
          </div>
        </div>
        <div class="friends-info info-wrapper">
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
            <div :class="['circle', 'me_' + item.id]" style="display: none;">
              0
            </div>
          </div>
        </div>
        <div class="group-chat-info info-wrapper">
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
    <div class="chat-panel hidden">
      <div class="message-wrap">
        <div class="default-bg message-default">
          <span>点击好友开始聊天吧！</span>
        </div>
        <div class="message-wrapper wrap-box hidden">
          <!-- 联系人信息 -->
          <div class="friend name-info">
            {{chartnamepeople}}
          </div>
          <div class="message-box box"></div>
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
              class="inp inp-box"
              contenteditable="true"
              placeholder="在此输入消息..."
            ></div>
            <div class="btn">
              <span>按下Enter发送消息</span>
              <button class="send-message">发 送</button>
            </div>
          </div>
        </div>
      </div>
      <!-- 群聊 -->
      <div class="group-chat-wrap">
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
  </div>
</template>

<script>
import io from "socket.io-client";
export default {
  name: "GroupChart",
  props: ["intoName"],
  data() {
    return {
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
      chartnamepeople:"",//当前联系人
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
      // ------3-----
      this.selectClick();
      // -------4-------
      this.setAllPorarait();
      // 如果本地保存了用户的头像和名字，隐藏注册模块
      if (this.userName && this.userImg) {
        $("#login-wrap").style.display = "none";
        // --------5--------
        this.login(this.userName, this.userImg);
      } else {
        // 一开始点击一次，不然不会往本地存数据，点击开始聊天
        $(".chat-btn").onclick = () => {
          let userName = $(".user-name").value; //输入用户名框的值
          let userImg = $(".my-por").getAttribute("src"); //选择的头像的值
          // --------5-------
          this.login(userName, userImg);
        };
      }
    },
    // --------3-----选择头像
    selectClick() {
      $(".group-chat-wrap").style.display = "none";
      // 点击选择头像
      $(".select").onclick = function(e) {
        $(".my-por").setAttribute("src", e.target.getAttribute("src"));
      };
      // 私聊的回车
      $(".inp").onkeydown = e => {
        // 回车事件
        if (e.code === "Enter") {
          e.preventDefault ? e.preventDefault() : (e.returnValue = false);
          // -------11--------发送消息
          this.sendMessage();
        }
      };
      // 点击私聊的发送
      $(".send-message").onclick = () => {
        this.sendMessage();
      };
      // 点击群聊的发送
      $(".send-message-group-chat").onclick = () => {
        this.sendMessageGroup();
      };
      // 群聊的回车
      $(".group-chat-inp").onkeydown = e => {
        // 回车事件
        if (e.code === "Enter") {
          e.preventDefault ? e.preventDefault() : (e.returnValue = false);
          this.sendMessageGroup();
        }
      };

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
            let datas = res.data.result;
            let emoji = datas.emoji;
            let portrait = datas.portrait;
            let emot = datas.emot;
            let str = "";
            portrait.forEach(item => {
              str += `<img style="width: 60px;height: 60px;" src="http://localhost:3000/static/portrait/${item}" />`;
            });
            document.getElementById("portrait").innerHTML = str;

            str = "";
            emoji.forEach(item => {
              str += `<img style="width: 30px;height: 30px;" src="static/emoticon/emoji/${item}" />`;
            });
            $(".emoji").innerHTML = str;

            str = "";
            emot.forEach(item => {
              str += `<img style="width: 70px;height: 70px;" src="static/emoticon/emot/${item}" />`;
            });
            $(".emot").innerHTML = str;
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
        // 隐藏注册模块
        $("#login-wrap").style.display = "none";
        // 打开聊天面板
        $(".chat-panel").style.display = "block";
        this.userName = userName;
        this.userImg = userImg;
        this.id = this.socket.id;
        let userInfo = {
          id: this.socket.id,
          userName: userName,
          userImg: userImg
        };
        localStorage.setItem("userName", userName);
        localStorage.setItem("userImg", userImg);
        this.socket.emit("login", userInfo);
        //---------7------设置个人信息
        this.setMyInfo();
      });
      this.socket.on("userList", userList => {
        this.userList = userList;
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
          // 当前在群聊面板收到了单人聊天消息
          $(".me-friend-tab").innerHTML =
            parseInt($(".me-friend-tab").innerHTML) + 1;
          $(".me-friend-tab").style.display = "block";

          // 好友列表中对应好友提示新消息
          $(".me_" + data.sendId).innerHTML =
            parseInt($(".me_" + data.sendId).innerHTML) + 1;
          $(".me_" + data.sendId).style.display = "block";
        } else {
          if (data.sendId === this.sendFriend) {
            this.drawMessageList();
          } else {
            $(".me_" + data.sendId).innerHTML =
              parseInt($(".me_" + data.sendId).innerHTML) + 1;
            $(".me_" + data.sendId).style.display = "block";
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
    setMyInfo() {
      $(
        ".my-info"
      ).innerHTML = `<div class="user-item" style="border-bottom: 1px solid #eee;margin-bottom: 30px;">
                            <img src="${
                              this.userImg
                            }"  style="width: 60px;height: 60px;">
                            <span>${this.userName}</span>
                        </div>`;
    },
    // -----------8-------绘制个人列表
    drawUserList() {
      let str = "";
      this.userList.forEach((item, index) => {
        if (item.id == this.id) {
          this.userList.splice(index, 1);
          // str += `<div class="user-item friend-item" @click="changeChat(this)">
          //                   <img src="${
          //                     item.userImg
          //                   }"  style="width: 60px;height: 60px;">
          //                   <span>${item.userName}${item.id}</span>
          //                   <input type="hidden" value="${item.id}">
          //                   <div class="circle me_${
          //                     item.id
          //                   }" style="display: none;">0</div>
          //               </div>`;
        }
      });
      $(".friends-info").innerHTML = str;
    },
    // --------9-------选择好友
    changeChat(item) {
      $(".message-default").style.display = "none";
      // 打开私聊面板
      $(".message-wrapper").style.display = "block";
      //关联联系人信息
      this.chartnamepeople=item.userName+item.id
      // $(".friend").innerHTML = e.children[1].innerHTML;
      $(".inp").focus();

      if (item.id !== this.sendFriend) {
        $(".message-box").innerHTML = "";
        $(".message-box").scrollTop = 0;
        // this.sendFriend = e.children[2].value;
        this.sendFriend = item.id;
// --------10-------绘制聊天消息列表
        this.drawMessageList();
        $(".me_" + this.sendFriend).innerHTML = 0;
        $(".me_" + this.sendFriend).style.display = "none";
      }
    },
    // -------10-------
       drawMessageList() {
        let msg = '';
        //如果消息列表不存在该用户，直接return
        if (!this.messageJson[this.sendFriend]) return;
        // 遍历消息列表
        this.messageJson[this.sendFriend].forEach(item => {
          // 将消息展示
            if (item.sendId === this.id) {
                msg += `<div class="msg-box right">
                            <div class="msg">${item.msg}</div>
                            <img src="${item.img}"  style="width: 60px;height: 60px;">
                        </div>`
            } else {
                msg += `<div class="msg-box left">
                            <img src="${item.img}"  style="width: 60px;height: 60px;">
                            <div class="msg">${item.msg}</div>
                        </div>`
            }
        })
        $('.message-box').innerHTML = msg;
        $('.message-box').scrollTop = $('.message-box').scrollHeight;
        $('.inp').innerHTML = '';
        $('.inp').focus();
    },
    // -----------11-------发送消息
    sendMessage() {
        if (!this.sendFriend) {
            alert('请选择好友！');
        } else {
            let info = {
                sendId: this.id, // 发送者id
                id: this.sendFriend, // 接收者id
                userName: this.userName,
                img: this.userImg, // 发送者头像
                msg: $('.inp').innerHTML // 发送内容
            }
            this.socket.emit('sendMsg', info)
            // 设置聊天消息列表数据
            if (this.messageJson[this.sendFriend]) {
                this.messageJson[this.sendFriend].push(info)
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
            this.messageJson[data.sendId].push(data)
        } else {
            this.messageJson[data.sendId] = [data];
        }
    },
    changeTab(cls, listCls, tag) {
    this.tag = tag;
    if (tag) {
        $('.friends-info').style.display = 'none';
        $('.message-wrap').style.display = 'none';

        $('.group-chat-info').style.display = 'block';
        $('.group-chat-wrap').style.display = 'block';

        $('.me-group-chat-tab').innerHTML = 0;
        $('.me-group-chat-tab').style.display = 'none';

        $('.friend-tab').style.color = '#000';
        $('.group-chat-tab').style.color = '#308e56';
    } else {
        $('.friends-info').style.display = 'block';
        $('.message-wrap').style.display = 'block';

        $('.group-chat-info').style.display = 'none';
        $('.group-chat-wrap').style.display = 'none';

        $('.me-friend-tab').innerHTML = 0;
        $('.me-friend-tab').style.display = 'none';

        $('.group-chat-tab').style.color = '#000';
        $('.friend-tab').style.color = '#308e56';

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
</style>
