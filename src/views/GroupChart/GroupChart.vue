<template>
  <div class="layout zm">

    <Layout>
      <!-- 聊天人员信息 -->
      <Sider hide-trigger>Sider</Sider>
      <!-- 聊天主页面 -->
      <Layout>
        <Header class="zm-right-header">
          <div class="zm-top">
            <div class="zm-icon">
              <img src="static/image/user1.jpg" />
            </div>
            <div class="zm-user">
              <div>龙威</div>
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
              class="zm-msg-detail"
              :class="item.type"
            >
              <img
                :src="item.img"
                class="zm-msg-log"
              />
              <span :class="item.type=='left'?'zm-left-bg':'zm-right-bg'">{{item.msg}}</span>
            </li>
          </ul>
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
        </Content>
        <!-- 输入框 -->
        <Footer class="zm-footer">
          <div >
              <Input v-model="inputMsg" placeholder="Enter something..." class="zm-input" />
              <Icon size="35" type="ios-send" />
          </div>
        </Footer>
      </Layout>
    </Layout>
  </div>
</template>

<script>
export default {
  name: "GroupChart",
  data() {
    return {
      msgLeft: true, //左边消息，即他人的消息，用来展示作为左边样式类的判断
      msgList: [
        {
          img: "static/image/user1.jpg",
          msg:
            "我已经更新了网站内容，菲奥娜，希望一切都好吗？请告诉我还有什么变化",
          type: "left"
        },
        {
          img: "static/image/user2.jpg",
          msg: "啊！太好了。我现在得走了，明天我会赶上你的。",
          type: "right"
        },
        {
          img: "static/image/user1.jpg",
          msg: "不用担心，我很高兴你快乐！",
          type: "left"
        },
        {
          img: "static/image/user2.jpg",
          msg: "你能帮我检查一下照片吗？",
          type: "right"
        }
      ], //消息列表
      inputMsg:"",//输入内容
      userList:[
        {userName:"long",img:"static/image/user1.jpg"},
        {userName:"wei",img:"static/image/user2.jpg"}
      ]
    };
  },
  methods:{
  
  }
};
</script>

<style lang="less" scoped>
// 聊天区顶部
.ivu-layout-header {
  background: #fff;
  line-height: 20px;
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
  position:relative;
  .zm-top {
    text-align: center;
  }
  .zm-msg {
    list-style: none;
    position: relative;
    margin-right: 200px;
    .zm-msg-detail {
      
      margin-top: 10px;
      margin-bottom: 10px;
      .zm-msg-log {
        width: 30px;
        height: 30px;
      }
    }
  }
  // 显示群聊相关信息
  .zm-group-content{
    position:absolute;
    top:0;
    right:0;
    width: 200px;
    background: #ddd;
    .zm-msg{
      width: 100%;
      .zm-msg-detail{
        background: #fff;
      }
    }
  }
}
.right {
  margin-left: 700px;
 
}
// .left{
//   background: #fff;
// }
.zm-left-bg{
  display: inline-block;
   height: 30px;
  line-height: 30px;
  background: #fff;
}
.zm-right-bg{
  display: inline-block;
  height: 30px;
    line-height: 30px;
   background: #01e777;
 
}
// 底部的输入框
.zm-footer{
  height: 60px;
  background: #fff;
  .zm-input{
    width: 70%;
  }
}
</style>
