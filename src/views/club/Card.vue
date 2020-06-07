<template>
  <!-- 社区中心-个人简历卡片 -->
  <div class="jm-card">
    <Card style="width:450px;display:inline-block;margin:10px" v-for="(item,index) in shareList" :key="index">
      <div class="jm-content" style="position:relative">
        <img class="img-head" :src="item.ImgBase64" />
        <div class="card-text">
          <div class="card-items"><Icon type="md-contact" size="16" />{{item.name}}</div>
          <div class="one-description">{{item.wordDescribe}}</div>
          <div class="card-bottom">
            <img src="@/assets/demo.jpg" />
            <div class="msg-right">
              <!-- 基本信息 -->
              <div class="msg-item">
                 <h5>小信息：</h5>
                <span>{{item.age}}岁</span>
                <span>{{item.work}}</span>
                
                <span>本科</span>
                <span>湖南科技学院</span>
              </div>
              <div class="msg-item">
                <h5>技术：</h5>
                <span v-for="(item1,index1) in item.SkillList[0]" :key="index1">{{item1.name}}:{{item1.skillNumber}}</span>
              </div>
              <!-- <div class="msg-item">
                <h5>期望：</h5>
                <span>20k</span>
                <span>深圳</span>
              </div> -->
            </div>
             <div @click="joinGroupChart" class="msg-bottom">
               聊一下
             </div>
          </div>
        </div>
      </div>
    </Card>
  </div>
</template>

<script>
import Bus from "@/assets/event-bus.js";
export default {
  name: "clubCard",
  components: {},
  props: [],
  data() {
    return {
      shareList: []
    };
  },
  methods: {
    // 获取图片列表
    getClubList() {
      this.axios
        .get("clubs/getAllClubList", {
          // params: {
          //   pageSize: this.pageSize || 1,
          //   currentPage: this.currentPage || 1,
          //   userName: localStorage.getItem("userName")
          // }
        })
        .then(res => {
          if(res.data.status=='0'){
            this.shareList = res.data.result
            console.log(this.shareList)
          }
        })
        .catch(err => {
          console.log("err", err);
        });
    },
     // 进入群聊
    joinGroupChart() {
      this.$router.push({
        name: "groupChart"
      });
    },
  },
  watch: {},

  mounted() {
    this.getClubList();
  },
  created() {}
};
</script>

<style lang="less" scoped>
.jm-card{
  margin: 30px;
}
.jm-content {
  min-height: 100px;
  .img-head {
    float: left;
    width: 100px;
    height: 100px;
    border-radius: 50px;
  }
  .card-text {
    position: relative;
    margin-left: 120px;
    .card-items {
      position: absolute;
      height: 16px;
      line-height: 16px;
      font-weight: bold;
    }
    .one-description {
      padding-top: 20px;
      color: #888;
      line-height: 18px;
      margin-bottom: 10px;
      font-size: 12px;
    }
    .card-bottom {
      position: relative;
      img {
        display: inline-block;
      }
      .msg-right {
        position: absolute;
        top: 0;
        display: inline-block;
        // float: left;
        // padding-left: 100px;
        .msg-item {
          margin-left: 10px;
          margin-bottom: 5px;
          span{
            margin: 5px;
          }
        }
      }
      .msg-bottom{
        text-align: left;
      }
    }
  }
}
</style>
