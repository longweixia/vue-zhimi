<template>
  <div>
    <!-- 求职意向主题 -->

    <div
      class="jm-theme"
      @mouseover="getHover(index)"
      v-for="(item, index) in list"
      :key="index"
    >
      <Row :class="indexZ == index ? 'jm-theme-hover' : ''">
        <span v-if="indexZ == index" @click="save(index)" class="jm-save-btn"
          >保存</span
        >
        <Row>
          <!-- 标题和图标 -->
          <div class="title">
            <!-- <Icon type="ios-wine" size="32"/> -->
            <div
              class="jm-title-top"
              :class="[item.lineBottom, item.textDirection]"
            >
              <!-- 标题图标 -->
              <Icon
                size="30"
             
                :type="item.icon"
                v-if="item.isIcon"
              />
              <!-- 标题前线 -->
              <span v-if="item.lineIcon" :class="item.lineLeft"></span>
              <!-- 标题前图标 -->
              <span v-if="item.lineIcon" class="line-icon-sides-left">
                <Icon type="md-wine" />
              </span>
              <!-- 标题 -->
              <span class="title-row" :class="item.lineIcon">{{ title }}</span>
              <!-- 标题后图标 -->
              <span v-if="item.lineIcon" class="line-icon-sides-right">
                <Icon type="md-wine" />
              </span>
              <!-- 标题线 -->
              <span v-if="item.lineIcon" :class="item.lineRight"></span>
            </div>
            <!-- <Icon type="ios-wine" /> -->
          </div>
        </Row>
      
      <slot name="slotTheme"></slot>
      <!-- <Row
          class="jobList"
          v-for="(item0, index0) in jobIntentionList"
          :key="index0"
        >
          <Icon :size="20" class="jobIcon" :type="item0.type" />
          <span class="jobText">{{ item0.baseText }}</span>
        </Row> -->
        </Row>
    </div>
  </div>
</template>
<script>
import Bus from "@/assets/event-bus.js";
// import modal3 from "./Modal3";
export default {
  name: "theme3",
  props: ["title", "themeFlag"],
  components: {
    // modal3
  },
  data() {
    return {
      // jmThemeHover:"jm-theme-hover",//hover后的遮罩层
      indexZ: "", //悬浮的位置
      list: [
        {
          isIcon: false, //是否显示标题图标
          icon: "md-list-box", //标题图标样式
          textDirection: "", //文字的方向
          lineLeft: "both-sides-left", //前后线的样式,不写就没有前后的线
          lineRight: "both-sides-right", //前后线的样式,不写就没有前后的线
          lineBottom: "", //是否显示底部线，不写就没有底部的线
          lineIcon: "line-icon", //前后线中间的图标，空为没有
          isShowTheme: true //是否显示为选择的主题
        },
        {
          isIcon: true,
          icon: "ios-bicycle",
          textDirection: "left",
          lineLeft: "",
          lineBottom: "line-bottom", //是否显示底部线
          lineIcon: "", //前后线中间的图标
          isShowTheme: true //是否显示为选择的主题
        },
        {
          isIcon: true,
          icon: "ios-body",
          textDirection: "center",
          lineLeft: "",
          lineBottom: "line-bottom-sort", //是否显示底部线
          lineIcon: "", //前后线中间的图标
          isShowTheme: true //是否显示为选择的主题
        }
      ],
      // title: "求职意向",
      jobIntentionList: [
        //求职意向项
        {
          type: "ios-contact",
          baseText: "意向岗位",
          name: "choseJob"
        },
        {
          type: "md-briefcase",
          baseText: "意向城市",
          name: "city"
        },
        {
          type: "ios-mail",
          baseText: "入职时间",
          name: "entryTime"
        },
        {
          type: "ios-call",
          baseText: "薪资要求",
          name: "salary"
        }
      ]
    };
  },
  watch: {},
  methods: {
    getHover(index) {
      this.indexZ = index;
    },
    save(index) {
      // console.log(index,this.list[index],"父亲")

      Bus.$emit("saveTheme", [this.list[index], this.themeFlag]);
      Bus.$emit("closeTheme");
    }
  }
};
</script>
 <style lang="less" scoped>
/deep/.ivu-input {
  border: none;
  // color: #fff;
  // background: #e0e0e0;
  // opacity: .2;
}

// 每一项
.jm-theme {
  // width:540px;
  // 求职意向主题
  height: auto;
  border: 1px solid #e8e8e8;
  margin-bottom: 20px;
  padding: 20px;
  .jobList {
    // width: 25%;
    display: inline-block;
    padding: 20px 5px;
    .jobIcon {
      color: #747474;
      margin-top: -2.5px;
    }
    .jobText {
      color: #747474;
      font-size: 14px;
    }
  }
  // 标题样式
  .title {
    width: 507px;
    // margin-top:-30px;
    // margin-left:30px;
    display: inline-block;
    .jm-title-top {
      display: inline-block;
      width: 507px;
      position: relative;
    }
    // 标题下面的线，长线
    .line-bottom {
      border-bottom: 1px solid #254665;
    }
    // 标题下面的线，短线
    .line-bottom-sort {
      border-bottom: 1px solid #254665;
    }

    // input,标题文字
    .title-row {
      width: 100px;
      display: inline-block;
      font-size: 20px;
      font-weight: bold;
      // margin-left:212px;
      position: relative;
      /deep/ .ivu-input {
        color: #254665;
        font-size: 20px;
        font-weight: bold;
      }
    }
    // 文字方向
    .center {
      text-align: center;
    }
    .right {
      text-align: right;
    }
    .left {
      text-align: left;
    }
  }
  // 标题前后的线
  .both-sides-left {
    width: 167px;
    display: inline-block;
    content: "";
    border-color: #254665;
    position: absolute;
    z-index: 100;
    // left: 0;
    // right: 172px;
    top: 50%;
    margin-top: -1px;
    border-bottom: 1px solid;
  }
  .both-sides-right {
    width: 167px;
    display: inline-block;
    content: "";
    border-color: #254665;
    position: absolute;
    z-index: 100;
    // left: 0;
    right: 0;
    top: 50%;
    margin-top: -1px;
    border-bottom: 1px solid;
  }
  // .both-sides-left::after {
  //   width:172px;
  //   content: "";
  //   border-color: #254665;
  //   position: absolute;
  //   // left: 70%;
  //   right: 0;
  //   top: 50%;
  //   margin-top: -1px;
  //   border-bottom: 1px solid;
  // }
}

// 前后两线上的图标
.line-icon-sides-left {
  display: inline-block;
  margin-left: 172px;
  text-align: center;
  width: 30px;
}
.line-icon-sides-right {
  display: inline-block;
  // margin-right:172px;
  text-align: center;
  width: 30px;
}
.jm-theme-hover {
  /deep/.ivu-input {
    border: none;
    // color: #fff;
    background: #e0e0e0;
    // opacity: .2;
  }
}
// 遮罩层,
.jm-theme-hover::before {
  content: "";
  position: absolute;
  top: -20px;
  left: -20px;
  width: 538px;
  height: calc(100% + 40px);
  background: #666;
  opacity: 0.2;
}
.jm-save-btn {
  position: absolute;
  background-color: #00c190;
  color: white;
  border-radius: 4px;
  border: none;
  width: 60px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  vertical-align: middle;
  left: 50%;
  margin-left: -30px;
  top: 50%;
  z-index: 1000;
  cursor: pointer;
}
</style>