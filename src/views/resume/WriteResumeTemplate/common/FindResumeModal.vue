<template>
<div v-if="modal2">
  <Modal
      class="warn-has-resume"
      v-model="modalFind"
      width="360"
      :mask-closable="false"
    >
      <p slot="header" style="color:#2db7f5;text-align:center">
        <Icon type="ios-information-circle"></Icon>
        <span>提示</span>
      </p>
      <div style="text-align:center">
        <p>您已保存过该模板简历</p>
        <p>是否在此基础上进行修改？</p>
      </div>
      <div slot="footer">
        <Button type="info" size="large" @click="cancle">取消</Button>
        <Button
          type="info"
          size="large"
          :loading="modal_loading"
          @click="getTemplatesResume"
          >确定</Button
        >
      </div>
    </Modal>
    </div>
</template>
<script>
import Bus from "@/assets/event-bus.js";
export default {
  name: "findResumeModal",
  props: ["modal2","modal_loading"],
  components: {},
  data() {
    return {
      modalFind:true,
    //    modal_loading: false,
    };
  },
  watch: {
      modal2: {
      handler(newVal, oldVal) {
        console.log(newVal);
        newVal ? (this.modalFind = true) : (this.modalFind = false);
      },
      deep: true
    }
  },
  methods: {
   cancle() {
      Bus.$emit("showFindModal",false)
    },
    getTemplatesResume(){
        Bus.$emit("getResumes",false)
    }
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