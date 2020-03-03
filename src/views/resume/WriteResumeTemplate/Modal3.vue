<template>
  <!-- 求职意向，动态弹窗，slot插入 -->
  <div>
    <Modal class="jm-skill-modal" v-model="modalShow">
      <p class="jm-title" slot="header" style="text-align:left">
        <span>{{title}}</span>
      </p>
      <!-- slot插入处，动态的插入内容 -->
      <div class="jm-center">
        <slot name="jobModal"></slot>
      </div>
      <div class="jm-footer" slot="footer">
        <Button @click="save(flag)" class="jm-save-btn" size="large">保存</Button>
        <Button @click="cancelModel(flag)" class="jm-cancle-btn" size="large"
          >取消</Button
        >
      </div>
    </Modal>
  </div>
</template>
<script>
export default {
  name: "modal3",
  props: ["modalShow","title","flag"],
  data() {
    return {

    };
  },
  watch: {},
  methods: {

    // 点击取消
    cancelModel(flag) {
     this.$emit("closeModel", flag);
    },
    // 点击保存
    save(){
      this.cancelModel();
      this.$emit("savaMsg")
    },

  }
};
</script>
<style lang="less" scoped>
/deep/ .ivu-modal-body{
   min-height: 340px;
    height: 540px;
    // max-height: 600px;
    overflow: auto;
}
.jm-skill-modal {
  overflow: auto;
  width: 600px;
  /deep/.ivu-modal {
    width: 600px !important;
    // min-height: 340px;
    // height: 540px;
    // // max-height: 600px;
    // overflow: auto;
  }
  // 加这个deep可以深度修改内置的样式
  /deep/.ivu-modal-header {
    
    padding: 0 !important;
  }
/deep/ .ivu-modal-header{
  height: 40px;
}
  // 标题
  .jm-title {
    position: fixed;
    width: 600px;
    height: 40px;
    line-height: 40px;
    padding-left: 20px;
    color: white;
    background-color: #00c190;
    border-radius: 4px 4px 0 0;
  }
  // 中间表单区
  .jm-content {
    .jm-form {
      .jm-Row {
        display: inline-block;
        width: 48%;
      }
    }
 
  }
  // 底部按钮
  .jm-footer {
    text-align: center;
    .jm-save-btn {
      background-color: #00c190;
      color: white;
      border-radius: 4px;
      border: none;
      width: 100px;
      height: 40px;
      margin-left: 15px;
      cursor: pointer;
    }
    .jm-cancle-btn {
      background-color: #ededed;
      color: #8b8b8b;
      border-radius: 4px;
      border: none;
      width: 100px;
      height: 40px;
      margin-left: 15px;
      cursor: pointer;
    }
  }
}
</style>