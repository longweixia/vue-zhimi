<template>
  <!-- 求职意向，动态弹窗，slot插入 -->
  <div>
    <Modal class="jm-skill-modal" v-model="modalSkills">
      <p class="jm-title" slot="header" style="text-align:left">
        <span>{{title}}</span>
      </p>
      <!-- slot插入处，动态的插入内容 -->
      <div class="jm-center">
        <slot name="jobModal"></slot>
      </div>
      <div class="jm-footer" slot="footer">
        <Button @click="save" class="jm-save-btn" size="large">保存</Button>
        <Button @click="cancelModel" class="jm-cancle-btn" size="large"
          >取消</Button
        >
      </div>
    </Modal>
  </div>
</template>
<script>
export default {
  name: "modal3",
  props: ["modalSkills","title"],
  data() {
    return {

    };
  },
  watch: {},
  methods: {

    // 点击取消
    cancelModel() {
      this.$emit("changeSkillModel", false);
    },
    // 点击保存
    save(){
      this.cancelModel();
    },

  }
};
</script>
 <style lang="less" scoped>
.jm-skill-modal {
  width: 600px;
  /deep/.ivu-modal {
    width: 600px !important;
  }
  // 加这个deep可以深度修改内置的样式
  /deep/.ivu-modal-header {
    padding: 0 !important;
  }

  // 标题
  .jm-title {
    width: 100%;
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
    .wordDescribe{
      .jm-switch{
       
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