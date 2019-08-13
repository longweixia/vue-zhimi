<template>
  <div>

    <Layout class="layout zm">
      <!-- 左侧群，联系列表信息 -->
      <Sider hide-trigger class="zm-left-side">Sider</Sider>
      <!-- 聊天主页面 -->
      <Layout class="zm-center">
        <Header class="zm-right-header">
          <div class="zm-top">
            <div class="zm-icon">
              <img src="static/image/user1.jpg" />
            </div>
            <div class="zm-user">
              <div>龙伟</div>
              <div>online</div>
            </div>
          </div>

        </Header>
        <!-- 聊天消息区 -->
        <Content class="zm-right-content">
          <div class="zm-top">以前或者更早以前</div>
          <ul class="zm-msg">
            <li
              v-for="(item,index) in msgList"
              :key="index"
              :class="item.round=='left'?'zm-msg-detail':'right'"
            >
              <img
                :src="item.img"
                class="zm-msg-log"
              />
              <div class="zm-log-user">
              <span>{{item.name}}</span>
              <span class="zm-log-time">2019/08/13 22:56</span>
               </div>
              <div :class="item.round=='left'?'zm-left-bg':'zm-right-bg'">
                {{item.msg}}
                </div>
          
            </li>
            <!-- 提示有用户进来了 -->
          <div
            class='system'
            v-if="systemNews"
          >
            <div>{{chartDeta}}</div>
            <div>{{chartName}} {{chartStatus}}了聊天室</div>
          </div>
          </ul>
          
         
           <Footer class="zm-footer">
          <div>
            <Input
              v-model="inputMsg"
              placeholder="Enter something..."
              class="zm-input" 
            />
            <Icon
              size="35"
              type="ios-send" @click="postMsg"
            />
          </div>
        </Footer>
        </Content>
        <!-- 输入框 -->
      
      </Layout>
         <!-- 右侧群信息 -->
      <Sider hide-trigger class="zm-right-side">
         <!-- 显示群聊信息 -->
          <div class="zm-group-content">
            <div>群友信息</div>
            <ul class="zm-msg">
              <li
                v-for="(item,index) in userList"
                :key="index"
                class="zm-msg-detail"
              >
                <img
                  :src="item.img"
                  class="zm-msg-log"
                />
                <span>{{item.userName}}</span>
              </li>
            </ul>
          </div>
      </Sider>
    </Layout>
  </div>
</template>

<script>
import io from "socket.io-client";
export default {
  name: "GroupChart",
  data() {
    return {
      msgLeft: true, //左边消息，即他人的消息，用来展示作为左边样式类的判断
      msgList: [
        // {
        //   img: "static/image/user1.jpg",
        //   msg:
        //     "我已经更新了网站内容，菲奥娜，希望一切都好吗？请告诉我还有什么变化",
        //   type: "left"
        // },
        // {
        //   img: "static/image/user2.jpg",
        //   msg: "啊！太好了。我现在得走了，明天我会赶上你的。",
        //   type: "right"
        // },
        // {
        //   img: "static/image/user1.jpg",
        //   msg: "不用担心，我很高兴你快乐！",
        //   type: "left"
        // },
        // {
        //   img: "static/image/user2.jpg",
        //   msg: "你能帮我检查一下照片吗？",
        //   type: "right"
        // }
      ], //消息列表
      inputMsg: "", //输入内容
      userList: [
        { userName: "long", img: "static/image/user1.jpg" },
        { userName: "wei", img: "static/image/user2.jpg" }
      ],
      // 系统通知
      chartDeta: "", //用户进入聊天室的时间
      chartStatus: "", //用户进入聊天室的状态
      systemNews: false, //是否显示用户进入聊天室的提示,
      chartName:"",//进入聊天室的用户名
    };
  },
  methods: {
    // 发送消息
    postMsg() {
      if (this.inputMsg == "") {
        alert("请输入内容！");
        return false;
      }

      // 传递--> 用户发送消息
      this.socket.emit("sendMsg", {
        msg: this.inputMsg,

      });
      this.inputMsg = "";

      return false;
    }
  },
  // 页面一进来就要连接socketio了
  mounted() {
    // 连接服务端
    this.socket = io.connect("http://localhost:3000");
    //  头像先采用本地随机图片，后期改为可以用户自己上传
    // 若用户没有上传头像，就随机分配头像
    let headIcon = Math.floor(Math.random() * 4) + 1;

    //传递-->  发送进入聊天室的用户信息
    this.socket.emit("postUser", {
      userName: localStorage.getItem("userName"),
      img: "static/image/user" + headIcon + ".jpg"
    }); // 触发登录事件


  // 接收--> 接收系统通知，哪个用户进入了聊天室
    //聊天窗口下的系统提示消息
    this.socket.on("system", systemInfo => {
      console.log(systemInfo)
      this.chartDeta = new Date().toTimeString().slice(0, 9);
      this.chartStatus = systemInfo.status;
      this.chartName = systemInfo.userName;
      this.systemNews = true;
      // 进来后窗口需要抖动一下，日后补齐吧
    });


    //接收--> 进入聊天室的用户信息
    this.socket.on("onlineUser", usersList => {
      this.userList = usersList;
    });

    //接收--> 用户发送的消息
    this.socket.on("receiveMsg", usersList => {
      this.msgList.push(usersList);
    });

  
  }
};
</script>

<style lang="less" scoped>
.zm{
  padding:20px;
  width:100%;
  height: 500px;
}
// 左侧群，联系列表信息
.zm-left-side{
    width: 200px;
    // display: flex;
    // flex-direction: column;
}


// 右侧群信息
.zm-right-side{
  width: 200px;
    height: 500px;
    overflow-y: scroll;
    background: #ddd;
  // 显示群聊相关信息
  .zm-group-content {
    width: 100%;
    position: absolute;
    top: 0;
    right: 0;
    
    .zm-msg {
      width: 100%;
      .zm-msg-detail {
        background: #fff;
        .zm-msg-log{
          width: 30px;
          height: 30px;
          border-radius: 15px;
        }
      }
    }
  }
}


// 聊天区顶部
.ivu-layout-header {
  background: #fff;
  line-height: 20px;
}
// 中间聊天区
.zm-center{
    width: calc(100% - 400px);
}
.zm-right-header {
  height: 50px;
  border-top: 1px solid #ddd;
  .zm-top {
    .zm-icon {
      display: inline-block;
      img {
        display: inline-block;
        width: 39px;
        height: 39px;
      }
    }
    .zm-user {
      display: inline-block;
    }
  }
}
// 聊天消息区
.zm-right-content {
  position: relative;
  // height:400px;
  .zm-top {
    text-align: center;
  }
  .zm-msg {
      // height:400px;
    list-style: none;
    position: relative;
    // margin-right: 200px;

    // 消息在左侧的样式
    .zm-msg-detail {
      margin: 20px;
      margin-bottom: 40px;
       position: relative;
        // margin-right: 20px;
      .zm-msg-log {
        width: 30px;
        height: 30px;
        position: absolute;
        top:0;
      }
      .zm-log-user{
        display: inline-block;
        position: absolute;
        span{
          margin-left: 40px;
        }
        .zm-log-time{
          margin-left:10px;
        }
      }
    }
    // -------------------------
    // 消息在右侧的样式
    .right {
      
      margin: 20px;
      margin-bottom: 40px;
       position: relative;
       text-align: right;
        // margin-right: 20px;
      .zm-msg-log {
        width: 30px;
        height: 30px;
        position: absolute;
        top:0;
        right:0;
      }
      .zm-log-user{
        display: inline-block;
        position: absolute;
        right:40px;
        span{
          margin-left: 40px;
        }
        .zm-log-time{
          margin-left:10px;
        }
      }
  }
    
  }
  
}

// .left{
//   background: #fff;
// }
.zm-left-bg {
  word-wrap:break-word; 
  display: inline-block;
  position: relative;
  top: 20px;
  max-width: calc(100% - 40px);
  padding: 5px;
  left: 40px;
  background: #fff;
  border-radius: 5px;
  // border-radius: 10px 0px 10px 10px;
  // color: #000;
}
.zm-right-bg {
  word-wrap:break-word; 
  display: inline-block;
  position: relative;
   max-width: calc(100% - 40px);
    top: 20px;
    padding: 5px;
    right: 40px;
    text-align: left;
   
    background: #01e777;
    border-radius: 5px;
    color: #fff;
    // border-radius: 10px 0px 10px 10px;
}
// 底部的输入框
.zm-footer {
  top: 420px;
  width: calc(100% - 400px);
  position: fixed;
  height: 60px;
  background: #fff;
  .zm-input {
    width: 70%;
  }
}

// 系统提示消息
.system {
 
  text-align: center;
}
</style>
