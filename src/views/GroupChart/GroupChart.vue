<template>
  <div class="container">
    <div @click="showChartPanel"
      v-if="!showChartPanels" class="jm-chart-icon">
      <Button label="small" type="primary" icon="ios-chatbubbles">打开聊天窗</Button>
    </div>
  
       <Modal
        width="875px"
        v-model="showChartPanels"
        class-name="vertical-center-modal" footer-hide
      >
      <div class="user-panel">
        <div class="user-list-wrap">
          <div id="my-info" class="name-info user-item">
            <img class="panel-top-icon block-in" :src="userImg" />
            <div class="panel-top-text block-in">
              <div class="panel-top-name">
                {{ userName }}
                <span class="chat-id">{{
                  userId.substring(userId.length - 4)
                }}</span>
              </div>
              <div class="panel-online">在线</div>
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
            <!-- <div class="group-chat-tab-box tab-box">
              <div
                class="group-chat-tab tab-item"
                @click="changeTab('group-chat-wrap', 'group-chat-info', 1)">
                我的群聊
              </div>
              <div class="circle me-group-chat-tab">0</div>
            </div> -->
          </div>
          <div v-if="showFriends" class="friends-info info-wrapper">
            <div
              v-for="(item, index) in oneChartList"
              :key="index"
              class="user-item friends-item"
              @click="changeChat(item)"
            >
              <Badge :count="item.siLiaoNum">
                <img :src="item.chartNameHead" />
              </Badge>
              <div class="panel-top-text block-in">
                <!-- {{item}} -->
                <div class="panel-top-name">
                  {{ item.chartName }}
                  <span class="chat-id">{{
                    item.chatId.substring(item.chatId.length - 4)
                  }}</span>
                </div>
                <div class="panel-online">在线</div>
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
      <div v-if="chatPanel" class="chat-panel">
        <div v-if="showChatPanel" class="message-wrap">
          <div v-if="messageDefault" class="default-bg message-default">
                    <!-- <div @click="cancleChart" class="cancel-chart-default cancel-chart">x</div> -->
            <span>点击好友开始聊天吧！</span>
          </div>
          <div v-if="messageWrapper" class="message-wrapper wrap-box">
            <!-- 联系人信息 -->
            <div class="name-info">
              <img class="panel-top-icon block-in" :src="chartNameHead" />
              <div class="panel-top-text block-in">
                <div class="panel-online">在线</div>
                <div class="panel-top-name">
                  {{ chartnamepeople }}
                  <span class="chat-id">
                    {{
                      chartnamepeopleId.substring(chartnamepeopleId.length - 4)
                    }}
                  </span>
                </div>
                
              </div>
              <!-- <div @click="cancleChart" class="cancel-chart">x</div> -->
            </div>

            <div class="message-box box">
              <!-- 聊天消息区 -->
              <div
                v-for="(item, index) in messageArry"
                :key="index"
                :class="item.round"
                class="msg-box"
              >
                <img
                  class="head-icon"
                  v-if="item.round == 'left'"
                  :src="item.img"
                />
                <div v-if="item.round == 'left'" class="triangle-left"></div>
                <div
                  @click="getItemDetail($event)"
                  v-if="item.round == 'left'"
                  class="msg"
                  v-html="item.msg"
                ></div>

                <div
                  @click="getItemDetail($event)"
                  v-if="item.round == 'right'"
                  class="msg"
                  v-html="item.msg"
                ></div>
                <div v-if="item.round == 'right'" class="triangle-right"></div>
                <img
                  class="head-icon"
                  v-if="item.round == 'right'"
                  :src="item.img"
                />
              </div>
            </div>
            <div class="input-box">
              <!-- 输入框的菜单按钮栏 -->
              <div class="send-img-box">
                <img
                  class="emoji-icon"
                  src="./static/emoji.png"
                  @click="showEmojiBox('emoji')"
                />
                <img
                  class="emoji-icon imgBox"
                  src="./static/emoji1.png"
                  @click="showEmojiBox('emot')"
                />
                <Button
                  type="info"
                  class="show-resume-icon"
                  @click="showEmojiBox('resume')"
                  >show简历</Button
                >
              </div>
              <!-- 输入文字区 -->
              <div
                class="inp inp-box"
                contenteditable="true"
                placeholder="在此输入消息..."
              ></div>
            </div>
          </div>
        </div>
        <div class="btn" v-if="messageWrapper">
          <span>可按下Enter发送消息</span>
          <button @click="sendMessage" class="send-message">发 送</button>
        </div>
        <div class="emoji" v-if="showEmoji[0]">
          <!-- 表情包选择区 -->
          <img
            :src="'http://localhost:3000/static/emoticon/emoji/' + item"
            @click="chooseEmoji(item, 'emoji')"
            v-for="(item, index) in emoji"
            :key="index"
            style="width:30px;height:30px"
          />
        </div>
        <div class="emot" v-if="showEmoji[1]">
          <!-- 斗图选择区 -->
          <img
            :src="'http://localhost:3000/static/emoticon/emot/' + item"
            @click="chooseEmoji(item, 'emot')"
            v-for="(item, index) in emot"
            :key="index"
            style="width:60px;height:60px"
          />
        </div>
        <div
          class="mask"
          v-if="showEmoji[2]"
          @click="showEmojiBox('mask')"
        ></div>
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
            <div class="send-img-box"></div>
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
      <!-- 简历确定弹窗 -->
      <Modal
        v-model="modalResume"
        title="提示..."
        @on-ok="ok"
        @on-cancel="cancel"
      >
        <p>您发送的简历将会展示全部信息</p>
        <p>包括您的电话,邮箱,住址等</p>
        <p>点击确定发送</p>
      </Modal>
      <!-- 消息记录中点击图片的弹窗 -->
      <Modal
        width="1100px"
        v-model="showBigImg"
      
      >
        <img :src="bigImgSrc" />
      </Modal>
   
      </Modal>
  
  </div>
</template>

<script>
import io from "socket.io-client";
export default {
  name: "GroupChart",
  props: ["chartName", "shareId"],
  data() {
    return {
      userId: "", //登录用户ID
      userName: "", // 当前登录用户名;
      userImg: "", // 用户头像
      socketid: "", // 用户socketId
      userList: [], // 好友列表
      chatGroupList: [], // 群聊列表
      sendFriend: "", // 当前聊天好友的用户socketId
      sendChatGroup: "", // 当前聊天的群聊的roomId
      messageJson: {}, // 好友消息列表
      msgGroupJson: {}, // 群聊消息列表
      tag: 0, // 0 我的好友面板  1 群聊面板
      chartnamepeople: "", //当前联系人
      messageArry: [], //当前好友聊天信息

      chartnamepeopleId: "", //当前联系人Id
      showChatPanel: true, //显示私聊面板
      showGroupPanel: false, //显示群聊面板
      showFriends: true, //显示好友信息
      showGroupFriends: false, //显示群聊信息
      tipNumber: 0, //提醒消息数
      showTip: false, //显示消息提示
      showsiLiao: false, //显示私聊提示-------------
      messageWrapper: false, //显示私聊面板
      messageDefault: true, //显示聊天面板提示信息\
      contentInpu: "", //输入框内容
      chatPanel: true, //私聊面板
      messagebox: true, //
      chatId: "", //聊天对象id
      reluserList: [], //实际联系人列表
      oneChartList: [], //存在数据库的用户联系表
      chartNameHead: "", //联系人么头像
      emoji: [], //表情包列表
      emot: [], //斗图包列表
      modal3: false,
      showEmoji: [false, false, false], //显示表情包，斗图，遮罩层
      inputArry: [], //发送的内容数组
      modalResume: false, //
      resumeUrl: "", //发送的简历url
      showBigImg: false,
      bigImgSrc: "", //点击消息的图片显示大图
      receiveData: "", //接收的消息
      showChartPanels: false //是否展示聊天icon
    };
  },

  methods: {
    unique(arr) {
      const res = new Map();
      return arr.filter(arr => !res.has(arr.userId) && res.set(arr.userId, 1));
    },
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
      this.showGroupPanel = false;
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

    chooseEmoji(name, data) {
      if (data == "emoji") {
        $(
          ".inp"
        ).innerHTML += `<img style="width:30px;height:30px" src="http://localhost:3000/static/emoticon/emoji/${name}" />`;
      } else if (data == "emot") {
        $(
          ".inp"
        ).innerHTML += `<img style="width:30px;height:30px" src="http://localhost:3000/static/emoticon/emot/${name}" />`;
      } else if (data == "resume") {
        $(
          ".inp"
        ).innerHTML += `<img style="width:30px;height:30px" src="${name}" />`;
      }
      this.showEmojiBox("mask");
    },

    // ---------4-------获取头像等数据
    setAllPorarait() {
      this.axios
        .get("charts/getChatImgList", {})
        .then(res => {
          if (res.data.status == "0") {
            let datas = res.data.result;
            this.emoji = datas.emoji;
            this.emot = datas.emot;
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
        // $(".chat-panel").style.display = "block";
        // this.chatPanel = true
        this.userName = userName;
        this.userImg = userImg;
        this.socketid = this.socket.id;
        let userInfo = {
          socketid: this.socket.id,
          userId: this.userId,
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
      });

      this.socket.on("quit", id => {
        this.userList = this.userList.filter(item => item.id != id);
        // this.drawUserList();
      });
      this.socket.on("receiveMsg", data => {
        var flags = false;
        // 默认发送消息的用户不存在联系列表里
        // 接收消息的时候，如果是新用户联系自己，将新用户添加到自己的联系表里

        this.oneChartList.forEach((item, index) => {
          if (item.chatId == data.sendId) {
            flags = true;
          }
        });
        if (!flags) {
          this.postOneCharts(data.userName, data.sendId, data.img);
        }

        // --------12--------设置数据
        this.setMessageJson(data);

        if (data.sendId === this.sendFriend) {
          this.drawMessageList();
        } else {
          for (var i = 0; i < this.oneChartList.length; i++) {
            if (this.oneChartList[i].chatId == data.sendId) {
              this.oneChartList[i].siLiaoNum =
                this.oneChartList[i].siLiaoNum + 1;
            }
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
      // this.chartnamepeople =
    },
    // --------9-------选择好友
    changeChat(item) {
      this.messageDefault = false;
      this.showGroupPanel = false;
      this.messageWrapper = true;

      this.chartnamepeople = item.chartName;
      this.chartnamepeopleId = item.chatId;
      this.chartNameHead = item.chartNameHead;

      if (item.chatId !== this.sendFriend) {
        this.messagebox = false;
        // this.messagebox = false;
        this.sendFriend = item.chatId;
        // --------10-------绘制聊天消息列表
        this.drawMessageList();
      }
      this.oneChartList.forEach((item1, index) => {
        if (item1.chatId == item.chatId) {
          this.oneChartList[index].siLiaoNum = 0;
        }
      });
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
        if (item.sendId === this.userId) {
          item.round = "right";
        } else {
          item.round = "left";
        }
      });
      this.messageArry = this.messageJson[this.sendFriend];
      // this.contentInpu = "";
      if ($(".inp")) {
        $(".inp").innerHTML = "";
      }
    },
    // -----------11-------发送消息
    sendMessage() {
      if (!$(".inp").innerHTML) {
        this.$Message.warning("消息不能为空");
        return false;
      }
      if (!this.sendFriend) {
        alert("请选择好友！");
      } else {
        let info = {
          sendId: this.userId, // 发送者id
          id: this.sendFriend, // 接收者id
          userName: this.userName,
          img: this.userImg, // 发送者头像
          msg: $(".inp").innerHTML // 发送内容
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
        this.chatPanel = false;
      } else {
        this.showFriends = true;
        this.showChatPanel = true;
        this.showGroupFriends = false;
        this.showGroupPanel = false;
        this.chatPanel = true;
        this.tipNumber = 0;
        this.showTip = false;
      }
    },
    getOneCharts(name) {
      this.axios
        .get("charts/getOneCharts", {
          params: {
            userId: localStorage.getItem("userId")
          }
        })
        .then(res => {
          if (res.data.status == "0") {
            this.oneChartList = res.data.result;
            this.init();
          }
        });
    },
    postOneCharts(a, b, c, d) {
      this.axios
        .post("charts/postOneCharts", {
          data: {
            userName: this.userName,
            chartName: a,
            userId: localStorage.getItem("userId"),
            chartId: b,
            chartNameHead: c,
            flag: d
          }
        })
        .then(res => {
          if (res.data.status == "0") {
            this.getOneCharts("noFirst");
          }
        })
        .catch(err => {});
    },
    showEmojiBox(data) {
      if (data == "emoji") {
        this.showEmoji = [true, false, true];
      } else if (data == "emot") {
        this.showEmoji = [false, true, true];
      } else if (data == "mask") {
        this.showEmoji = [false, false, false];
      } else if (data == "resume") {
        this.modalResume = true;
      }
    },
    ok() {
      this.$Message.info("ok");
      this.getImgList();
    },
    cancel() {
      this.$Message.info("cancel");
    },
    getImgList() {
      this.axios
        .get("resumeTemplates/getMyResume", {
          params: {
            userName: localStorage.getItem("userName")
          }
        })
        .then(res => {
          if (res.data.status == "0") {
            var imgList = res.data.result;
            imgList.forEach((item, index) => {
              if (item.name == this.shareId) {
                this.chooseEmoji(item.url, "resume");
              }
            });
          }
        })
        .catch(err => {});
    },
    // 笔记
    getItemDetail(e) {
      if (e.target.currentSrc) {
        this.showBigImg = true;
        this.bigImgSrc = e.target.currentSrc;
      }
    },
    // 显示聊天面板
    showChartPanel() {
      this.showChartPanels = !this.showChartPanels;
    },
    // // 关闭聊天窗口
    // cancleChart() {
    //   this.showChartPanels = true;
    // }
  },
  mounted() {
    // 子组件监听父组件的事件
    this.$on("bridge", ([userNames, userIds, userImgs]) => {
      this.postOneCharts(userNames, userIds, userImgs, "postChat");
    });
    this.getStyle();
    this.getOneCharts("First");
  }
};
</script>

<style lang="less" scoped>
.cancel-chart {
      float: right;
    padding-right: 5px;
    font-size: 22px;
    margin-top: -5px;
    cursor: pointer;
}
.cancel-chart-default{
    line-height: 30px;
}
.jm-chart-icon {
 
  color: rgba(0, 153, 229, 0.7);
  position: fixed;
  right:30px;
  bottom: 150px;
  cursor: pointer;
 
}
.block-in {
  display: inline-block;
}
.container {
  display: flex;
  margin: 10px;
  position: relative;
}
.user-panel {
  display: inline-block;
  width: 240px;
  height: 450px;
  overflow-y: scroll;
  background: rgba(45, 140, 240, 0.2);
}
.chat-panel,
.user-list-wrap {
  width: 600px;
  float: right;
  display: inline-block;
  height: 450px;
  position: relative;
  .message-wrap {
    border: 2px solid #f8f8f9;
    .name-info {
      padding-top: 5px;
      margin-bottom: 5px;
      height: 50px;
      font-size: 18px;
      padding-left: 15px;
      .panel-top-icon {
        height: 40px;
        width: 40px;
        line-height: 40px;
        border-radius: 20px;
      }
      .panel-top-text {
        margin-left: 20px;
        font-size: 18px;
        height: 20px;
        line-height: 20px;
        .panel-top-name {
          .chat-id {
            color: #808695;
            font-size: 14px;
          }
        }
        .panel-online {
          font-size: 14px;
          color: #808095;
        }
      }
    }
  }
}
// 个人信息
#my-info {
  margin: 10px;
  border-bottom: 1px solid #eee;
  height: 80px;
  // line-height: 80px;
  img {
    width: 60px;
    height: 60px;
    border-radius: 10px;
  }
}
// 聊天消息区
.message-box {
  overflow-y: auto;
  .right {
    .msg {
      border-radius: 5px 0 5px 5px;
    }
  }
  .left {
    .msg {
      border-radius: 0 5px 5px 5px;
    }
  }
  .msg-box {
    padding: 5px;

    .triangle-right,
    .triangle-left {
      margin-top: -10px;
      border-top: 10px solid #fff;
      border-bottom: 10px solid transparent;
      border-right: 10px solid transparent;
    }
    .triangle-left {
      border-left: 10px solid transparent;
      border-right: none;
    }
    .head-icon {
      width: 40px;
      height: 40px;
    }
  }
}
// 好友列表
.friends-info {
  .friends-item {
    border-bottom: 1px solid #eee;
    padding: 15px;
    img {
      height: 40px;
      width: 40px;
    }
    .panel-top-text {
      margin-left: 15px;
      .panel-online {
        color: #808695;
      }
    }
  }
}
.demo-badge {
  width: 42px;
  height: 42px;
  background: #eee;
  border-radius: 6px;
  display: inline-block;
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
.message-box {
  background: #f8f8f9;
}
.box {
  width: 598px;
  height: 280px;
  // border: 1px solid #eee;
  // overflow-y: scroll;
  // text-align: center;
}
.default-bg {
  background: #f8f8f9;
  font-size: 14px;
  text-align: center;
  height: 450px;
  line-height: 450px;
  color: #908d8d;
}
.inp-box {
  width: 597px;
  border: 2px solid #f8f8f9;
  height: 50px;
  outline: none;
}
.btn {
  float: right;
  padding: 5px;
  padding-right: 0;
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
  // margin-right: 10px;
}
.msg-box.left .msg {
  // margin-left: 10px;
}
.right {
  justify-content: flex-end;

  // text-align: right;
  // img {
  //   // position: absolute;
  //   // right: 0;
  // }
}

.tab {
  display: flex;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-bottom: 15px;
}
.show-resume-icon {
  height: 25px;
  padding: 2px;
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
  // display: none;
  position: absolute;
  width: 600px;
  bottom: 100px;
  background-color: #fff;
  padding: 15px;
  z-index: 2;
  box-sizing: border-box;
}
.emot {
  // display: none;
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
.panel-top-icon {
  width: 40px;
  height: 40px;
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
