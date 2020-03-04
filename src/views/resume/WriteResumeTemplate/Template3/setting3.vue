<template>
  <div class="setting-modal">
    <span class="setting-square"></span>
    <!-- 设置面板 -->
    <div v-for="(item, index) in settingList" :key="index">
      <span class="setting-text">{{ item.text }}</span>
      <span class="setting-switch">
      <i-Switch 
        size="large"
        v-model="item.value"
        @on-change="changeSwitch(index, item.value)"
      >
        <span slot="open">{{ item.switchOppen }}</span>
        <span slot="close">{{ item.switchClose }}</span>
      </i-Switch>
      </span>
    </div>
  </div>
</template>
<script>
import Bus from "@/assets/event-bus.js";
// import modal3 from "./Modal3";
export default {
  name: "setting3",
  props: ["themeFlag"],
  components: {},
  data() {
    return {
      settingList: [
        {
          text: "隐藏时间模块",
          switchOppen: "开",
          switchClose: "关",
          value: true
        },
        {
          text: "隐藏描述模块",
          switchOppen: "开",
          switchClose: "关",
          value: true
        },
        {
          text: "恢复模块样式",
          switchOppen: "开",
          switchClose: "关",
          value: true
        },
        {
          text: "删除该条模块",
          switchOppen: "开",
          switchClose: "关",
          value: true
        }
      ]
    };
  },
  watch: {},
  methods: {
    changeSwitch(index, val) {
      var settingObj = {
        text: "隐藏时间模块",
        isShowJobTime: "",
        isShowDescribe: "",
        isRecovery: "",
        isDelete: ""
      };
      if (index == 0) {
        val
          ? (settingObj.isShowJobTime = true)
          : (settingObj.isShowJobTime = false);
      }
      Bus.$emit("changeSetting", settingObj);
    }
  }
};
</script>
 <style lang="less" scoped>
.setting-modal {
  border: 1px solid #a4aab9;
  border-radius: 5px;
  padding: 5px;
  background: #e8e9ec;
  width: 200px;
//   text-align: center;
  margin-top: -15px;
  .setting-text{
    //   float: left;
  }
  .setting-switch{
      display: inline-block;
      text-align: right;
  }
}
.setting-square {
  position: absolute;
  border-width: 10px;
  border-style: solid;
  left: 165px;
  margin-top: -25px;
  z-index: 10;
  border-color: transparent transparent #e8e9ec transparent;
}

</style>