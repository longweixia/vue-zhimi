<template>
  <!-- 头像 -->
  <div
    v-if="showHeadImg"
    @mouseenter="enter('headImg')"
    @mouseleave="leave('headImg')"
    class="jm-headImg"
    :class="isBaseLine == 'headImg' ? 'jm-headImg-lineIs' : ''"
  >
    <Icon
      v-show="isBaseLine == 'headImg'"
      class="jm-head-icon"
      size="20"
      type="md-settings"
      @click="displayModelBase('headImg')"
    />
    <div class="head-icon" :style="imgFartherClass">
      <jmUploadImg
        :ImgBase64="formData.ImgBase64"
        :imgClass="imgClass"
        :isHeadImg="isBaseLine == 'headImg'"
      />
    </div>
    <!-- 头像设置面板 -->
    <div class="setting-head" @mouseleave="hiddenSetting">
      <setting3 v-if="showSetting">
        <div slot="content">
          <div style="margin-bottom:10px;">
            <span style="float:left;margin-left:15px;">风格</span>
            <span style="margin-left:40px;"
              >隐藏
              <i-Switch
                size="large"
                v-model="headIconHidden"
                @on-change="changeSwitch(-1, headIconHidden)"
              >
                <span slot="open">开</span>
                <span slot="close">关</span>
              </i-Switch>
            </span>
          </div>

          <div
            class="head-img-example"
            @mouseenter="bgHeadIconIndex = index"
            @mouseleave="bgHeadIconIndex = -1"
            v-for="(item, index) in headIconList"
            :key="index"
            :class="bgHeadIconIndex == index ? 'bg-head-icon' : ''"
            @click="changeHeadIcon(index)"
          >
            <img
              class="round-head-icon"
              :class="item.otherClass"
              :src="item.imgSrc"
            />
            <div>{{ item.text }}</div>
          </div>
        </div>
      </setting3>
    </div>
  </div>
</template>
<script>
import jmUploadImg from "@/components/UploadImg";
import setting3 from "@/views/resume/WriteResumeTemplate/Template3/setting3";
import Bus from "@/assets/event-bus.js";
export default {
  name: "headContent",
  props: ["formData","showHeadImg"],
  components: {
    jmUploadImg,
    setting3
  },
  data() {
    return {
      isBaseLine: "", //baseLine对应悬浮模板的名称
      isHeadImg: false, //是否显示头像编辑框
      showSetting: false, //是否显示头像的设置面板
      headIconHidden: true, //显示隐藏头像
      bgHeadIconIndex: "", //悬浮头像案例图标位置
      imgFartherClass: "", //改变头像样式将传给父dom的类
      imgClass: "", //透传给上传组件的选定的样式头像
      headIconList: [
        {
          otherClass: "",
          imgSrc: "./../../static/image/1.jpg",
          text: "圆形"
        },
        {
          otherClass: "one-head-icon",
          imgSrc: "./../../static/image/1.jpg",
          text: "1：1"
        },
        {
          otherClass: "three-head-icon",
          imgSrc: "./../../static/image/1.jpg",
          text: "3：4"
        }
      ]
    };
  },
  methods: {
    // 隐藏头像设置面板
    hiddenSetting() {
      this.showSetting = false;
    },
    // 点击头像设置样式案例
    changeHeadIcon(index) {
      if (index == 0) {
        console.log(index, "099009");
        this.imgClass = "round-head";
        this.imgFartherClass = "height:128px;";
      } else if (index == 1) {
        this.imgClass = "one-head";
        this.imgFartherClass = "height:128px;";
      } else if (index == 2) {
        this.imgClass = "three-head";
        this.imgFartherClass = "height:156px;";
      }
      this.showSetting = false;
    },
    // 改变设置面板的开关
    changeSwitch(index, value) {
        console.log(value,"value")
      if (index == -1) {
        // this.showHeadImg = value;
        var abc;
        value ? (abc = "显示") : (abc = "隐藏");
        Bus.$emit("getShowHeadImg", abc);
      }
    },
    // 显示基本信息弹窗
    displayModelBase(name) {
      this.showSetting = true;
    },
    // 鼠标悬浮头像
    enter(name) {
      this.isBaseLine = name;
    },
    //鼠标离开头像
    leave(name) {
      this.isBaseLine = "";
    }
  },
  mounted(){
      this.headIconHidden = this.showHeadImg
  }
};
</script>
<style lang="less" scoped>
// 头像样式
.jm-headImg {
  position: relative;
  display: block;
  width: 170px;
  margin: 0 auto;
  padding: 20px;
  border: 1px dashed transparent !important;
  .head-icon {
    position: relative;
    width: 128px;
    height: 156px;
    margin: 0 auto;
    border: 4px solid #e5e5e5;
    background: #e5e5e5;
    overflow: hidden;
    cursor: pointer;
  }
}

/deep/.ivu-input {
  border: none !important;
}
// 悬浮显示头像图片编辑框
.jm-headImg-lineIs {
  border: 1px dashed #00c091 !important;
}
.jm-head-icon {
  position: absolute;
  top: 0;
  right: 0;
  color: #fff;
  background: #00c091;
  margin: 5px;
  z-index: 1;
  cursor: pointer;
}
// 头像设置
// 默认圆形头像
.round-head-icon {
  width: 40px;
  height: 40px;
  border-radius: 20px;
}
// 1:1头像
.one-head-icon {
  border-radius: 0;
}
// 1:1头像
.three-head-icon {
  width: 30px;
  height: 40px;
  border-radius: 0;
}
.head-img-example {
  width: 52px;
  height: 79px;
  display: inline-block;
  margin: 5px;
  padding: 5px;
  border: 1px solid rgb(148, 147, 147);
  border-radius: 5px;
  cursor: pointer;
}
.setting-head {
  position: absolute;
  z-index: 10;
  top: 20px;
  padding-top: 20px;
  right: -10px;
}
.bg-head-icon {
  background: #00c091;
}
</style>

