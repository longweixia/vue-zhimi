<template>
  <div class="setting-modal">
    <span class="setting-square"></span>
    <!-- 设置面板 -->
    <slot name="content"></slot>
  </div>
</template>
<script>
import Bus from "@/assets/event-bus.js";
export default {
  name: "setting3",
  props: ["themeFlag"],
  components: {},
  data() {
    return {
      
    };
  },
  watch: {},
  methods: {
   
  }
};
</script>
 <style lang="less" scoped>
.setting-modal {
  text-align: center;
  border: 1px solid #a4aab9;
  border-radius: 5px;
  padding: 5px;
  background: #e8e9ec;
  width: 200px;
  margin-top: 0;
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