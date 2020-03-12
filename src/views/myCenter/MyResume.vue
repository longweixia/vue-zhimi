<template>
  <div>
    <myCenter></myCenter>
    <div class="center-right">
      <ul class="jm-ul">
        <li class="jm-li" v-for="(item, index) in imgList" :key="index">
          <span @click="deleteResume">删除</span>
          <img
            class="jm-img"
            :src="'http://localhost:3000' + item"
            alt="JM0203"
          />

          <!-- 遮罩层 -->
          <div
            @mouseenter="enter(index)"
            @mouseleave="leave(index)"
            class="jm-mask"
            :class="current == index ? jmMaskOpacity : ''"
          >
            <Icon
              size="35"
              class="jm-bigger"
              type="ios-add-circle-outline"
              @mouseenter.native="enterIcon(index)"
              @mouseleave.native="leaveIcon(index)"
            />
            <Button
              @click="gotoResumeTemplate(index)"
              class="jm-btn"
              shape="circle"
              icon="ios-search"
              >编辑简历</Button
            >
          </div>
          <div class="jm-preview" v-show="currentIcon == index">
            <img
              :class="isRightImg ? 'rightPreview' : 'leftPreview'"
              :src="'http://localhost:3000' + item"
              alt="JM0203"
            />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import myCenter from "./MyCenter";
export default {
  name: "myResume",
  data() {
    return {
      imgList: [], //首页图片列表
      jmMaskOpacity: "", //图片列表遮罩层的透明度
      current: 0, //当前悬浮图片的位置
      currentIcon: -1, //当前悬浮预览图标
      isRightImg: false //是否是右边图
    };
  },
  components: {
    myCenter: myCenter
  },
  methods: {
    //    删除简历
    deleteResume() {
      this.axios
        .post("resumes/deletaResume", {
          name: "截图1",
        //   headers: { "content-type": "multipart/form-data" }
        })
        .then(res => {
          if (res.data.status == "0") {
          }
          console.log(res.data.msg);
        })
        .catch(err => {});
    },
    // 进入简历模板
    gotoResumeTemplate(index) {
      console.log(index + 1, "进入模板");
      this.$router.push({
        // name: "writeResumeTemplate"+(index+1)
        name: "writeResumeIde",
        query: {
          id: index + 1
        }
      });
      // 解决模板引入需要刷新才改变视图的问题
      window.location.reload();
    },
    // 鼠标悬浮图片
    enter(index) {
      this.current = index;
      this.jmMaskOpacity = "jmMaskOpacity";
    },
    //鼠标离开图片
    leave(index) {
      this.current = index;
      this.jmMaskOpacity = "";
    },
    // 鼠标悬浮预览图标
    enterIcon(index) {
      this.isRightImg =
        index == parseInt(index / 4) * 4 + 2 ||
        index == parseInt(index / 4) * 4 + 3;
      this.currentIcon = index;
    },
    //鼠标离开预览图标
    leaveIcon(index) {
      this.currentIcon = -1;
    },

    // 获取图片列表
    getImgList() {
      this.axios
        .post("resumes/resumeImgList", { flag: "all" })
        .then(res => {
          this.imgList = res.data.url;
          console.log(this.imgList);
        })
        .catch(err => {
          console.log("err", err);
        });
    }
  },
  mounted() {
    this.getImgList();
  }
};
</script>

<style lang="less" scoped>
.center-right {
  position: absolute;
  top: 60px;
  left: 240px;
  .jm-ul {
    margin-top: 20px;
    .jm-li {
      float: left;
      .jm-img {
        height: 400px;
        width: 300px;
      }
    }
  }
}
// 遮罩层
.jm-mask {
  position: relative;
  text-align: center;
  height: 400px;
  width: 300px;
  margin-top: -407px;
  margin-left: 30px;
  // float: left;
  background-color: rgba(0, 192, 145, 0.5);
  opacity: 0;
  width: 100%;
  left: 0;
  right: 0;
  // bottom: 0;
  .jm-btn {
    position: relative;
    top: 50%;
    font-size: 20px;
    transform: translate(0, -50%);
  }
  .jm-bigger {
    position: absolute;
    right: 0;
    color: #fff;
  }
}
.jmMaskOpacity {
  opacity: 0.8 !important;
}
</style>
